/* 3D inflated */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    const puffy = function (word, offset) {
        return Array.from(word).map(function (ch, i) {
            return `<span class="puff" style="--l:${i + offset}" data-ch="${e(ch)}">${e(ch)}</span>`;
        }).join('');
    };

    const colors = ['pink', 'lilac', 'mint', 'butter', 'sky'];

    app.innerHTML = `
    <div class="floaties" aria-hidden="true">
        <span class="blob blob--1 c-pink" data-speed=".25"></span>
        <span class="blob blob--2 c-sky" data-speed="-.18"></span>
        <span class="ring ring--1 c-butter" data-speed=".35"></span>
        <span class="pill pill--1 c-mint" data-speed="-.3"></span>
        <span class="star star--1 c-lilac" data-speed=".2"></span>
        <span class="blob blob--3 c-mint" data-speed=".42"></span>
        <span class="ring ring--2 c-pink" data-speed="-.22"></span>
        <span class="star star--2 c-butter" data-speed="-.4"></span>
    </div>

    <header class="bar">
        <a class="bar__name" href="#top">${e(P.name)}</a>
        <nav aria-label="Sections">
            <a href="#work" class="c-pink">Experience</a>
            <a href="#projects" class="c-sky">Projects</a>
            <a href="#skills" class="c-mint">Skills</a>
            <a href="#contact" class="c-butter">Contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <div class="hero__text">
                <p class="hero__role" data-load>${e(P.role)}, ${e(P.location)}</p>
                <h1 id="hero-name" class="hero__name" aria-label="${e(P.name)}">
                    <span class="word" aria-hidden="true">${puffy(P.first, 0)}</span>
                    <span class="word word--2" aria-hidden="true">${puffy(P.last, P.first.length)}</span>
                </h1>
                <p class="hero__lede pillow" data-load>${e(P.lede)}</p>
                <div class="hero__actions" data-load>
                    <a class="bubble-btn c-pink" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="bubble-btn c-white" href="mailto:${e(P.email)}">Email me</a>
                </div>
            </div>

            <figure class="float-ring" data-load>
                <span class="float-ring__tube" aria-hidden="true"></span>
                <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
            </figure>

            <dl class="balloons">
                ${P.facts.map((f, i) => `
                <div class="balloon c-${['pink', 'sky', 'mint'][i]}" style="--bob:${i * -1.1}s" data-load>
                    <dt>${e(f.label)}</dt>
                    <dd>${e(f.value)}</dd>
                </div>`).join('')}
            </dl>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <h2 id="work-title" class="title" data-reveal>Experience</h2>
            ${P.jobs.map((j, ji) => `
            <article class="job">
                <header class="job__head pillow c-${colors[ji]}" data-reveal>
                    <div>
                        <h3>${e(j.company)}</h3>
                        <p>${e(j.role)}</p>
                    </div>
                    <p class="job__when">${e(j.when)}<br>${e(j.place)}</p>
                </header>
                <p class="job__context" data-reveal>${e(j.context)}</p>
                <ul class="wins">
                    ${j.wins.map((w, i) => `
                    <li class="pillow pillow--white win" data-reveal>
                        <span class="dot c-${colors[(i + ji) % 5]}" aria-hidden="true"></span>
                        <h4>${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="win__result c-${colors[(i + ji) % 5]}">${e(w.result)}</p>
                    </li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="title" data-reveal>Projects</h2>
            <div class="projects">
                ${P.projects.map((p, i) => `
                <article class="pillow project c-${['lilac', 'pink', 'sky', 'mint'][i]}" data-reveal>
                    <h3>${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="project__result">${e(p.result)}</p>
                    <ul class="gummies" aria-label="Built with">${p.tags.map(t => `<li>${e(t)}</li>`).join('')}</ul>
                    <a class="bubble-btn bubble-btn--small c-white" href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="title" data-reveal>Skills</h2>
            <div class="skills">
                ${P.skills.map((g, gi) => `
                <div class="skillset" data-reveal>
                    <h3>${e(g.group)}</h3>
                    <ul class="gummies gummies--big">${g.items.map((s, si) => `<li class="c-${colors[(si + gi) % 5]}">${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="skillset pillow pillow--white" data-reveal>
                    <h3>Education</h3>
                    <p>${e(P.education.degree)}<br>${e(P.education.school)}<br><b>${e(P.education.years)}</b></p>
                </div>
            </div>
        </section>

        <section id="contact" class="contact" aria-labelledby="contact-title">
            <div class="pillow contact__pillow c-lilac" data-reveal>
                <h2 id="contact-title" class="contact__line">${e(P.contactLine)}</h2>
                <a class="contact__email" href="mailto:${e(P.email)}">${e(P.email)}</a>
                <ul class="contact__links">
                    <li><a class="bubble-btn bubble-btn--small c-white" href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                    ${P.social.map((s, i) => `<li><a class="bubble-btn bubble-btn--small c-${['pink', 'mint', 'butter'][i]}" href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
                </ul>
            </div>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
        <a href="#top">Back to top</a>
    </footer>`;

    /* Floaties drift with scroll at their own speed */
    const floaties = Array.from(document.querySelectorAll('.floaties > *'));
    Kit.onScroll(function (_, y) {
        if (Kit.reduced) return;
        floaties.forEach(function (f) {
            f.style.setProperty('--sy', (y * parseFloat(f.dataset.speed)).toFixed(1) + 'px');
        });
    });

    Kit.reveal({ stagger: 90 });
    Kit.loaded(100);
    Kit.switcher('3d-inflated');
})();
