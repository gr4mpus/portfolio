/* Isometric: a career drawn as a small city */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    /* Isometric projection: x runs down-right, y runs down-left, z runs up */
    const C = Math.cos(Math.PI / 6), S = Math.sin(Math.PI / 6);
    const iso = function (x, y, z) { return [(x - y) * C, (x + y) * S - z]; };
    const pts = function (list) { return list.map(function (p) { const q = iso(p[0], p[1], p[2]); return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '); };

    /* A box at (x, y) of footprint w by d and height h; three shaded faces */
    function box(x, y, w, d, h, tone, cls, extra) {
        return `<g class="box ${cls || ''}" style="--h:${h}">
            <polygon class="f-left ${tone}" points="${pts([[x, y + d, 0], [x + w, y + d, 0], [x + w, y + d, h], [x, y + d, h]])}"/>
            <polygon class="f-right ${tone}" points="${pts([[x + w, y, 0], [x + w, y + d, 0], [x + w, y + d, h], [x + w, y, h]])}"/>
            <polygon class="f-top ${tone}" points="${pts([[x, y, h], [x + w, y, h], [x + w, y + d, h], [x, y + d, h]])}"/>
            ${extra || ''}
        </g>`;
    }

    /* Window rows on a tower's left face */
    function windows(x, y, w, d, h) {
        let out = '';
        for (let z = 14; z < h - 8; z += 14) {
            for (let i = 6; i < w - 4; i += 10) {
                out += `<polygon class="win" style="--z:${z}" points="${pts([[x + i, y + d, z], [x + i + 5, y + d, z], [x + i + 5, y + d, z + 7], [x + i, y + d, z + 7]])}"/>`;
            }
        }
        return out;
    }

    /* Floor tiles */
    let tiles = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            tiles += `<polygon class="tile ${(i + j) % 2 ? 'tile--b' : ''}" points="${pts([[i * 30, j * 30, 0], [i * 30 + 30, j * 30, 0], [i * 30 + 30, j * 30 + 30, 0], [i * 30, j * 30 + 30, 0]])}"/>`;
        }
    }

    /* Towers: one per job, taller for the current role; small blocks for projects */
    const towers = [
        { x: 150, y: 40, w: 50, d: 50, h: 190, tone: 't-blue', label: P.jobs[0].company, sub: P.jobs[0].start + ' to now' },
        { x: 70, y: 110, w: 50, d: 50, h: 140, tone: 't-violet', label: P.jobs[1].company, sub: P.jobs[1].start + ' to ' + P.jobs[1].end },
        { x: 170, y: 170, w: 44, d: 44, h: 90, tone: 't-teal', label: 'TCS', sub: P.jobs[2].start + ' to ' + P.jobs[2].end }
    ];

    const blocks = [[30, 30, 'b-coral'], [30, 200, 'b-amber'], [220, 110, 'b-coral'], [100, 220, 'b-amber']];

    // Draw back to front: larger x + y is nearer the viewer
    const items = towers.map(function (t, i) {
        return { depth: t.x + t.y, svg: box(t.x, t.y, t.w, t.d, t.h, t.tone, 'tower tower--' + (i + 1), windows(t.x, t.y, t.w, t.d, t.h)) };
    }).concat(blocks.map(function (b, i) {
        return { depth: b[0] + b[1], svg: box(b[0], b[1], 26, 26, 22 + (i % 2) * 14, b[2], 'block block--' + (i + 1)) };
    })).sort(function (a, b) { return a.depth - b.depth; });

    /* Billboard with the portrait on the front tower's top: an image sheared onto the left plane */
    const bx = 150, by = 40, bz = 190;
    const origin = iso(bx + 3, by + 48, bz + 118);
    const billboard = `
        <g class="board">
            ${box(bx + 20, by + 22, 4, 4, 12, 't-pole', 'pole')}
            <polygon class="board__frame" points="${pts([[bx - 6, by + 48, bz + 12], [bx + 56, by + 48, bz + 12], [bx + 56, by + 48, bz + 122], [bx - 6, by + 48, bz + 122]])}"/>
            <image href="${e(P.photo)}" width="56" height="106" preserveAspectRatio="xMidYMid slice"
                transform="matrix(${C.toFixed(4)} ${S.toFixed(4)} 0 1 ${origin[0].toFixed(1)} ${origin[1].toFixed(1)})"/>
        </g>`;

    const labels = towers.map(function (t, i) {
        // labels sit beside each roof: right of the front tower, left of the others
        const left = i !== 0;
        const wdt = Math.max(80, t.label.length * 6.2 + 16);
        const p = iso(left ? t.x : t.x + t.w, left ? t.y + t.d : t.y, t.h - 6);
        const ox = left ? p[0] - 22 - wdt : p[0] + 18;
        return `<g class="pin pin--${i + 1}" transform="translate(${ox.toFixed(1)} ${(p[1] - 8).toFixed(1)})">
            <line x1="${left ? wdt : 0}" y1="0" x2="${left ? wdt + 18 : -18}" y2="8"/>
            <rect x="0" y="-15" width="${wdt}" height="30" rx="4"/>
            <text x="8" y="-3">${e(t.label)}</text>
            <text x="8" y="9" class="pin__sub">${e(t.sub)}</text>
        </g>`;
    }).join('');

    const scene = `
    <svg class="city" viewBox="-300 -330 620 520" role="img" aria-label="An isometric city: three towers for three employers, the tallest for Kaiser Permanente, with Rahul's photo on a billboard on top">
        <g class="floor">${tiles}</g>
        ${items.map(function (i) { return i.svg; }).join('')}
        ${billboard}
        ${labels}
        <g class="cube" aria-hidden="true">${box(0, 0, 12, 12, 12, 't-amber', 'packet')}</g>
    </svg>`;

    const slab = function (cls, inner, attrs) {
        return `<div class="slab ${cls}" ${attrs || ''}>${inner}</div>`;
    };

    app.innerHTML = `
    <header class="bar">
        <a class="bar__name" href="#top"><span class="logo" aria-hidden="true"></span>${e(P.name)}</a>
        <nav aria-label="Sections">
            <a href="#work">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <div class="hero__text">
                <p class="hero__role" data-load>${e(P.role)} / ${e(P.location)}</p>
                <h1 id="hero-name" class="hero__name" data-load>${e(P.first)}<br>${e(P.last)}</h1>
                <p class="hero__lede" data-load>${e(P.lede)}</p>
                <div class="hero__actions" data-load>
                    <a class="key key--blue" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="key" href="mailto:${e(P.email)}">Email me</a>
                </div>
            </div>
            <div class="hero__scene">${scene}</div>
            <dl class="facts">
                ${P.facts.map((f, i) => slab('fact fact--' + (i + 1), `<dt>${e(f.label)}</dt><dd>${e(f.value)}</dd>`, 'data-load')).join('')}
            </dl>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <h2 id="work-title" class="title" data-reveal>Experience</h2>
            ${P.jobs.map((j, ji) => `
            <article class="job job--${ji + 1}">
                ${slab('job__head', `
                    <p class="job__floor">Level ${3 - ji} / ${e(j.when)} / ${e(j.place)}</p>
                    <h3>${e(j.company)}</h3>
                    <p class="job__role">${e(j.role)}</p>
                    <p class="job__context">${e(j.context)}</p>`, 'data-reveal')}
                <ul class="wins">
                    ${j.wins.map(w => `<li>${slab('win', `
                        <h4>${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="win__result">${e(w.result)}</p>`, 'data-reveal')}</li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="title" data-reveal>Projects</h2>
            <div class="projects">
                ${P.projects.map((p, i) => slab('project project--' + (i + 1), `
                    <h3>${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="project__result">${e(p.result)}</p>
                    <ul class="bricks" aria-label="Built with">${p.tags.map(t => `<li>${e(t)}</li>`).join('')}</ul>
                    <a class="key key--small" href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>`, 'data-reveal')).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="title" data-reveal>Skills</h2>
            <div class="skills">
                ${P.skills.map(g => slab('skillset', `
                    <h3>${e(g.group)}</h3>
                    <ul class="bricks">${g.items.map(s => `<li>${e(s)}</li>`).join('')}</ul>`, 'data-reveal')).join('')}
                ${slab('skillset', `<h3>Education</h3><p>${e(P.education.degree)}<br>${e(P.education.school)}<br>${e(P.education.years)}</p>`, 'data-reveal')}
            </div>
        </section>

        <section id="contact" class="section contact" aria-labelledby="contact-title">
            ${slab('contact__slab', `
                <h2 id="contact-title" class="contact__line">${e(P.contactLine)}</h2>
                <a class="contact__email" href="mailto:${e(P.email)}">${e(P.email)}</a>
                <ul class="contact__links">
                    <li><a class="key key--small" href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                    ${P.social.map(s => `<li><a class="key key--small" href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
                </ul>`, 'data-reveal')}
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
        <a href="#top">Back to top</a>
    </footer>`;

    /* A data packet travels a loop around the towers; scrolling pushes it along */
    const cube = document.querySelector('.cube');
    const route = [[10, 10], [250, 10], [250, 250], [10, 250]];
    let travel = 0, push = 0, lastY = scrollY;

    function at(t) {
        const n = route.length, f = ((t % n) + n) % n, i = Math.floor(f), k = f - i;
        const a = route[i], b = route[(i + 1) % n];
        return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    }

    function move() {
        push *= .9;
        travel += .0025 + push;
        const p = at(travel), q = iso(p[0], p[1], 0);
        cube.setAttribute('transform', 'translate(' + q[0].toFixed(1) + ' ' + q[1].toFixed(1) + ')');
        requestAnimationFrame(move);
    }

    if (!Kit.reduced) {
        requestAnimationFrame(move);
        window.addEventListener('scroll', function () {
            push = Math.min(.03, push + Math.abs(scrollY - lastY) * .00008);
            lastY = scrollY;
        }, { passive: true });
    } else {
        const q = iso(10, 10, 0);
        cube.setAttribute('transform', 'translate(' + q[0] + ' ' + q[1] + ')');
    }

    Kit.reveal({ stagger: 90 });
    Kit.loaded(100);
    Kit.switcher('isometric');
})();
