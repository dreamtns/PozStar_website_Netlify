(function () {
    var englishHeaderContent = `
    <header class="header__section">
        <div class="main__header position__relative header__sticky">
            <div class="container">
                <div class="main__header--inner d-flex justify-content-between align-items-center" style="max-height:60px">
                    <div class="offcanvas__header--menu__open ">
                        <a class="offcanvas__header--menu__open--btn" href="javascript:void(0)" data-offcanvas>
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon offcanvas__header--menu__open--svg" viewBox="0 0 512 512">
                                <path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 160h352M80 256h352M80 352h352" />
                            </svg>
                            <span class="visually-hidden">Offcanvas Menu Open</span>
                        </a>
                    </div>
                    <div class="main__logo">
                        <h1 class="main__logo--title">
                            <a class="main__logo--link" href="index.html">
                                <img class="main__logo--img" src="assets/img/logo/Pozstar_changed.svg" alt="PozStar Logo" height="30" width="140">
                            </a>
                        </h1>
                    </div>
                    <div class="header__menu d-none d-lg-block">
                        <nav class="header__menu--navigation">
                            <ul class="d-flex">
                                <li class="header__menu--items"><a class="header__menu--link" href="about.html">About Us</a></li>
                                <li class="header__menu--items"><a class="header__menu--link" href="#">Products</a>
                                    <ul class="header__sub--menu">
                                        <li class="header__sub--menu__items"><a href="GNSS_Enclosures.html" class="header__sub--menu__link">GNSS Enclosures</a></li>
                                        <li class="header__sub--menu__items"><a href="GNSS_Smart_Antenna.html" class="header__sub--menu__link">GNSS Smart Antenna</a></li>
                                        <li class="header__sub--menu__items"><a href="pozstar-pilot.html" class="header__sub--menu__link">PozStar Pilot</a></li>
                                    </ul>
                                </li>
                                <li class="header__menu--items"><a class="header__menu--link" href="Partnership.html">Partnership</a></li>
                                <li class="header__menu--items"><a class="header__menu--link" href="news.html">News</a></li>
                                <li class="header__menu--items"><a class="header__menu--link" href="contact.html">Contact</a></li>
                                <li class="header__menu--items"><a class="header__menu--link" href="#">Language</a>
                                    <ul class="header__sub--menu">
                                        <li class="header__sub--menu__items"><a href="index.html" class="header__sub--menu__link">English</a></li>
                                        <li class="header__sub--menu__items"><a href="Ko/index.html" class="header__sub--menu__link">\uD55C\uAD6D\uC5B4</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="offcanvas-header" tabindex="-1">
            <div class="offcanvas__inner">
                <div class="offcanvas__logo">
                    <a class="offcanvas__logo_link" href="index.html"><img src="assets/img/logo/Pozstar_Black.svg" alt="PozStar Logo"></a>
                    <button class="offcanvas__close--btn" data-offcanvas>close</button>
                </div>
                <nav class="offcanvas__menu">
                    <ul class="offcanvas__menu_ul">
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="about.html">About Us</a></li>
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="products.html">Products</a>
                            <ul class="offcanvas__sub_menu">
                                <li class="offcanvas__sub_menu_li"><a href="GNSS_Enclosures.html" class="offcanvas__sub_menu_item">GNSS Enclosures</a></li>
                                <li class="offcanvas__sub_menu_li"><a href="GNSS_Smart_Antenna.html" class="offcanvas__sub_menu_item">GNSS Smart Antenna</a></li>
                                <li class="offcanvas__sub_menu_li"><a href="pozstar-pilot.html" class="offcanvas__sub_menu_item">PozStar Pilot</a></li>
                            </ul>
                        </li>
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="Partnership.html">Partnership</a></li>
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="news.html">News</a></li>
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="contact.html">Contact</a></li>
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="#">Language</a>
                            <ul class="offcanvas__sub_menu">
                                <li class="offcanvas__sub_menu_li"><a href="index.html" class="offcanvas__sub_menu_item">English</a></li>
                                <li class="offcanvas__sub_menu_li"><a href="Ko/index.html" class="offcanvas__sub_menu_item">\uD55C\uAD6D\uC5B4</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>`;

    var koreanHeaderContent = `
    <header class="header__section">
        <div class="main__header position__relative header__sticky">
            <div class="container">
                <div class="main__header--inner d-flex justify-content-between align-items-center" style="max-height:60px">
                    <div class="offcanvas__header--menu__open ">
                        <a class="offcanvas__header--menu__open--btn" href="javascript:void(0)" data-offcanvas>
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon offcanvas__header--menu__open--svg" viewBox="0 0 512 512">
                                <path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 160h352M80 256h352M80 352h352" />
                            </svg>
                            <span class="visually-hidden">\uBAA8\uBC14\uC77C \uBA54\uB274 \uC5F4\uAE30</span>
                        </a>
                    </div>
                    <div class="main__logo">
                        <h1 class="main__logo--title">
                            <a class="main__logo--link" href="index.html"><img class="main__logo--img" src="assets/img/logo/Pozstar_changed.svg" alt="PozStar Logo" height="30" width="140"></a>
                        </h1>
                    </div>
                    <div class="header__menu d-none d-lg-block">
                        <nav class="header__menu--navigation">
                            <ul class="d-flex">
                                <li class="header__menu--items"><a class="header__menu--link" href="solutions.html">\uD68C\uC0AC \uC18C\uAC1C</a></li>
                                <li class="header__menu--items"><a class="header__menu--link" href="products.html">\uC81C\uD488 \uC18C\uAC1C</a>
                                    <ul class="header__sub--menu">
                                        <li class="header__sub--menu__items"><a href="P5.html" class="header__sub--menu__link">PozStar P5</a></li>
                                        <li class="header__sub--menu__items"><a href="S5.html" class="header__sub--menu__link">PozStar S5</a></li>
                                        <li class="header__sub--menu__items"><a href="android_software.html" class="header__sub--menu__link">PozPad (Android App)</a></li>
                                        <li class="header__sub--menu__items"><a href="controller.html" class="header__sub--menu__link">PozStar Controller</a></li>
                                        <li class="header__sub--menu__items"><a href="pozstar-pilot.html" class="header__sub--menu__link">PozStar Pilot</a></li>
                                        <li class="header__sub--menu__items"><a href="https://blog.naver.com/pozstargnss" class="header__sub--menu__link">\uB0A9\uD488\uAE30 \uBC14\uB85C\uAC00\uAE30</a></li>
                                    </ul>
                                </li>
                                <li class="header__menu--items"><a class="header__menu--link" href="Partnership.html">\uD30C\uD2B8\uB108\uC2ED</a></li>
                                <li class="header__menu--items"><a class="header__menu--link" href="news.html">\uB274\uC2A4</a></li>
                                <li class="header__menu--items"><a class="header__menu--link" href="contact.html">\uC81C\uD488 \uBB38\uC758</a></li>
                                <li class="header__menu--items"><a class="header__menu--link" href="#">\uC5B8\uC5B4</a>
                                    <ul class="header__sub--menu">
                                        <li class="header__sub--menu__items"><a href="index.html" class="header__sub--menu__link">English</a></li>
                                        <li class="header__sub--menu__items"><a href="Ko/index.html" class="header__sub--menu__link">\uD55C\uAD6D\uC5B4</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="offcanvas-header" tabindex="-1">
            <div class="offcanvas__inner">
                <div class="offcanvas__logo">
                    <a class="offcanvas__logo_link" href="index.html"><img src="assets/img/logo/Pozstar_Black.svg" alt="PozStar Logo"></a>
                    <button class="offcanvas__close--btn" data-offcanvas>\uB2EB\uAE30</button>
                </div>
                <nav class="offcanvas__menu">
                    <ul class="offcanvas__menu_ul">
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="solutions.html">\uD68C\uC0AC \uC18C\uAC1C</a></li>
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="products.html">\uC81C\uD488 \uC18C\uAC1C</a>
                            <ul class="offcanvas__sub_menu">
                                <li class="offcanvas__sub_menu_li"><a href="P5.html" class="offcanvas__sub_menu_item">PozStar P5</a></li>
                                <li class="offcanvas__sub_menu_li"><a href="S5.html" class="offcanvas__sub_menu_item">PozStar S5</a></li>
                                <li class="offcanvas__sub_menu_li"><a href="android_software.html" class="offcanvas__sub_menu_item">PozPad (Android App)</a></li>
                                <li class="offcanvas__sub_menu_li"><a href="controller.html" class="offcanvas__sub_menu_item">PozStar Controller</a></li>
                                <li class="offcanvas__sub_menu_li"><a href="pozstar-pilot.html" class="offcanvas__sub_menu_item">PozStar Pilot</a></li>
                                <li class="offcanvas__sub_menu_li"><a href="https://blog.naver.com/pozstargnss" class="offcanvas__sub_menu_item">\uB0A9\uD488\uAE30 \uBC14\uB85C\uAC00\uAE30</a></li>
                            </ul>
                        </li>
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="Partnership.html">\uD30C\uD2B8\uB108\uC2ED</a></li>
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="news.html">\uB274\uC2A4</a></li>
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="contact.html">\uC81C\uD488 \uBB38\uC758</a></li>
                        <li class="offcanvas__menu_li"><a class="offcanvas__menu_item" href="#">\uC5B8\uC5B4</a>
                            <ul class="offcanvas__sub_menu">
                                <li class="offcanvas__sub_menu_li"><a href="index.html" class="offcanvas__sub_menu_item">English</a></li>
                                <li class="offcanvas__sub_menu_li"><a href="Ko/index.html" class="offcanvas__sub_menu_item">\uD55C\uAD6D\uC5B4</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>`;

    function isKoreanPage() {
        return /(^|\/)Ko(\/|$)/.test(window.location.pathname);
    }

    function getBasePath() {
        return isKoreanPage() ? '../' : '';
    }

    function localizeUrl(url, basePath) {
        if (!url || url === '#' || /^(?:[a-z]+:|\/\/|\/)/i.test(url)) {
            return url;
        }
        if (url.indexOf('../') === 0) {
            url = url.replace(/^(?:\.\.\/)+/, '');
        }
        return basePath + url;
    }

    function localize(container) {
        var basePath = getBasePath();
        container.querySelectorAll('[href]').forEach(function (element) {
            element.setAttribute('href', localizeUrl(element.getAttribute('href'), basePath));
        });
        container.querySelectorAll('[src]').forEach(function (element) {
            element.setAttribute('src', localizeUrl(element.getAttribute('src'), basePath));
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = isKoreanPage() ? koreanHeaderContent : englishHeaderContent;
            localize(headerContainer);
        }
    });
})();