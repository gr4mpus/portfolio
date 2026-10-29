/* Brutalism: cast in concrete */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    const levels = [
        { id: 'top', label: 'Ground', elev: '+0.00' },
        { id: 'work', label: 'Level 1', elev: '+4.20' },
        { id: 'projects', label: 'Level 2', elev: '+8.40' },
        { id: 'skills', label: 'Level 3', elev: '+12.60' },
        { id: 'contact', label: 'Roof', elev: '+16.80' }
    ];

    app.innerHTML = `
    <aside class="elevation" aria-hidden="true">
        <span class="elevation__line"><span class="elevation__fill"></span></span>
        ${levels.map((l, i) => `<span class="elevation__mark" style="--i:${i}"><b>${l.elev}</b>${l.label}</span>`).join('')}
    </aside>

    <header class="bar">
        <a class="bar__name" href="#top">${e(P.name.toUpperCase())}</a>
        <nav aria-label="Sections">
            <a href="#work"><small>L1</small> Experience</a>
            <a href="#projects"><small>L2</small> Projects</a>
            <a href="#skills"><small>L3</small> Skills</a>
            <a href="#contact"><small>R</small> Contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="facade" aria-labelledby="hero-name">
            <div class="facade__wall concrete" data-pour>
                <p class="spec">Section A-A / Scale 1:1 / ${e(P.location)}</p>
                <h1 id="hero-name" class="cast">${e(P.first)}<br>${e(P.last)}</h1>
                <p class="facade__role">${e(P.role)}</p>
            </div>

            <figure class="recess concrete" data-pour>
                <div class="recess__hole"><img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000"></div>
                <figcaption class="spec">Fig. 01 / Occupant, west elevation</figcaption>
            </figure>

            <div class="facade__lede concrete concrete--light" data-pour>
                <p>${e(P.lede)}</p>
                <div class="facade__actions">
                    <a class="plate plate--dark" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="plate" href="mailto:${e(P.email)}">Email me</a>
                </div>
            </div>

            <dl class="columns">
                ${P.facts.map((f, i) => `<div class="column concrete" style="--h:${[.55, .8, 1][i]}" data-pour><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
            </dl>
        </section>

        <section id="work" class="floor" aria-labelledby="work-title">
            <header class="floor__head" data-reveal>
                <p class="spec">Level 1 / +4.20</p>
                <h2 id="work-title" class="stencil">Experience</h2>
            </header>
            ${P.jobs.map((j, ji) => `
            <article class="unit" data-reveal>
                <header class="unit__head concrete">
                    <p class="unit__no">${String(ji + 1).padStart(2, '0')}</p>
                    <div>
                        <h3 class="stencil">${e(j.company)}</h3>
                        <p class="unit__role">${e(j.role)}</p>
                    </div>
                    <p class="spec unit__when">${e(j.when)}<br>${e(j.place)}</p>
                </header>
                <p class="unit__context">${e(j.context)}</p>
                <ul class="bays">
                    ${j.wins.map((w, i) => `
                    <li class="bay">
                        <p class="spec">Bay ${ji + 1}.${i + 1}</p>
                        <h4>${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="bay__result">${e(w.result)}</p>
                    </li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        <section id="projects" class="floor" aria-labelledby="projects-title">
            <header class="floor__head" data-reveal>
                <p class="spec">Level 2 / +8.40</p>
                <h2 id="projects-title" class="stencil">Projects</h2>
            </header>
            <div class="blocks">
                ${P.projects.map((p, i) => `
                <article class="block concrete concrete--${['light', 'mid', 'mid', 'light'][i]}" data-reveal>
                    <p class="spec">Block ${String.fromCharCode(65 + i)}</p>
                    <h3 class="stencil">${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="block__result">${e(p.result)}</p>
                    <p class="spec">${p.tags.map(e).join(' / ')}</p>
                    <a class="plate plate--small" href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="floor" aria-labelledby="skills-title">
            <header class="floor__head" data-reveal>
                <p class="spec">Level 3 / +12.60</p>
                <h2 id="skills-title" class="stencil">Skills</h2>
            </header>
            <table class="schedule" data-reveal>
                <caption class="spec">Schedule of materials</caption>
                <tbody>
                    ${P.skills.map(g => `<tr><th scope="row">${e(g.group)}</th><td>${g.items.map(e).join(', ')}</td></tr>`).join('')}
                    <tr><th scope="row">Education</th><td>${e(P.education.degree)}, ${e(P.education.school)}, ${e(P.education.years)}</td></tr>
                </tbody>
            </table>
        </section>

        <section id="contact" class="roof concrete" aria-labelledby="contact-title" data-reveal>
            <p class="spec">Roof / +16.80</p>
            <h2 id="contact-title" class="roof__line">${e(P.contactLine)}</h2>
            <a class="roof__email stencil" href="mailto:${e(P.email)}">${e(P.email)}</a>
            <ul class="roof__links">
                <li><a class="plate plate--small" href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                ${P.social.map(s => `<li><a class="plate plate--small" href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
            </ul>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}. Built to last.</p>
        <a href="#top">Back to top</a>
    </footer>`;

    /* The elevation gauge fills as you climb, and marks the floor you are on */
    const marks = Array.from(document.querySelectorAll('.elevation__mark'));
    const floors = levels.map(function (l) { return document.getElementById(l.id); });
    Kit.onScroll(function (progress) {
        document.documentElement.style.setProperty('--climb', progress.toFixed(3));
        let current = 0;
        floors.forEach(function (f, i) { if (f && f.getBoundingClientRect().top < innerHeight * .5) current = i; });
        marks.forEach(function (m, i) { m.classList.toggle('is-here', i === current); });
    });

    Kit.reveal({ stagger: 120 });
    Kit.loaded(100);
    Kit.switcher('brutalism');
})();
