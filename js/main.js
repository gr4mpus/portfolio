/* ===================================================================
 * Rahul Prasad, portfolio
 * Theme switch, intro and hero sequence, scroll reveals, section highlighting.
 * ------------------------------------------------------------------- */

(function (root) {

    "use strict";

    const THEME_KEY = 'rahul-portfolio-theme';
    const BRUTAL = 'neo-brutalist-comic';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');


    /* Theme switch
     * -------------------------------------------------- */
    function initThemeSwitch() {
        const options = document.querySelectorAll('[data-theme-option]');
        const themeColor = document.querySelector('meta[name="theme-color"]');

        function apply(theme) {
            const isBrutal = theme === BRUTAL;

            if (isBrutal) {
                root.setAttribute('data-theme', BRUTAL);
            } else {
                root.removeAttribute('data-theme');
            }

            options.forEach(function (option) {
                option.setAttribute('aria-pressed', String(option.dataset.themeOption === (isBrutal ? BRUTAL : 'dark')));
            });

            if (themeColor) themeColor.setAttribute('content', isBrutal ? '#ffffff' : '#15191f');
        }

        function save(theme) {
            try {
                if (theme === BRUTAL) {
                    localStorage.setItem(THEME_KEY, BRUTAL);
                } else {
                    localStorage.removeItem(THEME_KEY);
                }
            } catch (e) {}
        }

        // The themes have different heights, so keep whatever the reader is
        // looking at in the same place on screen across the switch.
        function applyKeepingPlace(theme) {
            const header = document.querySelector('.masthead').offsetHeight;
            const candidates = document.querySelectorAll('.hero, .section__head, .job__head, .job__context, .win, .project, .skills__group, .contact');
            let anchor = null;
            let anchorTop = 0;

            for (const el of candidates) {
                const top = el.getBoundingClientRect().top;
                if (top >= header) {
                    anchor = el;
                    anchorTop = top;
                    break;
                }
            }

            apply(theme);

            if (anchor && scrollY > 0) {
                window.scrollTo({ top: scrollY + anchor.getBoundingClientRect().top - anchorTop, behavior: 'instant' });
            }
        }

        // Reveal the new theme over the old one: a circle that grows out of the
        // switch for Dark, a hard diagonal wipe for Brutal.
        function transitionTo(theme, origin) {
            if (reducedMotion.matches || !document.startViewTransition) {
                applyKeepingPlace(theme);
                return;
            }

            const transition = document.startViewTransition(function () { applyKeepingPlace(theme); });

            transition.ready.then(function () {
                let clipPath;
                let easing;
                let duration;

                if (theme === BRUTAL) {
                    clipPath = [
                        'polygon(0% 0%, 0% 0%, -25% 100%, 0% 100%)',
                        'polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)'
                    ];
                    easing = 'cubic-bezier(.77, 0, .18, 1)';
                    duration = 750;
                } else {
                    const rect = origin.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
                    clipPath = [
                        'circle(0px at ' + x + 'px ' + y + 'px)',
                        'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'
                    ];
                    easing = 'cubic-bezier(.65, 0, .35, 1)';
                    duration = 800;
                }

                root.animate({ clipPath: clipPath }, {
                    duration: duration,
                    easing: easing,
                    pseudoElement: '::view-transition-new(root)'
                });
            }).catch(function () {});
        }

        options.forEach(function (option) {
            option.addEventListener('click', function () {
                const theme = option.dataset.themeOption;
                const current = root.getAttribute('data-theme') === BRUTAL ? BRUTAL : 'dark';
                if (theme === current) return;
                transitionTo(theme, option);
                save(theme);
            });
        });

        apply(root.getAttribute('data-theme'));
    }


    /* Hero load sequence
     * -------------------------------------------------- */
    function initReveal() {
        document.querySelectorAll('[data-reveal]').forEach(function (el, i) {
            el.style.setProperty('--i', i);
        });

        // With the intro playing, start as its panel begins to lift
        const wait = root.classList.contains('has-loader') ? 950 : 0;

        setTimeout(function () {
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    root.classList.add('is-ready');
                });
            });
        }, wait);

        const loader = document.querySelector('.loader');
        if (loader) {
            loader.addEventListener('animationend', function (event) {
                if (event.target === loader) loader.remove();
            });
        }
    }


    /* Scroll reveals
     * -------------------------------------------------- */
    function initScrollReveal() {
        if (!('IntersectionObserver' in window) || reducedMotion.matches) return;

        const targets = [
            ['.section__title', 'mask'],
            ['.section__intro, .job__head, .job__context, .skills__group', 'fade'],
            ['.win, .project', 'card'],
            ['.contact__title, .contact__email, .contact__links', 'fade']
        ];

        targets.forEach(function (target) {
            document.querySelectorAll(target[0]).forEach(function (el) {
                if (target[1] === 'mask') {
                    el.innerHTML = '<span class="mask"><span>' + el.innerHTML + '</span></span>';
                }
                el.setAttribute('data-scroll', target[1]);
            });
        });

        const observer = new IntersectionObserver(function (entries) {
            entries
                .filter(function (entry) { return entry.isIntersecting; })
                .sort(function (a, b) {
                    return a.boundingClientRect.top - b.boundingClientRect.top ||
                        a.boundingClientRect.left - b.boundingClientRect.left;
                })
                .forEach(function (entry, i) {
                    entry.target.style.setProperty('--delay', Math.min(i, 6) * 90 + 'ms');
                    entry.target.classList.add('is-in');
                    observer.unobserve(entry.target);
                    // Drop the delay afterwards so it never slows hover or theme changes
                    setTimeout(function () { entry.target.style.removeProperty('--delay'); }, 1600);
                });
        }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

        document.querySelectorAll('[data-scroll]').forEach(function (el) {
            observer.observe(el);
        });

        root.classList.add('js-scroll');
    }


    /* Reading progress under the header
     * -------------------------------------------------- */
    function initProgress() {
        const bar = document.querySelector('.scroll-progress');
        if (!bar) return;

        let queued = false;

        function update() {
            const max = document.documentElement.scrollHeight - innerHeight;
            bar.style.setProperty('--progress', max > 0 ? Math.min(scrollY / max, 1) : 0);
            queued = false;
        }

        window.addEventListener('scroll', function () {
            if (!queued) {
                queued = true;
                requestAnimationFrame(update);
            }
        }, { passive: true });

        update();
    }


    /* Highlight the nav link for the section in view
     * -------------------------------------------------- */
    function initSectionSpy() {
        const links = document.querySelectorAll('.masthead__nav a');
        if (!('IntersectionObserver' in window) || !links.length) return;

        const byId = {};
        links.forEach(function (link) {
            byId[link.getAttribute('href').slice(1)] = link;
        });

        // A section becomes current when its top crosses a thin trigger line:
        // a third of the way up from the bottom on phones, mid-screen on desktop.
        const mobile = window.matchMedia('(max-width: 760px)');
        const sections = document.querySelectorAll('main section[id]');
        let observer = null;

        function watch() {
            if (observer) observer.disconnect();

            observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    links.forEach(function (link) { link.removeAttribute('aria-current'); });
                    const link = byId[entry.target.id];
                    if (link) link.setAttribute('aria-current', 'true');
                });
            }, { rootMargin: mobile.matches ? '-66% 0px -33% 0px' : '-40% 0px -55% 0px' });

            sections.forEach(function (section) {
                observer.observe(section);
            });
        }

        mobile.addEventListener('change', watch);
        watch();
    }


    /* Dark theme: label the "selected" portrait with its real size
     * -------------------------------------------------- */
    function initPortraitSize() {
        const figure = document.querySelector('.hero__portrait');
        if (!figure || !('ResizeObserver' in window)) return;

        new ResizeObserver(function (entries) {
            const box = entries[0].contentRect;
            figure.setAttribute('data-size', Math.round(box.width) + ' \u00d7 ' + Math.round(box.height));
        }).observe(figure);
    }


    /* Mobile carousels: position dots under each swipeable row
     * -------------------------------------------------- */
    function initCarousels() {
        const mobile = window.matchMedia('(max-width: 760px)');

        document.querySelectorAll('.wins, .projects').forEach(function (row) {
            const items = Array.from(row.children);
            const dots = document.createElement('div');
            dots.className = 'swipe-dots';
            dots.setAttribute('aria-hidden', 'true');
            items.forEach(function () { dots.appendChild(document.createElement('span')); });
            row.after(dots);

            let queued = false;

            function update() {
                const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : 1;
                const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
                const index = atEnd ? items.length - 1 : Math.round(row.scrollLeft / step);
                Array.from(dots.children).forEach(function (dot, i) {
                    dot.classList.toggle('is-active', i === index);
                });
                queued = false;
            }

            row.addEventListener('scroll', function () {
                if (!queued) {
                    queued = true;
                    requestAnimationFrame(update);
                }
            }, { passive: true });

            // Let keyboard users scroll the row while it is a carousel
            function syncFocus() {
                if (mobile.matches) {
                    row.setAttribute('tabindex', '0');
                } else {
                    row.removeAttribute('tabindex');
                }
            }

            mobile.addEventListener('change', syncFocus);
            syncFocus();
            update();
        });
    }


    const year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();

    initThemeSwitch();
    initReveal();
    initSectionSpy();
    initScrollReveal();
    initProgress();
    initPortraitSize();
    initCarousels();

})(document.documentElement);