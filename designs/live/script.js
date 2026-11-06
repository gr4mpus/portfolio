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
        <section class="hero" aria-labelledby="hero-name" data-frame="Frame / Hero">
            <p class="hero__word" aria-hidden="true">Portfolio</p>
            <figure class="hero__photo" data-frame="Image / Rahul">
                <img src="../../images/rahul-cutout.webp" alt="${e(P.photoAlt)}" width="817" height="1600">
            </figure>

            <div class="hero__copy">
                <p class="hero__hello" data-frame="Text / Hello">Hello, I'm</p>
                <h1 id="hero-name" class="hero__name" data-frame="Heading / Name"><span>${e(P.first)}</span><span>${e(P.last)}<i>.</i></span></h1>
                <p class="hero__role" data-frame="Text / Role">Senior frontend engineer<br>&amp; design systems builder</p>
                <p class="hero__bio">I build React, Next.js and TypeScript platforms that ship to over 120,000 people. Senior Frontend Engineer at Kaiser Permanente, based in Pune.</p>
                <a class="cta" href="#work" data-frame="Button / Primary">View work <span aria-hidden="true">↗</span></a>
                <p class="mono hero__meta">Based in Pune, India<span aria-hidden="true">  /  </span>7 years shipping frontends</p>
            </div>

            <dl class="hero__stats" data-frame="Stack / Stats">
                <div><dd>120k</dd><dt>People on platforms I built</dt></div>
                <div><dd>07</dd><dt>Years in production</dt></div>
                <div><dd>60</dd><dt>Design system components</dt></div>
            </dl>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <div class="section__head">
                <div>
                    <p class="mono kicker">Selected work</p>
                    <h2 id="work-title" class="display" data-select="H2 / Work">${H('Work that', 'ships.')}</h2>
                </div>
                <div class="section__aside">
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
            <div class="stack__belt" aria-hidden="true">
                <div class="stack__track">${stack.concat(stack).map(s => `<span>${e(s)}</span>`).join('<i>•</i>')}</div>
            </div>
            <p class="visually-hidden">${stack.join(', ')}</p>
        </section>

        <section class="section record" aria-labelledby="record-title">
            <div class="record__big">
                <p class="mono kicker">Track record</p>
                <h2 id="record-title" class="display" data-select="H2 / Record">${H('Built fast.', 'Shipped real.')}</h2>
                <p class="record__num" data-count>5x</p>
                <p class="record__caption">more completed forms after I rebuilt abandonment recovery across 120+ multi-step forms at Publicis Sapient.</p>
            </div>
            <ol class="timeline" data-select="List / Timeline">
                ${track.map(t => `
                <li>
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
                <p>I'm a senior frontend engineer at Kaiser Permanente, where I re-architected a legacy approvals platform into React and Next.js micro-frontends so three teams can deploy on their own.</p>
                <p>Before that I spent four years at Publicis Sapient building a 60-component design system for a brand in 14 languages, and two at TCS on Citibank card flows and live telemetry dashboards.</p>
            </div>

            <div class="about__grid">
                <div>
                    <p class="mono kicker">Education and skills</p>
                    <p class="edu"><b>${e(P.education.degree)}</b><br>${e(P.education.school)}, ${e(P.education.years)}</p>
                    <dl class="table">
                        ${tableRows.map(r => `<div><dt class="mono">${e(r[0])}</dt><dd>${e(r[1])}</dd></div>`).join('')}
                    </dl>
                </div>
                <div>
                    <p class="mono kicker">How I work</p>
                    <ol class="steps">
                        ${steps.map((s, i) => `<li><span class="steps__no">${String(i + 1).padStart(2, '0')}</span><div><h3>${e(s[0])}</h3><p>${e(s[1])}</p></div></li>`).join('')}
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
            <p class="contact__line">${e(P.contactLine)}</p>
            <a class="contact__email" href="mailto:${e(P.email)}">${e(P.email)}</a>
            <ul class="contact__links mono">
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
        <span class="status__live"><span class="status__dot" aria-hidden="true"></span><span class="status__count">12</span> tools live</span>
        <button type="button" class="status__toggle" aria-pressed="true">Cursors on</button>
    </div>

    <div class="layer" aria-hidden="true"></div>`;

    const layer = document.querySelector('.layer');
    const root = document.documentElement;


    /* Selection boxes: a blue frame with handles and a name tag, tracked
       to an element's position every frame while it is visible.
       -------------------------------------------------- */
    const boxes = new Set();

    function select(el, label, opts) {
        const o = Object.assign({ life: 1600, color: null, fill: false }, opts);
        const b = document.createElement('div');
        b.className = 'sel' + (o.fill ? ' sel--fill' : '');
        if (o.color) b.style.setProperty('--sel', o.color);
        b.innerHTML = `<span class="sel__tag">${e(label)}</span><i></i><i></i><i></i><i></i>`;
        layer.appendChild(b);
        const box = { el: el, node: b, until: performance.now() + o.life };
        boxes.add(box);
        place(box);
        requestAnimationFrame(function () { b.classList.add('is-on'); });
        return box;
    }

    function place(box) {
        const r = box.el.getBoundingClientRect();
        box.node.style.transform = `translate(${r.left - 4}px, ${r.top - 4}px)`;
        box.node.style.width = r.width + 8 + 'px';
        box.node.style.height = r.height + 8 + 'px';
    }

    function tickBoxes(now) {
        boxes.forEach(function (box) {
            place(box);
            if (now > box.until && !box.leaving) {
                box.leaving = true;
                box.node.classList.remove('is-on');
                setTimeout(function () { box.node.remove(); boxes.delete(box); }, 350);
            }
        });
    }


    /* Cursors: each one roams, then picks a visible element and selects it
       -------------------------------------------------- */
    const TOOLS = [
        ['Copilot', '#7c6cf2'], ['Claude', '#e8875a'], ['Figma', '#2fbf71'], ['Storybook', '#ff4785'],
        ['Jest', '#c63d14'], ['Cypress', '#3ec6a8'], ['Lighthouse', '#f5b301'], ['axe', '#4a90e2'],
        ['Next.js', '#e8e8e8'], ['Redux', '#9a6cf5'], ['Docker', '#2496ed'], ['MCP', '#ef4a23']
    ];

    const mobile = matchMedia('(max-width: 700px)').matches;
    const count = mobile ? 5 : TOOLS.length;
    document.querySelector('.status__count').textContent = count;

    const cursors = TOOLS.slice(0, count).map(function (t, i) {
        const n = document.createElement('div');
        n.className = 'cur';
        n.style.setProperty('--c', t[1]);
        n.innerHTML = `<svg viewBox="0 0 16 20"><path d="M1 1 L1 16 L5 12.5 L8 19 L10.6 17.8 L7.7 11.6 L13 11.4 Z"/></svg><span>${e(t[0])}</span>`;
        layer.appendChild(n);
        const c = {
            name: t[0], color: t[1], node: n,
            x: Math.random() * innerWidth, y: Math.random() * innerHeight,
            tx: 0, ty: 0, vx: 0, vy: 0, next: 0, target: null, idle: i * 400
        };
        roam(c, 0);
        return c;
    });

    function selectable() {
        return Array.from(document.querySelectorAll('.hero__name, .hero__role, .hero__photo, .cta, .hero__stats div, .display, .project, .project h3, .tags li, .timeline li, .table div, .steps li, .note, .contact__email, .stack__belt, .mini-stats div, .nav'))
            .filter(function (el) {
                const r = el.getBoundingClientRect();
                return r.bottom > 60 && r.top < innerHeight - 80 && r.width > 10;
            });
    }

    function roam(c, now) {
        c.target = null;
        c.tx = innerWidth * (.08 + Math.random() * .84);
        c.ty = innerHeight * (.12 + Math.random() * .7);
        c.next = now + 1500 + Math.random() * 2500;
    }

    function aim(c, now) {
        const list = selectable();
        if (!list.length) return roam(c, now);
        const el = list[Math.floor(Math.random() * list.length)];
        const r = el.getBoundingClientRect();
        c.target = el;
        c.tx = r.left + Math.min(r.width - 6, 12 + Math.random() * Math.min(160, r.width));
        c.ty = r.top + Math.min(r.height - 4, 6 + Math.random() * Math.min(40, r.height));
        c.next = now + 900 + Math.random() * 600;
        c.selectAt = now + 700;
        c.selected = false;
    }

    let on = !Kit.reduced;
    let last = performance.now();
    let scrollKick = 0;
    let lastY = scrollY;

    window.addEventListener('scroll', function () {
        scrollKick += scrollY - lastY;
        lastY = scrollY;
    }, { passive: true });

    function frame(now) {
        const dt = Math.min(50, now - last) / 16.67;
        last = now;

        if (on) {
            // scrolling drags the cursors a little, like a page moving under the mouse
            const drag = scrollKick * .25;
            scrollKick *= .6;
            cursors.forEach(function (c) {
                if (now < c.idle) return;
                if (now > c.next) {
                    if (c.target && !c.selected) { c.next = now + 200; }
                    else if (Math.random() < .55) aim(c, now);
                    else roam(c, now);
                }
                if (c.target && !c.selected && now > c.selectAt) {
                    c.selected = true;
                    const label = c.target.dataset.select || c.target.dataset.frame || labelFor(c.target);
                    select(c.target, c.name + ' · ' + label, { color: c.color, life: 1300 });
                }
                // follow the target element while it moves with the page
                if (c.target) {
                    const r = c.target.getBoundingClientRect();
                    c.tx = Math.max(8, Math.min(innerWidth - 40, r.left + 14));
                    c.ty = Math.max(8, Math.min(innerHeight - 40, r.top + 10));
                }
                const k = .08 * dt;
                c.vx = (c.vx + (c.tx - c.x) * k) * .78;
                c.vy = (c.vy + (c.ty - c.y) * k) * .78;
                c.x += c.vx * dt;
                c.y += c.vy * dt - drag * .02;
                c.node.style.transform = `translate(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px)`;
            });
        }
        tickBoxes(now);
        requestAnimationFrame(frame);
    }

    function labelFor(el) {
        const tag = el.tagName.toLowerCase();
        if (tag === 'li') return 'List item';
        if (tag === 'a') return 'Link';
        if (/^h\d$/.test(tag)) return 'Heading';
        if (tag === 'figure') return 'Image';
        return 'Frame';
    }

    requestAnimationFrame(frame);

    const toggle = document.querySelector('.status__toggle');
    function setOn(v) {
        on = v;
        toggle.setAttribute('aria-pressed', String(v));
        toggle.textContent = v ? 'Cursors on' : 'Cursors off';
        root.classList.toggle('no-cursors', !v);
    }
    toggle.addEventListener('click', function () { setOn(!on); });
    setOn(on);


    /* Intro: the hero starts as a wireframe of blue frames, then renders
       -------------------------------------------------- */
    function intro() {
        if (Kit.reduced) { root.classList.add('is-built'); return; }
        root.classList.add('is-wire');
        const frames = Array.from(document.querySelectorAll('[data-frame]'));
        frames.forEach(function (el, i) {
            setTimeout(function () { select(el, el.dataset.frame, { life: 1900 - i * 110, fill: true }); }, 150 + i * 110);
        });
        setTimeout(function () {
            root.classList.remove('is-wire');
            root.classList.add('is-built');
        }, 1250);
    }


    /* Scroll: each heading and card is selected as it arrives, then committed
       -------------------------------------------------- */
    function reveals() {
        const items = document.querySelectorAll('[data-select]');
        if (Kit.reduced || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-in'); });
            return;
        }
        const io = new IntersectionObserver(function (entries) {
            entries.filter(function (en) { return en.isIntersecting; }).forEach(function (en, i) {
                const el = en.target;
                io.unobserve(el);
                setTimeout(function () {
                    select(el, el.dataset.select, { life: 1100, fill: true });
                    setTimeout(function () { el.classList.add('is-in'); }, 260);
                    if (el.matches('.record__big .display')) countUp();
                }, i * 140);
            });
        }, { rootMargin: '0px 0px -15% 0px' });
        items.forEach(function (el) { io.observe(el); });
    }

    function countUp() {
        const n = document.querySelector('[data-count]');
        if (!n || Kit.reduced) return;
        const start = performance.now();
        (function step(now) {
            const t = Math.min(1, (now - start) / 900);
            n.textContent = Math.max(1, Math.round(5 * (1 - Math.pow(1 - t, 3)))) + 'x';
            if (t < 1) requestAnimationFrame(step);
        })(start);
    }

    /* The red rule down the left edge fills as you read */
    Kit.onScroll(function (p) { root.style.setProperty('--read', p.toFixed(4)); });

    const go = function () { intro(); reveals(); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(go, 120); });
    else setTimeout(go, 120);

    Kit.switcher('live');
})();
