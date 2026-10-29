/* Neumorphism: the soft control panel */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    app.innerHTML = `
    <header class="bar">
        <a class="bar__name soft" href="#top"><span class="led" aria-hidden="true"></span>${e(P.name)}</a>
        <nav class="seg soft-in" aria-label="Sections">
            <a href="#work">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <div class="hero__panel soft" data-inflate>
                <p class="hero__role"><span class="led led--on" aria-hidden="true"></span>${e(P.role)} in ${e(P.location)}</p>
                <h1 id="hero-name" class="hero__name">${e(P.first)}<br>${e(P.last)}</h1>
                <p class="hero__lede">${e(P.lede)}</p>
                <div class="hero__actions">
                    <a class="btn btn--accent" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="btn" href="mailto:${e(P.email)}">Email me</a>
                </div>
            </div>

            <div class="knob-wrap" data-inflate>
                <div class="knob soft" aria-hidden="true">
                    <span class="knob__ticks"></span>
                    <span class="knob__notch"></span>
                </div>
                <div class="lens soft-in">
                    <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                </div>
            </div>

            <dl class="meters">
                ${P.facts.map((f, i) => `
                <div class="meter soft" data-inflate>
                    <dt>${e(f.label)}</dt>
                    <dd class="meter__screen soft-in"><span class="meter__value" data-count="${i !== 1}">${e(f.value)}</span></dd>
                </div>`).join('')}
            </dl>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <h2 id="work-title" class="title" data-reveal>Experience</h2>
            ${P.jobs.map((j, ji) => `
            <article class="job">
                <header class="job__head soft" data-reveal>
                    <div class="job__dial soft-in" aria-hidden="true"><span>${e(j.start)}</span></div>
                    <div class="job__id">
                        <h3>${e(j.company)}</h3>
                        <p class="job__role">${e(j.role)}</p>
                    </div>
                    <p class="job__when">${e(j.when)}<br>${e(j.place)}</p>
                </header>
                <p class="job__context" data-reveal>${e(j.context)}</p>
                <ul class="wins">
                    ${j.wins.map(w => `
                    <li class="win" data-reveal data-extrude>
                        <h4>${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="win__result soft-in"><span class="led led--on" aria-hidden="true"></span>${e(w.result)}</p>
                    </li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="title" data-reveal>Projects</h2>
            <div class="projects">
                ${P.projects.map(p => `
                <article class="project" data-reveal data-extrude>
                    <div class="project__top">
                        <h3>${e(p.name)}</h3>
                        <a class="round soft" href="${e(p.href)}" target="_blank" rel="noopener" aria-label="${e(p.link)}">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </a>
                    </div>
                    <p>${e(p.summary)}</p>
                    <p class="project__result soft-in">${e(p.result)}</p>
                    <ul class="chips" aria-label="Built with">${p.tags.map(t => `<li>${e(t)}</li>`).join('')}</ul>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="title" data-reveal>Skills</h2>
            <div class="skills">
                ${P.skills.map(g => `
                <div class="skillset soft-in" data-reveal>
                    <h3>${e(g.group)}</h3>
                    <ul class="chips chips--pop">${g.items.map(s => `<li>${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="skillset skillset--edu soft" data-reveal>
                    <h3>Education</h3>
                    <p class="edu__deg">${e(P.education.degree)}</p>
                    <p>${e(P.education.school)}</p>
                    <p class="edu__years soft-in">${e(P.education.years)}</p>
                </div>
            </div>
        </section>

        <section id="contact" class="section contact" aria-labelledby="contact-title">
            <div class="contact__panel soft" data-reveal>
                <h2 id="contact-title" class="contact__title">${e(P.contactLine)}</h2>
                <div class="field">
                    <a class="field__input soft-in" href="mailto:${e(P.email)}">${e(P.email)}</a>
                    <a class="send soft" href="mailto:${e(P.email)}" aria-label="Write an email">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12 20 4l-4 16-4-7-8-1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
                    </a>
                </div>
                <ul class="contact__links">
                    <li><a class="btn btn--small" href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                    ${P.social.map(s => `<li><a class="btn btn--small" href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
                </ul>
            </div>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
        <a href="#top">Back to top</a>
    </footer>`;

    /* Count up the meter readouts when they appear */
    Kit.reveal({ stagger: 80 });

    if ('IntersectionObserver' in window) {
        const meters = document.querySelectorAll('.meter__value[data-count="true"]');
        setTimeout(function () { meters.forEach(function (m) { Kit.countUp(m, 1500); }); }, 900);
    }

    /* The active section's segment stays pressed in */
    const links = document.querySelectorAll('.seg a');
    const sections = ['work', 'projects', 'skills', 'contact'].map(function (id) { return document.getElementById(id); });

    /* Knob: the notch turns through 300 degrees as the page scrolls */
    Kit.onScroll(function (progress) {
        document.documentElement.style.setProperty('--turn', (-150 + progress * 300).toFixed(1) + 'deg');
        let current = -1;
        sections.forEach(function (s, i) {
            if (s.getBoundingClientRect().top < innerHeight * 0.45) current = i;
        });
        links.forEach(function (a, i) { a.classList.toggle('is-on', i === current); });
    });

    Kit.loaded(100);
    Kit.switcher('neumorphism');
})();
