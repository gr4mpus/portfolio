/* Grunge: the zine */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    /* A seeded random source, so torn edges look the same on every visit */
    let seed = 7;
    function rnd() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    }

    /* Ransom-note letters: each one cut from a different "magazine" */
    const cuts = ['c-a', 'c-b', 'c-c', 'c-d', 'c-e', 'c-f'];
    function ransom(word) {
        return Array.from(word).map(function (ch) {
            if (ch === ' ') return '<span class="gap"> </span>';
            const c = cuts[Math.floor(rnd() * cuts.length)];
            const r = (rnd() * 12 - 6).toFixed(1);
            const y = (rnd() * 8 - 4).toFixed(1);
            return `<span class="cut ${c}" style="--r:${r}deg;--y:${y}px" aria-hidden="true">${e(ch)}</span>`;
        }).join('');
    }

    /* A hand-drawn marker loop to circle something */
    const loop = `<svg class="scribble" viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M20 50 C 30 10, 260 4, 286 38 C 300 66, 120 92, 40 74 C 4 66, 8 30, 70 18"/></svg>`;
    const under = `<svg class="underline" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M4 12 C 60 4, 120 18, 180 9 S 270 6, 296 12"/></svg>`;

    const tilt = function () { return (rnd() * 4 - 2).toFixed(2) + 'deg'; };

    app.innerHTML = `
    <header class="bar">
        <a class="bar__name" href="#top">${e(P.name)}</a>
        <nav aria-label="Sections">
            <a href="#work">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <figure class="xerox scrap" data-torn style="--tilt:-3deg" data-slap>
                <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                <span class="tape tape--a" aria-hidden="true"></span>
                <span class="tape tape--b" aria-hidden="true"></span>
                <figcaption class="marker">that's me, pune.</figcaption>
            </figure>

            <div class="hero__words">
                <h1 id="hero-name" class="stamp" data-slap>${e(P.first)}<br>${e(P.last)}</h1>
                <p class="hero__role" data-slap><span class="circled">${e(P.role)}${loop}</span> based in ${e(P.location)}</p>

                <div class="note scrap" data-torn style="--tilt:1.5deg" data-slap>
                    <span class="staple" aria-hidden="true"></span>
                    <p>${e(P.lede)}</p>
                </div>

                <div class="hero__actions" data-slap>
                    <a class="btn btn--tape" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="btn btn--marker" href="mailto:${e(P.email)}">Email me</a>
                </div>
            </div>

            <dl class="facts">
                ${P.facts.map(f => `<div class="fact scrap" data-torn style="--tilt:${tilt()}" data-slap><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
            </dl>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <h2 id="work-title" class="ransom" data-reveal><span class="visually-hidden">Experience</span>${ransom('EXPERIENCE')}</h2>
            ${P.jobs.map(j => `
            <article class="sheet scrap" data-torn style="--tilt:${tilt()}" data-reveal>
                <span class="staple staple--l" aria-hidden="true"></span>
                <span class="staple staple--r" aria-hidden="true"></span>
                <header class="sheet__head">
                    <h3>${e(j.company)}</h3>
                    <p class="sheet__role">${e(j.role)}</p>
                    <p class="sheet__when marker">${e(j.when)}, ${e(j.place)}</p>
                </header>
                <p class="sheet__context">${e(j.context)}</p>
                <ul class="wins">
                    ${j.wins.map(w => `
                    <li>
                        <h4>${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="wins__result"><span>${e(w.result)}</span>${under}</p>
                    </li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="ransom" data-reveal><span class="visually-hidden">Projects</span>${ransom('PROJECTS')}</h2>
            <div class="projects">
                ${P.projects.map((p, i) => `
                <article class="card scrap" data-torn style="--tilt:${tilt()}" data-reveal>
                    <span class="tape tape--${['a', 'b', 'c', 'a'][i]}" aria-hidden="true"></span>
                    <h3>${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="card__result marker">${e(p.result)}</p>
                    <p class="card__tags">${p.tags.map(e).join(' + ')}</p>
                    <a href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="ransom" data-reveal><span class="visually-hidden">Skills</span>${ransom('SKILLS')}</h2>
            <div class="skills">
                ${P.skills.map(g => `
                <div class="skillset" data-reveal>
                    <h3 class="marker">${e(g.group)}</h3>
                    <ul>${g.items.map(s => `<li class="mask" style="--tilt:${tilt()}">${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="skillset sheet scrap" data-torn style="--tilt:-1deg" data-reveal>
                    <h3 class="marker">Education</h3>
                    <p>${e(P.education.degree)}<br>${e(P.education.school)}<br>${e(P.education.years)}</p>
                </div>
            </div>
        </section>

        <section id="contact" class="section contact" aria-labelledby="contact-title">
            <div class="contact__sheet scrap" data-torn style="--tilt:-1deg" data-reveal>
                <span class="tape tape--a" aria-hidden="true"></span>
                <span class="tape tape--c" aria-hidden="true"></span>
                <h2 id="contact-title" class="contact__line">${e(P.contactLine)}</h2>
                <a class="contact__email marker" href="mailto:${e(P.email)}">${e(P.email)}</a>
                <ul class="contact__links">
                    <li><a href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                    ${P.social.map(s => `<li><a href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
                </ul>
            </div>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}. photocopied, stapled, handed out.</p>
        <a href="#top">Back to top</a>
    </footer>`;

    /* Tear every scrap: a jittered polygon along all four edges */
    document.querySelectorAll('[data-torn]').forEach(function (el) {
        const pts = [];
        const steps = 18;
        const j = function (n) { return (rnd() * n).toFixed(2); };
        for (let i = 0; i <= steps; i++) pts.push((i / steps * 100).toFixed(2) + '% ' + j(1.6) + '%');
        for (let i = 1; i <= steps; i++) pts.push((100 - rnd() * 1.4).toFixed(2) + '% ' + (i / steps * 100).toFixed(2) + '%');
        for (let i = steps - 1; i >= 0; i--) pts.push((i / steps * 100).toFixed(2) + '% ' + (100 - rnd() * 1.6).toFixed(2) + '%');
        for (let i = steps - 1; i >= 1; i--) pts.push(j(1.4) + '% ' + (i / steps * 100).toFixed(2) + '%');
        el.style.setProperty('--torn', 'polygon(' + pts.join(',') + ')');
    });

    Kit.reveal({ stagger: 130 });
    Kit.loaded(150);
    Kit.switcher('grunge');
})();
