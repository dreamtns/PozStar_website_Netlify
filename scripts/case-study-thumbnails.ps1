$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$jobs = [Console]::In.ReadToEnd() | ConvertFrom-Json
$jpegCodec = [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
foreach ($job in $jobs) {
    $image = [Drawing.Image]::FromFile($job.source)
    $bitmap = $null
    $graphics = $null
    try {
        # Apply camera orientation before producing the preview.
        if ($image.PropertyIdList -contains 274) {
            $orientation = [BitConverter]::ToUInt16($image.GetPropertyItem(274).Value, 0)
            $rotations = @{ 2 = 4; 3 = 2; 4 = 6; 5 = 5; 6 = 1; 7 = 7; 8 = 3 }
            if ($rotations.ContainsKey([int]$orientation)) { $image.RotateFlip($rotations[[int]$orientation]) }
        }
        $bitmap = [Drawing.Bitmap]::new(640, 427)
        $graphics = [Drawing.Graphics]::FromImage($bitmap)
        $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $scale = [Math]::Max(640 / $image.Width, 427 / $image.Height)
        $width = [int][Math]::Ceiling($image.Width * $scale)
        $height = [int][Math]::Ceiling($image.Height * $scale)
        $graphics.DrawImage($image, [int]((640 - $width) / 2), [int]((427 - $height) / 2), $width, $height)
        # Keep 640x427 previews strictly below 40 KB (40,000 bytes).
        $encoded = $null
        for ($quality = 85; $quality -ge 5; $quality -= 5) {
            $stream = [IO.MemoryStream]::new()
            $parameters = [Drawing.Imaging.EncoderParameters]::new(1)
            try {
                $parameters.Param[0] = [Drawing.Imaging.EncoderParameter]::new([Drawing.Imaging.Encoder]::Quality, [long]$quality)
                $bitmap.Save($stream, $jpegCodec, $parameters)
                if ($stream.Length -lt 40000) {
                    $encoded = $stream.ToArray()
                    break
                }
            } finally {
                $parameters.Dispose()
                $stream.Dispose()
            }
        }
        if ($null -eq $encoded) { throw "Cannot compress thumbnail below 40 KB: $($job.target)" }
        [IO.File]::WriteAllBytes($job.target, $encoded)
    } finally {
        if ($graphics) { $graphics.Dispose() }
        if ($bitmap) { $bitmap.Dispose() }
        $image.Dispose()
    }
}
