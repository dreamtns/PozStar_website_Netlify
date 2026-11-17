// Run npm run build:case-studies after adding installation photos to the source folders.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'assets/img/PozStar_case_studies');
const thumbnailDirectory = path.join(root, 'assets/img/case-studies/thumbnails');
const pagePath = path.join(root, 'case-studies.html');
const compare = (a, b) => a.localeCompare(b, 'en', { numeric: true });
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const url = file => path.relative(root, file).split(path.sep).map(encodeURIComponent).join('/');
const categories = fs.readdirSync(source, { withFileTypes: true })
    .filter(entry => entry.isDirectory()).map(entry => entry.name).sort(compare);
const entries = [];
const thumbnailJobs = new Map();

function collect(directory, category) {
    const children = fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => compare(a.name, b.name));
    const photos = children.filter(entry => entry.isFile() && /\.(jpe?g|png|webp)$/i.test(entry.name)).map(entry => {
        const file = path.join(directory, entry.name);
        const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
        return { file, hash, date: entry.name.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '' };
    });
    if (photos.length) {
        // Numeric subfolders distinguish installations but are not part of a machine model.
        const parts = path.relative(path.join(source, category), directory).split(path.sep).filter(part => !/^\d+$/.test(part));
        const model = parts.join(' ').replace(/^HYUDAI\b/, 'HYUNDAI').replace(/^KOVELCO\b/, 'KOBELCO').replace(/_/g, ' ');
        const uniquePhotos = [...new Map(photos.map(photo => [photo.hash, photo])).values()];
        entries.push({ model, categories: [category], photos: uniquePhotos,
            date: uniquePhotos.map(photo => photo.date).sort().at(-1),
            key: uniquePhotos.map(photo => photo.hash).sort().join('|') });
    }
    children.filter(entry => entry.isDirectory()).forEach(entry => collect(path.join(directory, entry.name), category));
}
categories.forEach(category => collect(path.join(source, category), category));

// Identical photo sets filed under several categories represent a single gallery entry.
const uniqueEntries = new Map();
entries.forEach(entry => {
    const existing = uniqueEntries.get(entry.key);
    if (existing) existing.categories = [...new Set(existing.categories.concat(entry.categories))];
    else uniqueEntries.set(entry.key, entry);
});
const cases = [...uniqueEntries.values()].sort((a, b) => compare(b.date, a.date) || compare(a.model, b.model));
let gallery = '\n                <!-- Generated from assets/img/PozStar_case_studies by npm run build:case-studies. -->\n';
cases.forEach((entry, index) => {
    const id = 'installation-' + (index + 1);
    gallery += `                <article class="case-study" data-case-study data-categories="${escape(entry.categories.join('|'))}" data-date="${entry.date}" aria-labelledby="${id}">\n`;
    gallery += `                    <div class="case-study__photos" role="group" aria-label="${escape(entry.model)} installation photos">\n`;
    entry.photos.forEach((photo, photoIndex) => {
        const caption = `${entry.model} · Photo ${photoIndex + 1} of ${entry.photos.length}`;
        const hidden = photoIndex >= 4;
        gallery += `                        <a href="${url(photo.file)}" data-caption="${escape(caption)}" aria-label="Enlarge ${escape(caption)}"${hidden ? ' hidden' : ''}>`;
        if (!hidden) {
            const thumbnail = path.join(thumbnailDirectory, photo.hash + '.jpg');
            if (!fs.existsSync(thumbnail)) thumbnailJobs.set(photo.hash, { source: photo.file, target: thumbnail });
            gallery += `<img src="${url(thumbnail)}" alt="${escape(caption)}" loading="lazy" decoding="async" width="640" height="427">`;
        }
        gallery += '</a>\n';
    });
    gallery += `                    </div>\n                    <h3 id="${id}">${escape(entry.model)}</h3>\n                    <p>${escape(entry.categories.join(' · '))}</p>\n                </article>\n`;
});

if (thumbnailJobs.size) {
    fs.mkdirSync(thumbnailDirectory, { recursive: true });
    const thumbnailScript = fs.readFileSync(path.join(__dirname, 'case-study-thumbnails.ps1'), 'utf8');
    execFileSync('powershell.exe', ['-NoProfile', '-Command', thumbnailScript], {
        input: JSON.stringify([...thumbnailJobs.values()]), encoding: 'utf8', stdio: ['pipe', 'inherit', 'inherit']
    });
}
let page = fs.readFileSync(pagePath, 'utf8');
const start = '<!-- CASE GALLERY START -->';
const end = '<!-- CASE GALLERY END -->';
if (!page.includes(start) || !page.includes(end)) throw new Error('Missing case gallery markers');
page = page.slice(0, page.indexOf(start) + start.length) + gallery + '                ' + page.slice(page.indexOf(end));
page = page.replace(/(<div[^>]*id="case-filters")\s+data-categories="[^"]*"/, '$1');
page = page.replace('id="case-filters"', `id="case-filters" data-categories="${escape(categories.join('|'))}"`);
fs.writeFileSync(pagePath, page);
console.log(`Built ${cases.length} installation galleries across ${categories.length} categories; ${thumbnailJobs.size} thumbnails created.`);
