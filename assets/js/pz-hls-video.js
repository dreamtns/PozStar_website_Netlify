(function () {
    'use strict';

    var hlsLoaderPromise = null;
    var scriptBase = getScriptBase();

    function getScriptBase() {
        var script = document.currentScript;
        if (!script || !script.src) {
            return 'assets/js/';
        }

        return script.src.slice(0, script.src.lastIndexOf('/') + 1);
    }

    function loadHlsLibrary() {
        if (window.Hls) {
            return Promise.resolve();
        }

        if (!hlsLoaderPromise) {
            hlsLoaderPromise = new Promise(function (resolve, reject) {
                var script = document.createElement('script');
                script.src = scriptBase + 'plugins/hls.light.min.js';
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        return hlsLoaderPromise;
    }

    function getPlaylist(video) {
        var list = video.getAttribute('data-hls-playlist') || video.getAttribute('data-hls-src') || '';
        return list.split(',').map(function (src) {
            return src.trim();
        }).filter(Boolean);
    }

    function attachSource(video, src) {
        if (!src) {
            return Promise.resolve();
        }

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            video.load();
            return Promise.resolve();
        }

        return loadHlsLibrary().then(function () {
            if (!window.Hls || !window.Hls.isSupported()) {
                video.src = src;
                video.load();
                return Promise.resolve();
            }

            if (video.pzHls) {
                video.pzHls.destroy();
            }

            return new Promise(function (resolve) {
                video.pzHls = new window.Hls({
                    enableWorker: true,
                    lowLatencyMode: false
                });
                video.pzHls.on(window.Hls.Events.MANIFEST_PARSED, resolve);
                video.pzHls.loadSource(src);
                video.pzHls.attachMedia(video);
            });
        });
    }

    function playVideo(video) {
        var playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(function () {
                video.controls = true;
            });
        }
    }

    function setupVideo(video) {
        var playlist = getPlaylist(video);
        var index = 0;
        var loopPlaylist = video.getAttribute('data-loop-playlist') === 'true';

        if (!playlist.length) {
            return;
        }

        video.setAttribute('playsinline', '');
        video.muted = video.hasAttribute('muted') || video.autoplay;

        function loadCurrent() {
            attachSource(video, playlist[index]).then(function () {
                if (video.autoplay) {
                    playVideo(video);
                }
            });
        }

        video.addEventListener('ended', function () {
            if (playlist.length < 2) {
                if (video.loop) {
                    playVideo(video);
                }
                return;
            }

            index += 1;
            if (index >= playlist.length) {
                if (!loopPlaylist) {
                    index = playlist.length - 1;
                    return;
                }
                index = 0;
            }

            loadCurrent();
        });

        loadCurrent();
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.pz-hls-video').forEach(setupVideo);
    });
}());
