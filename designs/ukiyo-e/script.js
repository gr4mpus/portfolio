/* Ukiyo-e: a woodblock print */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    /* Woodblock filter: posterise the photo into a few flat ink tones */
    const defs = `
    <svg class="defs" width="0" height="0" aria-hidden="true">
        <defs>
            <filter id="woodblock" color-interpolation-filters="sRGB">
                <feComponentTransfer>
                    <feFuncR type="discrete" tableValues="0.11 0.36 0.78 0.94"/>
                    <feFuncG type="discrete" tableValues="0.16 0.33 0.62 0.89"/>
                    <feFuncB type="discrete" tableValues="0.27 0.36 0.45 0.80"/>
                </feComponentTransfer>
            </filter>
            <pattern id="seigaiha" width="40" height="20" patternUnits="userSpaceOnUse">
                <g fill="none" stroke="#efe4cc" stroke-width="1.4">
                    <circle cx="20" cy="20" r="18"/><circle cx="20" cy="20" r="13"/><circle cx="20" cy="20" r="8"/>
                    <circle cx="0" cy="10" r="18"/><circle cx="0" cy="10" r="13"/><circle cx="0" cy="10" r="8"/>
                    <circle cx="40" cy="10" r="18"/><circle cx="40" cy="10" r="13"/><circle cx="40" cy="10" r="8"/>
                </g>
            </pattern>
        </defs>
    </svg>`;

    /* The great wave: a rising body with a curling crest and claw-like foam */
    const claws = Array.from({ length: 14 }, (_, i) => {
        const a = -2.3 + i * .16, r = 150 + (i % 3) * 8;
        const x = 420 + Math.cos(a) * r, y = 250 + Math.sin(a) * r;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(9 - (i % 4)).toFixed(0)}"/>`;
    }).join('');

    const wave = `
    <svg class="wave" viewBox="0 0 900 520" aria-hidden="true">
        <path class="wave__far" d="M0 420 C 120 380, 220 400, 300 380 S 460 330, 560 370 S 760 400, 900 360 L900 520 L0 520 Z"/>
        <g class="wave__fuji">
            <path d="M600 380 L700 250 L800 380 Z" fill="#2a3c5f"/>
            <path d="M680 276 L700 250 L720 276 L710 282 L700 272 L690 284 Z" fill="#f6efe0"/>
        </g>
        <g class="wave__big">
            <path class="wave__body" d="M0 520 L0 300 C 60 260, 140 250, 220 230 C 300 210, 340 130, 420 100 C 510 70, 600 110, 620 170 C 630 205, 600 230, 570 220 C 540 210, 560 170, 520 160 C 470 150, 450 220, 470 280 C 500 360, 600 400, 700 430 L900 470 L900 520 Z"/>
            <path class="wave__stripes" d="M0 520 L0 300 C 60 260, 140 250, 220 230 C 300 210, 340 130, 420 100 C 510 70, 600 110, 620 170 C 630 205, 600 230, 570 220 C 540 210, 560 170, 520 160 C 470 150, 450 220, 470 280 C 500 360, 600 400, 700 430 L900 470 L900 520 Z"/>
            <path class="wave__lip" d="M380 112 C 450 74, 560 80, 612 150 C 622 175, 610 200, 590 205"/>
            <g class="wave__foam">${claws}</g>
        </g>
        <path class="wave__near" d="M0 470 C 90 440, 160 450, 230 440 C 290 430, 320 400, 360 405 C 400 410, 390 445, 360 448 L380 460 C 460 470, 600 450, 700 470 S 860 490, 900 480 L900 520 L0 520 Z"/>
    </svg>`;

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
            <div class="print" data-load>
                <div class="sky" aria-hidden="true"></div>
                ${wave}
                <div class="cartouche-v" data-load>
                    <h1 id="hero-name">${e(P.name)}</h1>
                    <p>${e(P.role)}</p>
                </div>
                ${hanko('RP', 'hanko--seal')}
            </div>

            <div class="hero__side">
                <figure class="portrait" data-load>
                    <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                    <figcaption>${e(P.location)}</figcaption>
                </figure>
                <p class="hero__lede" data-load>${e(P.lede)}</p>
                <div class="hero__actions" data-load>
                    <a class="btn btn--red" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="btn" href="mailto:${e(P.email)}">Email me</a>
                </div>
            </div>

            <dl class="facts">
                ${P.facts.map(f => `<div data-load><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
            </dl>
        </section>

        <div class="band" aria-hidden="true"><svg width="100%" height="40"><rect width="100%" height="40" fill="url(#seigaiha)"/></svg></div>

        <section id="work" class="section" aria-labelledby="work-title">
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

        <div class="band" aria-hidden="true"><svg width="100%" height="40"><rect width="100%" height="40" fill="url(#seigaiha)"/></svg></div>

        <section id="projects" class="section" aria-labelledby="projects-title">
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
            <svg class="contact__sea" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><rect width="1200" height="120" fill="url(#seigaiha)"/></svg>
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

    /* The wave rises and leans with scroll; Fuji stays put */
    Kit.onScroll(function (_, y) {
        if (Kit.reduced) return;
        const t = Math.min(1, y / 600);
        document.documentElement.style.setProperty('--surge', t.toFixed(3));
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
