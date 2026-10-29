/* Paper cutout: a pop-up book */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    /* Each hill is a wavy band; deeper layers are lighter and move less */
    const hills = [
        { c: '#9fd3cf', d: 'M0 210 C 160 140, 300 170, 420 150 S 700 90, 860 140 S 1180 170, 1440 120 L1440 400 L0 400 Z', s: .06 },
        { c: '#6fbab6', d: 'M0 250 C 140 200, 260 230, 400 210 S 640 160, 820 210 S 1120 260, 1440 190 L1440 400 L0 400 Z', s: .12 },
        { c: '#4fa3a5', d: 'M0 290 C 180 240, 330 290, 520 260 S 820 230, 1000 270 S 1260 300, 1440 250 L1440 400 L0 400 Z', s: .2 },
        { c: '#2e6f73', d: 'M0 330 C 200 300, 380 340, 600 320 S 900 300, 1100 330 S 1320 345, 1440 320 L1440 400 L0 400 Z', s: .3 },
        { c: '#fff8ec', d: 'M0 372 C 240 352, 420 382, 700 366 S 1100 352, 1440 372 L1440 400 L0 400 Z', s: .38 }
    ];

    const wave = function (fill) {
        return `<svg class="wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 C 180 0, 360 60, 540 30 S 900 0, 1080 30 S 1300 55, 1440 28 L1440 60 L0 60 Z" fill="${fill}"/></svg>`;
    };

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
            <div class="scene" aria-hidden="true">
                <span class="sun layer" data-depth=".05"></span>
                <span class="cloud cloud--1 layer" data-depth=".1"></span>
                <span class="cloud cloud--2 layer" data-depth=".16"></span>
                <span class="cloud cloud--3 layer" data-depth=".08"></span>
                ${hills.map((h, i) => `<svg class="hill layer" data-depth="${h.s}" style="--i:${i}" viewBox="0 0 1440 400" preserveAspectRatio="none"><path d="${h.d}" fill="${h.c}"/></svg>`).join('')}
            </div>

            <div class="hero__inner">
                <div class="card hero__card" data-pop>
                    <p class="hero__role">${e(P.role)} in ${e(P.location)}</p>
                    <h1 id="hero-name">${e(P.name)}</h1>
                    <p class="hero__lede">${e(P.lede)}</p>
                    <div class="hero__actions">
                        <a class="btn btn--coral" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                        <a class="btn" href="mailto:${e(P.email)}">Email me</a>
                    </div>
                </div>

                <figure class="frame" data-pop>
                    <span class="frame__layer frame__layer--1" aria-hidden="true"></span>
                    <span class="frame__layer frame__layer--2" aria-hidden="true"></span>
                    <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                </figure>
            </div>
        </section>

        <section class="facts-band">
            ${wave('#fff8ec')}
            <dl class="facts">
                ${P.facts.map((f, i) => `<div class="tag tag--${i + 1}" data-reveal><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
            </dl>
        </section>

        <section id="work" class="section section--cream" aria-labelledby="work-title">
            <h2 id="work-title" class="title" data-reveal>Experience</h2>
            ${P.jobs.map((j, ji) => `
            <article class="pocket pocket--${ji + 1}">
                <header class="pocket__tab" data-reveal>
                    <h3>${e(j.company)}</h3>
                    <p>${e(j.role)}, ${e(j.when)}, ${e(j.place)}</p>
                </header>
                <div class="pocket__body" data-reveal>
                    <p class="pocket__context">${e(j.context)}</p>
                    <ul class="notes">
                        ${j.wins.map(w => `
                        <li class="note" data-reveal>
                            <h4>${e(w.title)}</h4>
                            <p>${e(w.text)}</p>
                            <p class="note__result">${e(w.result)}</p>
                        </li>`).join('')}
                    </ul>
                </div>
            </article>`).join('')}
        </section>

        <section id="projects" class="section section--teal" aria-labelledby="projects-title">
            ${wave('#4fa3a5')}
            <h2 id="projects-title" class="title title--light" data-reveal>Projects</h2>
            <div class="projects">
                ${P.projects.map((p, i) => `
                <article class="popup popup--${i + 1}" data-reveal>
                    <div class="popup__card">
                        <h3>${e(p.name)}</h3>
                        <p>${e(p.summary)}</p>
                        <p class="popup__result">${e(p.result)}</p>
                        <ul class="chips" aria-label="Built with">${p.tags.map(t => `<li>${e(t)}</li>`).join('')}</ul>
                        <a class="btn btn--small" href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                    </div>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section section--sand" aria-labelledby="skills-title">
            ${wave('#f6d5a8')}
            <h2 id="skills-title" class="title" data-reveal>Skills</h2>
            <div class="skills">
                ${P.skills.map(g => `
                <div class="skillset" data-reveal>
                    <h3>${e(g.group)}</h3>
                    <ul class="tags">${g.items.map(s => `<li>${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="skillset skillset--edu" data-reveal>
                    <h3>Education</h3>
                    <p>${e(P.education.degree)}<br>${e(P.education.school)}<br>${e(P.education.years)}</p>
                </div>
            </div>
        </section>

        <section id="contact" class="contact" aria-labelledby="contact-title">
            <svg class="contact__hills" viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 120 C 200 40, 380 110, 560 70 S 900 20, 1100 80 S 1340 120, 1440 60 L1440 260 L0 260 Z" fill="#9fd3cf"/>
                <path d="M0 170 C 220 110, 420 170, 640 140 S 1000 110, 1200 150 S 1380 170, 1440 140 L1440 260 L0 260 Z" fill="#4fa3a5"/>
                <path d="M0 210 C 260 180, 520 230, 760 200 S 1160 180, 1440 210 L1440 260 L0 260 Z" fill="#2e6f73"/>
            </svg>
            <div class="sign" data-reveal>
                <h2 id="contact-title">${e(P.contactLine)}</h2>
                <a class="sign__email" href="mailto:${e(P.email)}">${e(P.email)}</a>
                <ul class="sign__links">
                    <li><a href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                    ${P.social.map(s => `<li><a href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
                </ul>
            </div>
            <footer class="foot">
                <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
                <a href="#top">Back to top</a>
            </footer>
        </section>
    </main>`;

    /* Layers drift at their own depth with scroll and pointer */
    const layers = Array.from(document.querySelectorAll('.layer'));
    let px = 0, py = 0, sy = 0;

    function place() {
        layers.forEach(function (l) {
            const d = parseFloat(l.dataset.depth);
            l.style.transform = 'translate3d(' + (px * d * 120).toFixed(1) + 'px,' + (sy * d * -1 + py * d * 60).toFixed(1) + 'px,0)';
        });
    }

    if (!Kit.reduced) {
        window.addEventListener('pointermove', function (ev) {
            px = ev.clientX / innerWidth - .5;
            py = ev.clientY / innerHeight - .5;
            requestAnimationFrame(place);
        });
        Kit.onScroll(function (_, y) { sy = y; place(); });
    }

    Kit.reveal({ stagger: 110 });
    Kit.loaded(120);
    Kit.switcher('paper-cutout');
})();
