/* Art Nouveau: a Mucha poster */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    // A symmetric whiplash flourish used between sections
    const divider = `
    <svg class="divider" viewBox="0 0 640 60" aria-hidden="true" data-progress>
        <g class="draw" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <path pathLength="1" d="M318 30 C 270 30, 260 8, 220 10 S 160 44, 120 30 S 60 14, 6 30"/>
            <path pathLength="1" d="M322 30 C 370 30, 380 8, 420 10 S 480 44, 520 30 S 580 14, 634 30"/>
            <path pathLength="1" d="M300 30 C 290 44, 270 46, 262 40 M340 30 C 350 44, 370 46, 378 40"/>
            <path pathLength="1" d="M220 10 C 228 2, 240 4, 238 12 M420 10 C 412 2, 400 4, 402 12"/>
        </g>
        <g class="bloom">
            <circle cx="320" cy="30" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <circle cx="320" cy="30" r="3.5" fill="currentColor"/>
            <path d="M320 12 C 326 20, 326 24, 320 21 C 314 24, 314 20, 320 12 Z M320 48 C 326 40, 326 36, 320 39 C 314 36, 314 40, 320 48 Z" fill="currentColor"/>
        </g>
    </svg>`;

    // Whiplash vines that climb the arch, with leaves and buds
    const vine = `
    <g class="vine" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
        <path pathLength="1" d="M60 760 C 30 640, 120 600, 70 500 S -10 330, 90 250 S 170 120, 120 60 C 100 34, 70 40, 76 62"/>
        <path pathLength="1" d="M40 760 C 10 680, 60 640, 34 560 S 20 420, 52 380"/>
        <path pathLength="1" d="M70 500 C 110 470, 150 480, 160 450 M90 250 C 130 250, 150 230, 152 205 M70 640 C 100 620, 130 630, 140 600"/>
    </g>
    <g class="buds">
        <path d="M160 450 c 8 -18 26 -18 24 0 c -2 14 -18 14 -24 0 z"/>
        <path d="M152 205 c 4 -18 22 -22 24 -6 c 0 14 -16 16 -24 6 z"/>
        <path d="M140 600 c 6 -16 24 -16 22 0 c -2 12 -16 12 -22 0 z"/>
        <circle cx="76" cy="62" r="7"/>
        <circle cx="52" cy="380" r="5"/>
    </g>`;

    app.innerHTML = `
    <div class="poster-frame" aria-hidden="true"></div>

    <header class="bar">
        <a class="bar__mono" href="#top" aria-label="${e(P.name)}, back to top">${e(P.initials)}</a>
        <nav aria-label="Sections">
            <a href="#work">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <div class="poster" data-load>
                <div class="halo" aria-hidden="true"></div>
                <svg class="vines vines--l" viewBox="0 0 200 780" aria-hidden="true">${vine}</svg>
                <svg class="vines vines--r" viewBox="0 0 200 780" aria-hidden="true">${vine}</svg>
                <figure class="arch">
                    <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                </figure>
                <p class="arch__plate">${e(P.location)}</p>
            </div>

            <div class="hero__words">
                <p class="hero__role" data-load>${e(P.role)}</p>
                <h1 id="hero-name" class="hero__name" data-load><span>${e(P.first)}</span><span>${e(P.last)}</span></h1>
                <p class="hero__lede" data-load>${e(P.lede)}</p>
                <div class="hero__actions" data-load>
                    <a class="btn btn--gold" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="btn" href="mailto:${e(P.email)}">Email me</a>
                </div>
                <dl class="medallions" data-load>
                    ${P.facts.map(f => `<div class="medallion"><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
                </dl>
            </div>
        </section>

        ${divider}

        <section id="work" class="section" aria-labelledby="work-title">
            <h2 id="work-title" class="title" data-reveal>Experience</h2>
            ${P.jobs.map(j => `
            <article class="job">
                <div class="opener" data-reveal><header class="cartouche">
                    <p class="cartouche__years">${e(j.start)} to ${e(j.end)}</p>
                    <h3>${e(j.company)}</h3>
                    <p class="cartouche__role">${e(j.role)}, ${e(j.place)}</p>
                </header></div>
                <p class="job__context" data-reveal>${e(j.context)}</p>
                <ul class="wins">
                    ${j.wins.map(w => `
                    <li class="win" data-reveal>
                        <h4>${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="win__result">${e(w.result)}</p>
                    </li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        ${divider}

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="title" data-reveal>Projects</h2>
            <div class="windows">
                ${P.projects.map((p, i) => `
                <div class="opener" data-reveal><article class="window window--${i + 1}">
                    <div class="window__glass" aria-hidden="true"><span>${e(p.name.charAt(0))}</span></div>
                    <div class="window__body">
                        <h3>${e(p.name)}</h3>
                        <p>${e(p.summary)}</p>
                        <p class="window__result">${e(p.result)}</p>
                        <p class="window__tags">${p.tags.map(t => e(t)).join('<span aria-hidden="true"> ❧ </span>')}</p>
                        <a href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                    </div>
                </article></div>`).join('')}
            </div>
        </section>

        ${divider}

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="title" data-reveal>Skills</h2>
            <dl class="garland">
                ${P.skills.map(g => `
                <div class="garland__row" data-reveal>
                    <dt>${e(g.group)}</dt>
                    <dd>${g.items.map(s => `<span class="leaf">${e(s)}</span>`).join(' <span class="sep" aria-hidden="true">❦</span> ')}</dd>
                </div>`).join('')}
                <div class="garland__row" data-reveal>
                    <dt>Education</dt>
                    <dd><span class="leaf">${e(P.education.degree)}</span><span class="sep" aria-hidden="true">❦</span> <span class="leaf">${e(P.education.school)}, ${e(P.education.years)}</span></dd>
                </div>
            </dl>
        </section>

        <section id="contact" class="contact" aria-labelledby="contact-title">
            <div class="contact__halo" aria-hidden="true"></div>
            <h2 id="contact-title" class="contact__line" data-reveal>${e(P.contactLine)}</h2>
            <a class="contact__email" href="mailto:${e(P.email)}" data-reveal>${e(P.email)}</a>
            <ul class="contact__links" data-reveal>
                <li><a href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                ${P.social.map(s => `<li><a href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
            </ul>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
        <a href="#top">Back to top</a>
    </footer>`;

    Kit.reveal({ stagger: 110 });
    Kit.onScroll();
    Kit.loaded(120);
    Kit.switcher('art-nouveau');
})();
