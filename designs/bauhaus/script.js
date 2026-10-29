/* Bauhaus: form follows function */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');
    const lc = function (s) { return e(String(s).toLowerCase()); };

    const shape = ['circle', 'square', 'triangle'];
    const tone = ['red', 'blue', 'yellow'];

    app.innerHTML = `
    <header class="bar">
        <a class="bar__name" href="#top"><span class="mk mk--c" aria-hidden="true"></span><span class="mk mk--s" aria-hidden="true"></span><span class="mk mk--t" aria-hidden="true"></span>${lc(P.name)}</a>
        <nav aria-label="Sections">
            <a href="#work">experience</a>
            <a href="#projects">projects</a>
            <a href="#skills">skills</a>
            <a href="#contact">contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <div class="comp" aria-hidden="true">
                <span class="g g-arc"></span>
                <span class="g g-square"></span>
                <span class="g g-tri"></span>
                <span class="g g-bar"></span>
                <span class="g g-bar g-bar--2"></span>
                <span class="g g-dot"></span>
                <span class="g g-half"></span>
            </div>
            <figure class="disc">
                <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
            </figure>
            <h1 id="hero-name" class="diag" data-load><span>${lc(P.first)}</span><span>${lc(P.last)}</span></h1>
            <div class="hero__copy" data-load>
                <p class="hero__role">${lc(P.role)}, ${lc(P.location)}</p>
                <p class="hero__lede">${e(P.lede)}</p>
                <div class="hero__actions">
                    <a class="btn btn--red" href="${e(P.cv)}" target="_blank" rel="noopener">download cv</a>
                    <a class="btn" href="mailto:${e(P.email)}">email me</a>
                </div>
            </div>
            <dl class="facts" data-load>
                ${P.facts.map((f, i) => `<div><span class="mk mk--${['c', 's', 't'][i]}" aria-hidden="true"></span><dt>${lc(f.label)}</dt><dd>${lc(f.value)}</dd></div>`).join('')}
            </dl>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <h2 id="work-title" class="title" data-reveal><span class="mk mk--c" aria-hidden="true"></span>experience</h2>
            ${P.jobs.map((j, ji) => `
            <article class="job job--${tone[ji]}" data-reveal>
                <header class="job__head">
                    <span class="job__shape job__shape--${shape[ji]}" aria-hidden="true"></span>
                    <div>
                        <p class="job__years">${e(j.start)} &mdash; ${lc(j.end)}</p>
                        <h3>${lc(j.company)}</h3>
                        <p class="job__role">${lc(j.role)}, ${lc(j.place)}</p>
                    </div>
                </header>
                <p class="job__context">${e(j.context)}</p>
                <ul class="wins">
                    ${j.wins.map(w => `
                    <li>
                        <h4>${lc(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="wins__result">${e(w.result)}</p>
                    </li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="title" data-reveal><span class="mk mk--s" aria-hidden="true"></span>projects</h2>
            <div class="projects">
                ${P.projects.map((p, i) => `
                <article class="project project--${i + 1}" data-reveal>
                    <span class="project__shape" aria-hidden="true"></span>
                    <h3>${lc(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="project__result">${e(p.result)}</p>
                    <p class="project__tags">${p.tags.map(lc).join(' / ')}</p>
                    <a href="${e(p.href)}" target="_blank" rel="noopener">${lc(p.link)}</a>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="title" data-reveal><span class="mk mk--t" aria-hidden="true"></span>skills</h2>
            <div class="skills">
                ${P.skills.map((g, gi) => `
                <div class="skillset skillset--${tone[gi % 3]}" data-reveal>
                    <h3>${lc(g.group)}</h3>
                    <ul>${g.items.map(s => `<li>${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="skillset skillset--black" data-reveal>
                    <h3>education</h3>
                    <p>${e(P.education.degree)}<br>${e(P.education.school)}<br>${e(P.education.years)}</p>
                </div>
            </div>
        </section>

        <section id="contact" class="contact" aria-labelledby="contact-title">
            <span class="contact__circle" aria-hidden="true"></span>
            <span class="contact__tri" aria-hidden="true"></span>
            <div class="contact__inner" data-reveal>
                <h2 id="contact-title" class="contact__line">${e(P.contactLine)}</h2>
                <a class="contact__email" href="mailto:${e(P.email)}">${e(P.email)}</a>
                <ul class="contact__links">
                    <li><a href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                    ${P.social.map(s => `<li><a href="${e(s.href)}" target="_blank" rel="noopener">${lc(s.label)}</a></li>`).join('')}
                </ul>
            </div>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${lc(P.name)}</p>
        <a href="#top">back to top</a>
    </footer>`;

    /* The composition turns as the page scrolls: each shape at its own rate */
    Kit.onScroll(function (_, y) {
        if (Kit.reduced) return;
        document.documentElement.style.setProperty('--turn', (y * .06).toFixed(2) + 'deg');
        document.documentElement.style.setProperty('--slide', (y * .12).toFixed(1) + 'px');
    });

    Kit.reveal({ stagger: 110 });
    Kit.loaded(100);
    Kit.switcher('bauhaus');
})();
