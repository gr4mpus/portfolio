/* De Stijl: composition in red, yellow and blue */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');
    const colours = ['red', 'blue', 'yellow'];

    // Small squares travelling along a yellow lane, after Broadway Boogie Woogie
    const boogie = Array.from({ length: 22 }, (_, i) =>
        `<span class="sq sq--${['red', 'blue', 'grey', 'red', 'blue'][i % 5]}" style="--i:${i}"></span>`).join('');

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
    <div class="lane" aria-hidden="true">${boogie}</div>

    <main id="top">
        <section class="comp hero" aria-labelledby="hero-name">
            <div class="cell c-red hero__red" data-fill="down"></div>
            <div class="cell hero__name" data-fill="right">
                <p class="hero__role">${e(P.role)}, ${e(P.location)}</p>
                <h1 id="hero-name">${e(P.first)}<br>${e(P.last)}</h1>
            </div>
            <figure class="cell hero__photo" data-fill="up">
                <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
            </figure>
            <div class="cell hero__lede" data-fill="right"><p>${e(P.lede)}</p></div>
            <div class="cell c-yellow hero__yellow" data-fill="down"></div>
            <div class="cell hero__actions" data-fill="left">
                <a class="btn btn--black" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                <a class="btn" href="mailto:${e(P.email)}">Email me</a>
            </div>
            ${P.facts.map((f, i) => `<dl class="cell hero__fact hero__fact--${i + 1}" data-fill="up"><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></dl>`).join('')}
            <div class="cell c-blue hero__blue" data-fill="left"></div>
        </section>

        <section id="work" class="block" aria-labelledby="work-title">
            <h2 id="work-title" class="block__title" data-reveal><span>Experience</span></h2>
            ${P.jobs.map((j, ji) => `
            <article class="comp job job--${colours[ji % 3]}" style="--rows:${1 + Math.ceil(j.wins.length / 2)}" data-reveal>
                <header class="cell c-${colours[ji % 3]} job__head" data-fill="${ji % 2 ? 'left' : 'right'}">
                    <p class="job__years">${e(j.start)}<br>${e(j.end)}</p>
                    <h3>${e(j.company)}</h3>
                    <p class="job__role">${e(j.role)}</p>
                    <p class="job__place">${e(j.place)}</p>
                </header>
                <p class="cell job__context" data-fill="down">${e(j.context)}</p>
                ${j.wins.map((w, wi) => `
                <div class="cell win" data-fill="${['up', 'right', 'down', 'left'][wi % 4]}">
                    <h4>${e(w.title)}</h4>
                    <p>${e(w.text)}</p>
                    <p class="win__result">${e(w.result)}</p>
                </div>`).join('')}
                ${j.wins.length % 2 ? `<div class="cell c-${colours[(ji + 1) % 3]} win win--art" data-fill="up"></div>` : ''}
            </article>`).join('')}
        </section>

        <section id="projects" class="block" aria-labelledby="projects-title">
            <h2 id="projects-title" class="block__title" data-reveal><span>Projects</span></h2>
            <div class="comp projects" data-reveal>
                ${P.projects.map((p, i) => `
                <article class="cell project project--${i + 1}" data-fill="${['right', 'down', 'up', 'left'][i]}">
                    <h3>${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="project__result">${e(p.result)}</p>
                    <p class="project__tags">${p.tags.map(e).join(', ')}</p>
                    <a href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                </article>`).join('')}
                <div class="cell c-red projects__a" data-fill="down"></div>
                <div class="cell c-yellow projects__b" data-fill="right"></div>
                <div class="cell c-blue projects__c" data-fill="up"></div>
            </div>
        </section>

        <section id="skills" class="block" aria-labelledby="skills-title">
            <h2 id="skills-title" class="block__title" data-reveal><span>Skills</span></h2>
            <div class="comp skills" data-reveal>
                ${P.skills.map((g, i) => `
                <div class="cell skill skill--${i + 1}" data-fill="${['down', 'right', 'up', 'left', 'down'][i]}">
                    <h3>${e(g.group)}</h3>
                    <ul>${g.items.map(s => `<li>${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="cell c-yellow skill skill--edu" data-fill="left">
                    <h3>Education</h3>
                    <p>${e(P.education.degree)}<br>${e(P.education.school)}<br>${e(P.education.years)}</p>
                </div>
            </div>
        </section>

        <section id="contact" class="comp contact" aria-labelledby="contact-title" data-reveal>
            <div class="cell c-blue contact__main" data-fill="right">
                <h2 id="contact-title">${e(P.contactLine)}</h2>
                <a class="contact__email" href="mailto:${e(P.email)}">${e(P.email)}</a>
            </div>
            <ul class="cell contact__links" data-fill="down">
                <li><a href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                ${P.social.map(s => `<li><a href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
            </ul>
            <div class="cell c-red contact__red" data-fill="up"></div>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
        <a href="#top">Back to top</a>
    </footer>`;

    Kit.reveal({ stagger: 60, threshold: 0.05 });
    Kit.loaded(80);
    Kit.switcher('de-stijl');
})();
