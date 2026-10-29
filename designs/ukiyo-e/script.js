/* Ukiyo-e: a woodblock print, with the portrait mounted as a hanging scroll */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    const defs = `
    <svg class="defs" width="0" height="0" aria-hidden="true">
        <defs>
            <pattern id="seigaiha" width="40" height="20" patternUnits="userSpaceOnUse">
                <g fill="none" stroke="currentColor" stroke-width="1.4">
                    <circle cx="20" cy="20" r="18"/><circle cx="20" cy="20" r="13"/><circle cx="20" cy="20" r="8"/>
                    <circle cx="0" cy="10" r="18"/><circle cx="0" cy="10" r="13"/><circle cx="0" cy="10" r="8"/>
                    <circle cx="40" cy="10" r="18"/><circle cx="40" cy="10" r="13"/><circle cx="40" cy="10" r="8"/>
                </g>
            </pattern>
            <linearGradient id="bokashi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#1c2945"/>
                <stop offset=".55" stop-color="#24497a"/>
                <stop offset="1" stop-color="#3f74a8"/>
            </linearGradient>
        </defs>
    </svg>`;

    /* Foam claws along the crest of the great wave */
    const claws = function (cx, cy, r, from, to, n) {
        return Array.from({ length: n }, (_, i) => {
            const a = from + (to - from) * i / (n - 1);
            const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
            const s = 7 + (i % 3) * 3;
            return `<path class="claw" style="--i:${i}" d="M${x.toFixed(1)} ${y.toFixed(1)} q ${(-s * .6).toFixed(1)} ${(-s).toFixed(1)} ${(s * .3).toFixed(1)} ${(-s * 1.4).toFixed(1)} q ${(s * .2).toFixed(1)} ${(s * .7).toFixed(1)} ${(s * .9).toFixed(1)} ${(s * .5).toFixed(1)} q ${(-s * .3).toFixed(1)} ${(s * .5).toFixed(1)} ${(-s * 1.2).toFixed(1)} ${(s * .9).toFixed(1)} z"/>`;
        }).join('');
    };

    /* Gold mist bands (suyari-gasumi): long rounded bars, stacked and offset */
    const mist = function (cls, widths) {
        return `<div class="mist ${cls}" aria-hidden="true">${widths.map((w, i) => `<span style="--w:${w}%;--x:${(i * 17) % 30}%"></span>`).join('')}</div>`;
    };

    /* A skein of cranes in a loose V */
    const crane = function (x, y, s, d) {
        return `<g class="crane" transform="translate(${x} ${y}) scale(${s})" style="--d:${d}s">
            <path class="crane__wing" d="M0 0 C -14 -10, -30 -12, -46 -6 C -30 -4, -16 0, -4 6 Z"/>
            <path class="crane__wing crane__wing--far" d="M0 0 C 10 -14, 26 -22, 40 -24 C 28 -14, 14 -4, 4 6 Z"/>
            <path d="M-4 6 C 6 4, 20 2, 34 6 C 22 8, 8 10, -4 6 Z" fill="#f6efe0"/>
            <circle cx="35" cy="5.6" r="2.2" fill="#c8442a"/>
        </g>`;
    };

    const print = `
    <div class="print" aria-hidden="true">
        <div class="layer layer--sky" style="--b:0"></div>
        <div class="layer layer--sun" style="--b:1"></div>
        ${mist('layer mist--high', [46, 30, 38])}
        <svg class="layer layer--fuji" style="--b:2" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMax slice"><g transform="translate(-250 0)">
            <path d="M560 500 L790 236 C 800 226, 812 226, 822 236 L1060 500 Z" fill="#2a3c5f"/>
            <path d="M762 268 L790 236 C 800 226, 812 226, 822 236 L852 270 L832 262 L818 276 L804 260 L790 278 L778 262 Z" fill="#f6efe0"/>
        </g></svg>
        <svg class="layer layer--cranes" style="--b:3" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            <g class="flock">
                ${crane(0, 0, 1, 0)}${crane(-60, 26, .8, .25)}${crane(-110, 50, .7, .5)}${crane(-56, -30, .75, .15)}${crane(-100, -56, .62, .4)}
            </g>
        </svg>
        <svg class="layer layer--wave" style="--b:4" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMax slice">
            <path class="sea sea--far" d="M0 420 C 150 400, 260 410, 380 396 S 640 372, 760 392 S 1040 410, 1200 384 L1200 500 L0 500 Z"/>
            <g class="great">
                <path class="great__body" d="M0 500 L0 300 C 70 270, 150 270, 230 250 C 310 228, 340 150, 420 118 C 510 84, 600 118, 626 178 C 638 210, 612 238, 580 230 C 548 222, 566 184, 530 172 C 478 160, 458 230, 478 290 C 508 370, 610 410, 720 440 L1200 470 L1200 500 Z"/>
                <path class="great__pattern" d="M0 500 L0 300 C 70 270, 150 270, 230 250 C 310 228, 340 150, 420 118 C 510 84, 600 118, 626 178 C 638 210, 612 238, 580 230 C 548 222, 566 184, 530 172 C 478 160, 458 230, 478 290 C 508 370, 610 410, 720 440 L1200 470 L1200 500 Z"/>
                <path class="great__lip" d="M392 132 C 466 92, 576 98, 616 160 C 628 186, 614 210, 594 214"/>
                <g class="foam">${claws(500, 200, 118, -2.45, -.32, 16)}</g>
            </g>
            <path class="sea sea--near" d="M0 470 C 90 446, 170 454, 240 444 C 300 436, 330 408, 372 412 C 414 416, 404 450, 374 452 L392 462 C 500 476, 640 452, 760 470 S 1000 486, 1200 474 L1200 500 L0 500 Z"/>
        </svg>
        ${mist('layer mist--low', [52, 34])}
    </div>`;

    const hanko = function (text, cls) { return `<span class="hanko ${cls || ''}" aria-hidden="true">${e(text)}</span>`; };

    app.innerHTML = `
    ${defs}
    <header class="bar">
        <a class="bar__name" href="#top">${hanko('RP', 'hanko--small')}${e(P.name)}</a>
        <nav aria-label="Sections">
            <a href="#work">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            ${print}

            <div class="hero__inner">
                <div class="hero__copy">
                    <div class="cartouche" data-load>
                        <h1 id="hero-name">${e(P.name)}</h1>
                        <p>${e(P.role)}</p>
                    </div>
                    <div class="hero__words">
                        <p class="hero__lede" data-load>${e(P.lede)}</p>
                        <div class="hero__actions" data-load>
                            <a class="btn btn--red" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                            <a class="btn" href="mailto:${e(P.email)}">Email me</a>
                        </div>
                    </div>
                </div>

                <figure class="kakejiku">
                    <span class="kakejiku__cord" aria-hidden="true"></span>
                    <span class="kakejiku__roller kakejiku__roller--top" aria-hidden="true"></span>
                    <div class="kakejiku__body">
                        <div class="kakejiku__clip">
                            <div class="kakejiku__mount">
                                <div class="kakejiku__photo">
                                    <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                                </div>
                                ${hanko('RP', 'hanko--photo')}
                            </div>
                        </div>
                    </div>
                    <span class="kakejiku__roller kakejiku__roller--bottom" aria-hidden="true"></span>
                    <figcaption>${e(P.location)}, at dusk</figcaption>
                </figure>
            </div>
        </section>

        <dl class="facts">
            ${P.facts.map((f, i) => `<div data-reveal><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
        </dl>

        <section id="work" class="section" aria-labelledby="work-title">
            ${mist('mist--drift', [40, 26])}
            <h2 id="work-title" class="title" data-reveal><span>Experience</span></h2>
            ${P.jobs.map((j, ji) => `
            <article class="scroll" data-reveal>
                <header class="scroll__head">
                    <div class="scroll__label">
                        <h3>${e(j.company)}</h3>
                        <p>${e(j.role)}</p>
                    </div>
                    <p class="scroll__when">${e(j.when)}<br>${e(j.place)}</p>
                    ${hanko(String(ji + 1), 'hanko--num')}
                </header>
                <p class="scroll__context">${e(j.context)}</p>
                <ul class="wins">
                    ${j.wins.map(w => `
                    <li>
                        <h4>${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="wins__result">${e(w.result)}</p>
                    </li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            ${mist('mist--drift mist--right', [36, 48])}
            <h2 id="projects-title" class="title" data-reveal><span>Projects</span></h2>
            <div class="projects">
                ${P.projects.map((p, i) => `
                <article class="panel panel--${i + 1}" data-reveal>
                    <h3>${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="panel__result">${e(p.result)}</p>
                    <p class="panel__tags">${p.tags.map(e).join('　')}</p>
                    <a href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="title" data-reveal><span>Skills</span></h2>
            <div class="skills" data-reveal>
                ${P.skills.map(g => `
                <div class="skillset">
                    <h3>${e(g.group)}</h3>
                    <ul>${g.items.map(s => `<li>${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="skillset">
                    <h3>Education</h3>
                    <p>${e(P.education.degree)}<br>${e(P.education.school)}<br>${e(P.education.years)}</p>
                </div>
            </div>
        </section>

        <section id="contact" class="contact" aria-labelledby="contact-title">
            <svg class="contact__sea" aria-hidden="true"><rect width="100%" height="100%" fill="url(#seigaiha)"/></svg>
            <div class="contact__inner" data-reveal>
                <h2 id="contact-title" class="contact__line">${e(P.contactLine)}</h2>
                <a class="contact__email" href="mailto:${e(P.email)}">${e(P.email)}</a>
                <ul class="contact__links">
                    <li><a href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                    ${P.social.map(s => `<li><a href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
                </ul>
                ${hanko('RP', 'hanko--sign')}
            </div>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
        <a href="#top">Back to top</a>
    </footer>`;


    /* Scroll: the wave surges, mist drifts, and the scroll sways in the breeze */
    const root = document.documentElement;
    const scrollEl = document.querySelector('.kakejiku');
    let sway = 0, vel = 0, lastY = scrollY, running = false;

    function settle() {
        vel += -sway * .04;
        vel *= .92;
        sway += vel;
        scrollEl.style.setProperty('--sway', sway.toFixed(3) + 'deg');
        if (Math.abs(sway) > .005 || Math.abs(vel) > .005) requestAnimationFrame(settle);
        else running = false;
    }

    Kit.onScroll(function (_, y) {
        root.style.setProperty('--surge', Math.min(1, y / 700).toFixed(3));
        root.style.setProperty('--drift', y.toFixed(0));
        if (Kit.reduced) return;
        const dy = y - lastY;
        lastY = y;
        vel += Math.max(-.6, Math.min(.6, dy * .02));
        if (!running) { running = true; requestAnimationFrame(settle); }
    });

    Kit.reveal({
        stagger: 120,
        onReveal: function (el) {
            el.querySelectorAll('.hanko').forEach(function (h) { h.classList.add('is-stamped'); });
        }
    });
    Kit.loaded(100);
    Kit.switcher('ukiyo-e');
})();
