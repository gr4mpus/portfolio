/* Memphis */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    const letters = function (word, offset) {
        return Array.from(word).map(function (ch, i) {
            return `<span class="ltr" style="--l:${i + offset}">${e(ch)}</span>`;
        }).join('');
    };

    const squiggle = function (cls, color) {
        return `<svg class="shape squiggle ${cls}" viewBox="0 0 220 60" aria-hidden="true"><path pathLength="1" d="M6 34 C 26 6, 42 6, 58 30 S 92 56, 110 30 S 144 4, 162 30 S 196 58, 214 26" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"/></svg>`;
    };

    // Floating shapes: [class, speed, rotation per scroll]
    const shapes = `
        ${squiggle('s1', '#ff5fa2')}
        <span class="shape tri s2" data-speed="-.18"></span>
        <span class="shape half s3" data-speed=".22"></span>
        <span class="shape dots s4" data-speed="-.1"></span>
        <span class="shape ring s5" data-speed=".3"></span>
        ${squiggle('s6', '#19b9a8')}
        <span class="shape bar s7" data-speed="-.25"></span>
        <span class="shape zig s8" data-speed=".15"></span>`;

    const shadows = ['stripes', 'dots', 'checks', 'stripes-y'];
    const tilts = [-1.6, 1.2, -.8, 1.8, -1.2];
    const chipColors = ['pink', 'teal', 'yellow', 'violet', 'sky'];

    app.innerHTML = `
    <header class="bar">
        <a class="bar__name" href="#top">${e(P.name)}</a>
        <nav aria-label="Sections">
            <a href="#work" class="bg-pink">Experience</a>
            <a href="#projects" class="bg-yellow">Projects</a>
            <a href="#skills" class="bg-teal">Skills</a>
            <a href="#contact" class="bg-violet">Contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <div class="hero__shapes" aria-hidden="true">${shapes}</div>

            <div class="hero__text">
                <p class="hero__role" data-load>${e(P.role)} in ${e(P.location)}</p>
                <h1 id="hero-name" class="hero__name" aria-label="${e(P.name)}">
                    <span class="word" aria-hidden="true">${letters(P.first, 0)}</span>
                    <span class="word word--2" aria-hidden="true">${letters(P.last, P.first.length)}</span>
                </h1>
                <p class="hero__lede" data-load>${e(P.lede)}</p>
                <div class="hero__actions" data-load>
                    <a class="btn bg-pink" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="btn bg-white" href="mailto:${e(P.email)}">Email me</a>
                </div>
            </div>

            <figure class="cutout" data-load>
                <span class="cutout__shadow" aria-hidden="true"></span>
                <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                <span class="cutout__tri" aria-hidden="true"></span>
            </figure>

            <dl class="stickers">
                ${P.facts.map((f, i) => `<div class="sticker sticker--${i + 1}" data-load><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
            </dl>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <h2 id="work-title" class="title bg-yellow" data-reveal>Experience</h2>
            ${P.jobs.map((j, ji) => `
            <article class="job">
                <header class="job__band job__band--${ji + 1}" data-reveal>
                    <div>
                        <h3>${e(j.company)}</h3>
                        <p class="job__role">${e(j.role)}</p>
                    </div>
                    <p class="job__when">${e(j.when)}<br>${e(j.place)}</p>
                </header>
                <p class="job__context" data-reveal>${e(j.context)}</p>
                <ul class="wins">
                    ${j.wins.map((w, i) => `
                    <li class="card card--${shadows[(i + ji) % 4]}" style="--tilt:${tilts[(i + ji) % 5]}deg" data-reveal>
                        <h4>${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="card__result bg-${chipColors[(i + ji) % 5]}">${e(w.result)}</p>
                    </li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="title bg-teal" data-reveal>Projects</h2>
            <div class="projects">
                ${P.projects.map((p, i) => `
                <article class="card card--${shadows[(i + 1) % 4]} project" style="--tilt:${tilts[i]}deg" data-reveal>
                    <span class="badge badge--${i + 1}" aria-hidden="true"></span>
                    <h3>${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="project__result">${e(p.result)}</p>
                    <ul class="chips" aria-label="Built with">${p.tags.map((t, ti) => `<li class="bg-${chipColors[(ti + i) % 5]}">${e(t)}</li>`).join('')}</ul>
                    <a class="btn btn--small bg-white" href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="title bg-pink" data-reveal>Skills</h2>
            <div class="skills">
                ${P.skills.map((g, gi) => `
                <div class="skillset" data-reveal>
                    <h3>${e(g.group)}</h3>
                    <ul class="chips">${g.items.map((s, si) => `<li class="bg-${chipColors[(si + gi) % 5]}">${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="skillset skillset--edu card card--dots" style="--tilt:1deg" data-reveal>
                    <h3>Education</h3>
                    <p>${e(P.education.degree)}</p>
                    <p>${e(P.education.school)}</p>
                    <p class="edu__years bg-yellow">${e(P.education.years)}</p>
                </div>
            </div>
        </section>

        <section id="contact" class="contact" aria-labelledby="contact-title">
            ${squiggle('contact__squiggle', '#121212')}
            <span class="contact__circle" aria-hidden="true"></span>
            <h2 id="contact-title" class="contact__line" data-reveal>${e(P.contactLine)}</h2>
            <a class="contact__email" href="mailto:${e(P.email)}" data-reveal>${e(P.email)}</a>
            <ul class="contact__links" data-reveal>
                <li><a class="btn btn--small bg-white" href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                ${P.social.map((s, i) => `<li><a class="btn btn--small bg-${['yellow', 'teal', 'violet'][i]}" href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
            </ul>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
        <a href="#top">Back to top</a>
    </footer>`;

    /* Shapes drift at their own speed with scroll and lean towards the pointer */
    const floaters = Array.from(document.querySelectorAll('.hero__shapes .shape'));
    let px = 0, py = 0, sy = 0;

    function place() {
        floaters.forEach(function (el, i) {
            const speed = parseFloat(el.dataset.speed || (i % 2 ? .12 : -.14));
            const depth = (i % 3 + 1) * 6;
            el.style.setProperty('--tx', (px * depth).toFixed(1) + 'px');
            el.style.setProperty('--ty', (sy * speed + py * depth).toFixed(1) + 'px');
            el.style.setProperty('--rot', (sy * speed * .25).toFixed(1) + 'deg');
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

    Kit.reveal({ stagger: 90 });
    Kit.loaded(100);
    Kit.switcher('memphis');
})();
