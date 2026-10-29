/* ===================================================================
 * Small toolkit shared by the design studies: escaping, scroll reveals,
 * scroll progress, and the switcher that links the studies together.
 * Each study owns all of its own visuals; nothing here sets a look
 * except the switcher, which every study can restyle through --kit-* vars.
 * ------------------------------------------------------------------- */

(function () {

    "use strict";

    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    root.classList.add('kit-js');

    const DESIGNS = [
        { slug: 'skeuomorphism', name: 'Skeuomorphism' },
        { slug: 'neumorphism', name: 'Neumorphism' },
        { slug: 'art-nouveau', name: 'Art Nouveau' },
        { slug: 'liquid-chrome', name: 'Liquid chrome' },
        { slug: 'de-stijl', name: 'De Stijl' },
        { slug: 'memphis', name: 'Memphis' },
        { slug: 'psychedelic', name: 'Psychedelic' },
        { slug: 'vaporwave', name: 'Vaporwave' },
        { slug: 'steampunk', name: 'Steampunk' },
        { slug: 'grunge', name: 'Grunge' },
        { slug: 'paper-cutout', name: 'Paper cutout' },
        { slug: 'glitch', name: 'Glitch' },
        { slug: 'anti-design', name: 'Anti-design' },
        { slug: '3d-inflated', name: '3D inflated' },
        { slug: 'isometric', name: 'Isometric' },
        { slug: 'ukiyo-e', name: 'Ukiyo-e' },
        { slug: 'brutalism', name: 'Brutalism' },
        { slug: 'bauhaus', name: 'Bauhaus' }
    ];

    function esc(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /* Add .is-in to [data-reveal] elements as they enter the viewport.
       Elements arriving in the same frame get a staggered --d delay. */
    function reveal(options) {
        const opts = Object.assign({ stagger: 90, max: 8, margin: '0px 0px -10% 0px', threshold: 0.12 }, options);
        const items = document.querySelectorAll('[data-reveal]:not(.is-in)');

        if (reduced || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-in'); });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries
                .filter(function (e) { return e.isIntersecting; })
                .sort(function (a, b) {
                    return a.boundingClientRect.top - b.boundingClientRect.top ||
                        a.boundingClientRect.left - b.boundingClientRect.left;
                })
                .forEach(function (entry, i) {
                    entry.target.style.setProperty('--d', Math.min(i, opts.max) * opts.stagger + 'ms');
                    entry.target.classList.add('is-in');
                    observer.unobserve(entry.target);
                    if (opts.onReveal) opts.onReveal(entry.target);
                });
        }, { rootMargin: opts.margin, threshold: opts.threshold });

        items.forEach(function (el) { observer.observe(el); });
    }

    /* Call fn(progress, scrollY) on every animation frame that follows a scroll.
       Also keeps --scroll (0..1) on <html> and --p (0..1, entering to leaving)
       on every [data-progress] element for scroll-linked motion. */
    const scrollFns = [];
    let tracked = null;
    let queued = false;

    function tick() {
        queued = false;
        const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        const progress = Math.min(1, Math.max(0, scrollY / max));
        root.style.setProperty('--scroll', progress.toFixed(4));

        if (!tracked) tracked = document.querySelectorAll('[data-progress]');
        tracked.forEach(function (el) {
            const r = el.getBoundingClientRect();
            const p = (innerHeight - r.top) / (innerHeight + r.height);
            el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4));
        });

        scrollFns.forEach(function (fn) { fn(progress, scrollY); });
    }

    function onScroll(fn) {
        if (fn) scrollFns.push(fn);
        if (scrollFns.length === 1 || !fn) {
            window.addEventListener('scroll', function () {
                if (!queued) {
                    queued = true;
                    requestAnimationFrame(tick);
                }
            }, { passive: true });
            window.addEventListener('resize', function () { tracked = null; tick(); });
        }
        tick();
    }

    /* Mark the page loaded on the next frames so CSS load sequences can run. */
    function loaded(delay) {
        const go = function () {
            setTimeout(function () {
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () { root.classList.add('is-loaded'); });
                });
            }, delay || 0);
        };
        if (document.fonts && document.fonts.ready) {
            Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]).then(go);
        } else {
            go();
        }
    }

    /* Count a number up from zero when called. Keeps any suffix such as "+". */
    function countUp(el, duration) {
        const text = el.textContent;
        const match = text.match(/[\d,.]+/);
        if (!match || reduced) return;
        const target = parseFloat(match[0].replace(/,/g, ''));
        const decimals = (match[0].split('.')[1] || '').length;
        const start = performance.now();
        const ms = duration || 1400;

        function frame(now) {
            const t = Math.min(1, (now - start) / ms);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = (target * eased).toFixed(decimals);
            const shown = match[0].includes(',') ? Number(value).toLocaleString('en-IN') : value;
            el.textContent = text.replace(match[0], shown);
            if (t < 1) requestAnimationFrame(frame);
            else el.textContent = text;
        }

        requestAnimationFrame(frame);
    }

    /* The switcher: previous, next, and back to the gallery. */
    function switcher(slug) {
        const i = DESIGNS.findIndex(function (d) { return d.slug === slug; });
        if (i < 0) return;
        const prev = DESIGNS[(i - 1 + DESIGNS.length) % DESIGNS.length];
        const next = DESIGNS[(i + 1) % DESIGNS.length];

        const style = document.createElement('style');
        style.textContent = [
            '.kit-sw{position:fixed;z-index:9000;left:12px;bottom:12px;display:flex;align-items:center;gap:2px;',
            'padding:4px;border-radius:var(--kit-radius,999px);background:var(--kit-bg,rgba(17,17,17,.86));color:var(--kit-fg,#fff);',
            'font:500 12px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:var(--kit-shadow,0 8px 24px -8px rgba(0,0,0,.5));',
            '-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}',
            '.kit-sw a{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:var(--kit-radius,999px);color:inherit;text-decoration:none;white-space:nowrap}',
            '.kit-sw a:hover{background:rgba(255,255,255,.14)}',
            '.kit-sw a:focus-visible{outline:2px solid currentColor;outline-offset:1px}',
            '.kit-sw__name{padding:0 6px;opacity:.85;white-space:nowrap}',
            '@media (max-width:520px){.kit-sw__name{display:none}.kit-sw{left:8px;bottom:8px}}',
            '@media print{.kit-sw{display:none}}'
        ].join('');
        document.head.appendChild(style);

        const nav = document.createElement('nav');
        nav.className = 'kit-sw';
        nav.setAttribute('aria-label', 'Design studies');
        nav.innerHTML =
            '<a href="../' + prev.slug + '/" aria-label="Previous design: ' + esc(prev.name) + '">&larr;</a>' +
            '<span class="kit-sw__name">' + esc(DESIGNS[i].name) + ', ' + (i + 1) + ' of ' + DESIGNS.length + '</span>' +
            '<a href="../' + next.slug + '/" aria-label="Next design: ' + esc(next.name) + '">&rarr;</a>' +
            '<a href="../">All designs</a>';
        document.body.appendChild(nav);
    }

    window.Kit = {
        DESIGNS: DESIGNS,
        reduced: reduced,
        esc: esc,
        reveal: reveal,
        onScroll: onScroll,
        loaded: loaded,
        countUp: countUp,
        switcher: switcher
    };

})();
