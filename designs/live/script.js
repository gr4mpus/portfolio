/* Live build: a portfolio that looks like it's being built right now.
 * Multiplayer cursors (the tools Rahul ships with) roam the page and
 * select elements; the intro resolves from a wireframe; sections are
 * selected and committed as they scroll into view.
 */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    const projectMeta = [
        { kind: 'Photo and video editor', bullets: ['Lasso any object and adjust only that part', 'Non-destructive, layered edits you can revisit', 'Runs entirely on the device as an installable PWA'] },
        { kind: 'Social ledger', bullets: ['Groups record and approve favours for each other', 'Balances sync in real time with Supabase', 'Google sign-in, deployed on Vercel'] },
        { kind: 'E-commerce, configurator', bullets: ['Live preview of colours, pins and slot layouts', 'Razorpay checkout built in', '150+ custom orders shipped'] },
        { kind: 'Offline-first PWA', bullets: ['Endless horizontal canvas for carousels', 'Video editing in the browser with FFmpeg WASM', 'Works with no network at all'] }
    ];

    const track = [
        { role: 'Senior Frontend Engineer', org: 'Kaiser Permanente', when: '2025', note: 'Micro-frontends for a 120,000-person HR platform' },
        { role: 'Senior Associate, Frontend', org: 'Publicis Sapient', when: '2021', note: '60-component design system, 14 languages' },
        { role: 'Software Engineer, Frontend', org: 'Tata Consultancy Services', when: '2019', note: 'Citibank card flows, live network dashboards' },
        { role: 'B.Tech, Computer Science', org: 'GGSIP University, New Delhi', when: '2015', note: 'Graduated 2019' }
    ];

    const steps = [
        ['Measure first', 'Lighthouse, Core Web Vitals and real-user telemetry decide what gets fixed.'],
        ['Build the system', 'Components, tokens and a shared library, so the next screen is quicker than the last.'],
        ['Test the real flow', 'Jest, React Testing Library and Cypress as merge gates, asserting what users actually do.'],
        ['Ship, then keep shipping', 'Small releases through CI, then watch the numbers and iterate.']
    ];

    const tableRows = [
        ['Languages', 'TypeScript, JavaScript, HTML, CSS and SCSS'],
        ['Frontend', 'React, Next.js, Redux Toolkit, Angular, RxJS'],
        ['Architecture', 'Micro-frontends, Module Federation, design tokens'],
        ['Backend', 'Node.js, BFF API routes, REST, Supabase'],
        ['Quality', 'Jest, React Testing Library, Cypress, WCAG 2.1 AA'],
        ['Delivery', 'Docker, Kubernetes, Jenkins, Copilot, Claude, MCP']
    ];

    const stack = ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Node.js', 'Module Federation', 'Angular', 'RxJS', 'Jest', 'Cypress', 'Storybook', 'Docker', 'Kubernetes', 'Supabase', 'Figma'];

    const H = function (a, b) {
        return `<span class="hl hl--white">${e(a)}</span><span class="hl hl--red">${e(b)}</span>`;
    };

    app.innerHTML = `
    <div class="edge" aria-hidden="true"><span class="edge__fill"></span></div>

    <header class="nav">
        <a class="nav__logo" href="#top" aria-label="${e(P.name)}, back to top">R</a>
        <nav aria-label="Sections">
            <a href="#top">Home</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <p class="hero__word" aria-hidden="true" data-select="Text / Portfolio">Portfolio</p>
            <figure class="hero__photo" data-select="Image / Rahul">
                <img src="../../images/rahul-suit.webp" alt="Rahul in a dark double-breasted suit, white shirt and black tie" width="922" height="1400">
            </figure>

            <div class="hero__copy">
                <p class="hero__hello" data-select="Text / Hello">Hello, I'm</p>
                <h1 id="hero-name" class="hero__name" data-select="Heading / Name"><span>${e(P.first)}</span><span>${e(P.last)}<i>.</i></span></h1>
                <p class="hero__role" data-select="Text / Role">Senior frontend engineer<br>&amp; design systems builder</p>
                <p class="hero__bio" data-select="Text / Bio">I build React, Next.js and TypeScript platforms that ship to over 120,000 people. Senior Frontend Engineer at Kaiser Permanente, based in Pune.</p>
                <a class="cta" href="#work" data-select="Button / Primary">View work <span aria-hidden="true">↗</span></a>
                <p class="mono hero__meta" data-select="Text / Meta">Based in Pune, India<span aria-hidden="true">  /  </span>7 years shipping frontends</p>
            </div>

            <dl class="hero__stats">
                <div data-select="Stat / Reach"><dd>120k</dd><dt>People on platforms I built</dt></div>
                <div data-select="Stat / Years"><dd>07</dd><dt>Years in production</dt></div>
                <div data-select="Stat / Components"><dd>60</dd><dt>Design system components</dt></div>
            </dl>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <div class="section__head">
                <div>
                    <p class="mono kicker">Selected work</p>
                    <h2 id="work-title" class="display" data-select="H2 / Work">${H('Work that', 'ships.')}</h2>
                </div>
                <div class="section__aside" data-select="Text / Intro">
                    <p>Products I designed, built and run myself, alongside the day job. Each one is live; open it and try it.</p>
                    <dl class="mini-stats">
                        <div><dd>04</dd><dt>Live products</dt></div>
                        <div><dd>150+</dd><dt>Orders shipped</dt></div>
                        <div><dd>55+</dd><dt>Active groups</dt></div>
                    </dl>
                </div>
            </div>

            <div class="projects">
                ${P.projects.map((p, i) => `
                <article class="project" data-select="Card / ${e(p.name)}">
                    <p class="project__no">${String(i + 1).padStart(2, '0')}</p>
                    <div class="project__top">
                        <h3 class="display">${e(p.name)}<i>.</i></h3>
                        <p class="mono">${e(projectMeta[i].kind)}</p>
                    </div>
                    <p class="project__summary">${e(p.summary)}</p>
                    <ul class="project__bullets">${projectMeta[i].bullets.map(b => `<li>${e(b)}</li>`).join('')}</ul>
                    <div class="project__foot">
                        <ul class="tags" aria-label="Built with">${p.tags.map(t => `<li>${e(t)}</li>`).join('')}</ul>
                        <a class="mono project__link" href="${e(p.href)}" target="_blank" rel="noopener">Live <span aria-hidden="true">↗</span></a>
                    </div>
                </article>`).join('')}
            </div>
        </section>

        <section class="stack" aria-labelledby="stack-title">
            <p id="stack-title" class="mono kicker">Stack I ship with</p>
            <div class="stack__belt" aria-hidden="true" data-select="Marquee / Stack">
                <div class="stack__track">${stack.concat(stack).map(s => `<span>${e(s)}</span>`).join('<i>•</i>')}</div>
            </div>
            <p class="visually-hidden">${stack.join(', ')}</p>
        </section>

        <section class="section record" aria-labelledby="record-title">
            <div class="record__big">
                <p class="mono kicker">Track record</p>
                <h2 id="record-title" class="display" data-select="H2 / Record">${H('Built fast.', 'Shipped real.')}</h2>
                <p class="record__num" data-count data-select="Number / Impact">5x</p>
                <p class="record__caption" data-select="Text / Caption">more completed forms after I rebuilt abandonment recovery across 120+ multi-step forms at Publicis Sapient.</p>
            </div>
            <ol class="timeline">
                ${track.map(t => `
                <li data-select="Row / ${e(t.when)}">
                    <p class="timeline__when">${e(t.when)}</p>
                    <div>
                        <h3>${e(t.role)}</h3>
                        <p class="timeline__org">${e(t.org)}</p>
                        <p class="timeline__note">${e(t.note)}</p>
                    </div>
                </li>`).join('')}
            </ol>
        </section>

        <section id="about" class="section about" aria-labelledby="about-title">
            <p class="mono kicker">About</p>
            <h2 id="about-title" class="display" data-select="H2 / About">${H('Not just pixels.', 'Platforms that scale.')}</h2>
            <div class="about__cols">
                <p data-select="Text / About">I'm a senior frontend engineer at Kaiser Permanente, where I re-architected a legacy approvals platform into React and Next.js micro-frontends so three teams can deploy on their own.</p>
                <p data-select="Text / Before">Before that I spent four years at Publicis Sapient building a 60-component design system for a brand in 14 languages, and two at TCS on Citibank card flows and live telemetry dashboards.</p>
            </div>

            <div class="about__grid">
                <div data-select="Table / Skills">
                    <p class="mono kicker">Education and skills</p>
                    <p class="edu"><b>${e(P.education.degree)}</b><br>${e(P.education.school)}, ${e(P.education.years)}</p>
                    <dl class="table">
                        ${tableRows.map(r => `<div><dt class="mono">${e(r[0])}</dt><dd>${e(r[1])}</dd></div>`).join('')}
                    </dl>
                </div>
                <div>
                    <p class="mono kicker">How I work</p>
                    <ol class="steps">
                        ${steps.map((s, i) => `<li data-select="Step / ${String(i + 1).padStart(2, '0')}"><span class="steps__no">${String(i + 1).padStart(2, '0')}</span><div><h3>${e(s[0])}</h3><p>${e(s[1])}</p></div></li>`).join('')}
                    </ol>
                </div>
                <aside class="note" data-select="Sticky / Note">
                    <p>Measure it. Fix it. Then write the test that proves it stays fixed.</p>
                    <span>Rahul</span>
                </aside>
            </div>

        </section>

        <section id="contact" class="section contact" aria-labelledby="contact-title">
            <p class="mono kicker">Contact</p>
            <h2 id="contact-title" class="display" data-select="H2 / Contact">${H("Let's build", 'something real.')}</h2>
            <p class="contact__line" data-select="Text / Line">${e(P.contactLine)}</p>
            <a class="contact__email" data-select="Link / Email" href="mailto:${e(P.email)}">${e(P.email)}</a>
            <ul class="contact__links mono" data-select="List / Links">
                <li><a href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                ${P.social.map(s => `<li><a href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
                <li><a href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a></li>
            </ul>
        </section>
    </main>

    <footer class="foot mono">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
        <a href="#top">Back to top</a>
    </footer>

    <div class="status" role="group" aria-label="Live cursors">
        <span class="status__live"><span class="status__dot" aria-hidden="true"></span><span class="status__text">Tools idle</span></span>
        <button type="button" class="status__toggle" aria-pressed="true">Cursors on</button>
    </div>

    <div class="layer" aria-hidden="true"></div>`;

    const layer = document.querySelector('.layer');
    const root = document.documentElement;
    const mobile = matchMedia('(max-width: 700px)').matches;


    /* Selection frames: blue boxes with handles and a name tag, tracked to
       their element every frame
       -------------------------------------------------- */
    const boxes = new Set();

    function select(el, label, color) {
        const b = document.createElement('div');
        b.className = 'sel';
        if (color) b.style.setProperty('--sel', color);
        b.innerHTML = `<span class="sel__tag">${e(label)}</span><i></i><i></i><i></i><i></i>`;
        layer.appendChild(b);
        const box = { el: el, node: b, done: false };
        boxes.add(box);
        place(box);
        requestAnimationFrame(function () { b.classList.add('is-on'); });
        return box;
    }

    function release(box) {
        box.done = true;
        box.node.classList.remove('is-on');
        setTimeout(function () { box.node.remove(); boxes.delete(box); }, 350);
    }

    function place(box) {
        const r = box.el.getBoundingClientRect();
        box.node.style.transform = `translate(${r.left - 4}px, ${r.top - 4}px)`;
        box.node.style.width = r.width + 8 + 'px';
        box.node.style.height = r.height + 8 + 'px';
    }

    (function track() {
        boxes.forEach(place);
        requestAnimationFrame(track);
    })();


    /* Cursors: only appear when there is something to build. Each one flies
       in, selects an element, drags it into place, then leaves.
       -------------------------------------------------- */
    const TOOLS = [
        ['Copilot', '#7c6cf2'], ['Figma', '#2fbf71'], ['Storybook', '#ff4785'], ['Claude', '#e8875a'],
        ['Jest', '#c63d14'], ['Cypress', '#3ec6a8'], ['Lighthouse', '#f5b301'], ['axe', '#4a90e2'],
        ['Next.js', '#e8e8e8'], ['Redux', '#9a6cf5'], ['Docker', '#2496ed'], ['MCP', '#ef4a23']
    ];
    const MAX = mobile ? 2 : 3;
    let toolIndex = 0;
    let enabled = !Kit.reduced;
    let working = 0;

    const pool = TOOLS.map(function (t) {
        const n = document.createElement('div');
        n.className = 'cur';
        n.style.setProperty('--c', t[1]);
        n.innerHTML = `<svg viewBox="0 0 16 20"><path d="M1 1 L1 16 L5 12.5 L8 19 L10.6 17.8 L7.7 11.6 L13 11.4 Z"/></svg><span>${e(t[0])}</span>`;
        layer.appendChild(n);
        return { name: t[0], color: t[1], node: n, x: -60, y: 0, busy: false, leaving: false, queue: [] };
    });

    const statusText = document.querySelector('.status__text');
    function status() {
        statusText.textContent = working ? working + (working === 1 ? ' tool working' : ' tools working') : 'Tools idle';
        root.classList.toggle('is-working', working > 0);
    }

    const ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

    function animate(ms, step, done) {
        const start = performance.now();
        (function frame(now) {
            const t = Math.min(1, (now - start) / ms);
            step(t);
            if (t < 1) requestAnimationFrame(frame);
            else if (done) done();
        })(start);
    }

    function setCursor(c, x, y) {
        c.x = x;
        c.y = y;
        c.node.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    }

    /* move a cursor to a point that may itself be moving (the page scrolls) */
    function travel(c, target, ms, done) {
        const sx = c.x, sy = c.y;
        animate(ms, function (t) {
            const p = target(), k = ease(t);
            setCursor(c, sx + (p[0] - sx) * k, sy + (p[1] - sy) * k);
        }, done);
    }

    /* without cursors, an element simply fades up into place */
    function pop(el) {
        el.classList.remove('is-pending');
        el.classList.add('is-popped');
    }

    /* The marquee: press at the top-left of the element, drag a sky-blue
       rectangle to the bottom-right, and the element appears inside it */
    function marquee(color) {
        const m = document.createElement('div');
        m.className = 'marquee';
        if (color) m.style.setProperty('--sel', color);
        layer.appendChild(m);
        return m;
    }

    function work(c) {
        const el = c.queue.shift();
        if (!el) return leave(c);
        const r = el.getBoundingClientRect();
        // gone off screen while waiting its turn: place it without ceremony
        if (r.bottom < -80 || r.top > innerHeight + 80 || !r.width) {
            pop(el);
            return work(c);
        }

        const pad = 6;
        const corner = function () { const q = el.getBoundingClientRect(); return [q.left - pad, q.top - pad]; };

        travel(c, corner, 420, function () {
            c.node.classList.add('is-press');
            const m = marquee(c.color);
            el.classList.remove('is-pending');
            el.classList.add('is-revealing');
            const ms = Math.min(900, 420 + Math.sqrt(r.width * r.height) * .9);

            animate(ms, function (t) {
                const k = ease(t);
                const q = el.getBoundingClientRect();
                const x0 = q.left - pad, y0 = q.top - pad;
                const w = (q.width + pad * 2) * k, h = (q.height + pad * 2) * Math.min(1, k * 1.08);
                m.style.transform = `translate(${x0}px, ${y0}px)`;
                m.style.width = w + 'px';
                m.style.height = h + 'px';
                // the element shows only inside the marquee as it grows
                el.style.clipPath = `inset(-${pad}px ${Math.max(0, q.width + pad - w)}px ${Math.max(0, q.height + pad - h)}px -${pad}px)`;
                setCursor(c, x0 + w, y0 + h);
            }, function () {
                el.style.clipPath = '';
                el.classList.remove('is-revealing');
                c.node.classList.remove('is-press');
                if (el.matches('[data-count]')) countUp(el);
                // release: the marquee fades into a selection frame with a tag
                m.classList.add('is-done');
                const box = select(el, c.name + ' · ' + el.dataset.select, c.color);
                setTimeout(function () { m.remove(); }, 300);
                setTimeout(function () { release(box); work(c); }, 380);
            });
        });
    }

    /* linger briefly, then fade away */
    function leave(c) {
        c.leaving = true;
        setTimeout(function () {
            if (c.queue.length) { c.leaving = false; return work(c); }
            c.node.classList.remove('is-on');
            travel(c, function () { return [c.x + 18, c.y + 26]; }, 400, function () {
                c.busy = false;
                c.leaving = false;
                working--;
                status();
            });
        }, 700);
    }

    function spawn(first, delay) {
        // take the next free tool in turn, so the names vary
        let c = null;
        for (let k = 0; k < pool.length && !c; k++) {
            const cand = pool[(toolIndex + k) % pool.length];
            if (!cand.busy) { c = cand; toolIndex = (toolIndex + k + 1) % pool.length; }
        }
        if (!c) return null;
        c.busy = true;
        c.leaving = false;
        c.queue = [];
        const r = first.getBoundingClientRect();
        const fromLeft = r.left + r.width / 2 < innerWidth / 2;
        setCursor(c, fromLeft ? -30 : innerWidth + 10, Math.max(60, Math.min(innerHeight - 80, r.top + 40 + Math.random() * 80)));
        working++;
        status();
        setTimeout(function () { c.node.classList.add('is-on'); work(c); }, delay);
        return c;
    }

    /* hand a batch of newly visible elements to cursors */
    function build(els) {
        els = els.filter(function (el) { return el.classList.contains('is-pending'); });
        if (!els.length) return;
        if (!enabled) return els.forEach(pop);

        // reuse cursors that are still at work, otherwise bring new ones in
        let crew = pool.filter(function (c) { return c.busy && !c.leaving; });
        const want = Math.min(MAX, els.length);
        let delay = 0;
        while (crew.length < want) {
            const c = spawn(els[crew.length], delay);
            if (!c) break;
            crew.push(c);
            delay += 160;
        }
        if (!crew.length) return els.forEach(pop);
        els.forEach(function (el) {
            crew.reduce(function (a, b) { return b.queue.length < a.queue.length ? b : a; }).queue.push(el);
        });
    }

    function countUp(n) {
        if (Kit.reduced) return;
        const start = performance.now();
        (function step(now) {
            const t = Math.min(1, (now - start) / 900);
            n.textContent = Math.max(1, Math.round(5 * (1 - Math.pow(1 - t, 3)))) + 'x';
            if (t < 1) requestAnimationFrame(step);
        })(start);
    }


    /* Wire it up: the hero is built on load, everything else as it scrolls in
       -------------------------------------------------- */
    const targets = Array.from(document.querySelectorAll('[data-select]'));
    const heroTargets = targets.filter(function (el) { return el.closest('.hero'); });

    if (!Kit.reduced) targets.forEach(function (el) { el.classList.add('is-pending'); });

    let batch = [];
    let batchTimer = null;
    const io = 'IntersectionObserver' in window && !Kit.reduced ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
            if (en.isIntersecting) { batch.push(en.target); io.unobserve(en.target); }
        });
        clearTimeout(batchTimer);
        batchTimer = setTimeout(function () {
            // build in reading order: top to bottom, left to right
            const list = batch.sort(function (a, b) {
                const p = a.compareDocumentPosition(b);
                return p & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
            });
            batch = [];
            build(list);
        }, 90);
    }, { rootMargin: '0px 0px -12% 0px' }) : null;

    function start() {
        if (Kit.reduced) return;
        build(heroTargets);
        if (io) targets.filter(function (el) { return !el.closest('.hero'); }).forEach(function (el) { io.observe(el); });
    }

    const toggle = document.querySelector('.status__toggle');
    function setEnabled(v) {
        enabled = v;
        toggle.setAttribute('aria-pressed', String(v));
        toggle.textContent = v ? 'Cursors on' : 'Cursors off';
        root.classList.toggle('no-cursors', !v);
    }
    toggle.addEventListener('click', function () { setEnabled(!enabled); });
    setEnabled(enabled);
    if (Kit.reduced) toggle.disabled = true;

    /* The red rule down the left edge fills as you read */
    Kit.onScroll(function (p) { root.style.setProperty('--read', p.toFixed(4)); });

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(start, 250); });
    else setTimeout(start, 250);

    Kit.switcher('live');
})();
