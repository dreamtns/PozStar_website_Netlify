(function () {
    'use strict';

    var filters = document.getElementById('case-filters');
    var cases = Array.from(document.querySelectorAll('[data-case-study]'));
    var status = document.getElementById('case-status');
    var empty = document.getElementById('case-empty');
    if (!filters || !cases.length) return;

    // Folder categories are generated with the gallery; additional article tags also work.
    var categories = (filters.dataset.categories || '').split('|').filter(Boolean);
    var caseCategories = cases.map(function (entry) {
        return entry.dataset.categories.split('|').map(function (value) { return value.trim(); }).filter(Boolean);
    });
    caseCategories.forEach(function (values) {
        values.forEach(function (value) {
            if (categories.indexOf(value) === -1) categories.push(value);
        });
    });

    ['All Installations'].concat(categories).forEach(function (category, index) {
        var button = document.createElement('button');
        button.type = 'button';
        button.textContent = category;
        button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
        button.setAttribute('aria-controls', 'case-gallery');
        button.addEventListener('click', function () {
            var count = 0;
            cases.forEach(function (entry, caseIndex) {
                var match = index === 0 || caseCategories[caseIndex].indexOf(category) !== -1;
                entry.hidden = !match;
                if (match) count += 1;
            });
            filters.querySelectorAll('button').forEach(function (filter) {
                filter.setAttribute('aria-pressed', filter === button ? 'true' : 'false');
            });
            status.textContent = count + (count === 1 ? ' installation' : ' installations') +
                (index === 0 ? ' · All categories' : ' · ' + category);
            empty.hidden = count > 0;
        });
        filters.appendChild(button);
    });
    filters.hidden = false;
    status.textContent = cases.length + ' installations · All categories';

    var viewer = document.getElementById('case-viewer');
    var photo = document.getElementById('case-viewer-photo');
    var caption = document.getElementById('case-viewer-caption');
    if (!viewer || typeof viewer.showModal !== 'function') return;

    var currentLinks = [];
    var currentIndex = 0;
    var previous = document.getElementById('case-viewer-previous');
    var next = document.getElementById('case-viewer-next');

    function showPhoto(index) {
        currentIndex = (index + currentLinks.length) % currentLinks.length;
        var link = currentLinks[currentIndex];
        photo.src = link.href;
        photo.alt = link.dataset.caption;
        caption.textContent = link.dataset.caption;
        previous.hidden = next.hidden = currentLinks.length < 2;
    }

    document.querySelectorAll('.case-study__photos a').forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            currentLinks = Array.from(link.closest('.case-study__photos').querySelectorAll('a'));
            showPhoto(currentLinks.indexOf(link));
            viewer.showModal();
        });
    });
    document.getElementById('case-viewer-close').addEventListener('click', function () { viewer.close(); });
    previous.addEventListener('click', function () { showPhoto(currentIndex - 1); });
    next.addEventListener('click', function () { showPhoto(currentIndex + 1); });
    viewer.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showPhoto(currentIndex + (event.key === 'ArrowLeft' ? -1 : 1));
        }
    });
    viewer.addEventListener('click', function (event) {
        if (event.target === viewer) {
            var bounds = viewer.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right ||
                event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
        }
    });
})();
