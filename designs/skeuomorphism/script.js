/* Skeuomorphism: the engineer's desk */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    // Highlight the measurable part of a result with a marker stroke
    const marker = function (text) { return '<mark class="hl">' + e(text) + '</mark>'; };

    const tilt = [-2.2, 1.6, -1.2, 2.4];

    app.innerHTML = `
    <header class="topbar">
        <a class="plaque" href="#top"><span>${e(P.name)}</span></a>
        <nav class="tabs" aria-label="Sections">
            <a href="#work" class="tab tab--yellow">Experience</a>
            <a href="#projects" class="tab tab--pink">Projects</a>
            <a href="#skills" class="tab tab--blue">Skills</a>
            <a href="#contact" class="tab tab--green">Contact</a>
        </nav>
    </header>

    <main class="mat" id="top">
        <section class="hero" aria-labelledby="hero-name">
            <div class="hero__desk">
                <article class="bizcard" data-load>
                    <p class="bizcard__mark" aria-hidden="true">${e(P.initials)}</p>
                    <h1 id="hero-name" class="bizcard__name">${e(P.name)}</h1>
                    <p class="bizcard__role">${e(P.role)}</p>
                    <p class="bizcard__meta">${e(P.location)}<br><a href="mailto:${e(P.email)}">${e(P.email)}</a></p>
                </article>

                <div class="note" data-load>
                    <span class="clip" aria-hidden="true"></span>
                    <p>${e(P.lede)}</p>
                </div>

                <div class="actions" data-load>
                    <a class="btn btn--brass" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="btn btn--paper" href="mailto:${e(P.email)}">Email me</a>
                </div>

                <dl class="dymo" data-load>
                    ${P.facts.map(f => `<div class="dymo__tape"><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
                </dl>
            </div>

            <figure class="polaroid" data-load>
                <span class="tape tape--l" aria-hidden="true"></span>
                <span class="tape tape--r" aria-hidden="true"></span>
                <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                <figcaption>Pune, golden hour</figcaption>
            </figure>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <h2 id="work-title" class="label-plate" data-reveal>Experience</h2>

            <div class="cabinet" data-reveal>
                <div class="folder-tabs" role="tablist" aria-label="Companies">
                    ${P.jobs.map((j, i) => `
                        <button class="folder-tab" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
                            <span>${e(j.company)}</span><small>${e(j.start)} to ${e(j.end)}</small>
                        </button>`).join('')}
                </div>
                ${P.jobs.map((j, i) => `
                <div class="folder" role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}" ${i === 0 ? '' : 'hidden'}>
                    <div class="sheet">
                        <header class="sheet__head">
                            <div>
                                <h3>${e(j.company)}</h3>
                                <p class="sheet__role">${e(j.role)}</p>
                            </div>
                            <p class="stamp">${e(j.when)}<br>${e(j.place)}</p>
                        </header>
                        <p class="sheet__context">${e(j.context)}</p>
                        <ol class="sheet__wins">
                            ${j.wins.map(w => `
                            <li>
                                <h4>${e(w.title)}</h4>
                                <p>${e(w.text)}</p>
                                <p class="result">${marker(w.result)}</p>
                            </li>`).join('')}
                        </ol>
                    </div>
                </div>`).join('')}
            </div>
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="label-plate" data-reveal>Projects</h2>
            <div class="cork">
                ${P.projects.map((p, i) => `
                <article class="card" style="--tilt:${tilt[i % tilt.length]}deg" data-reveal>
                    <span class="pin" aria-hidden="true"></span>
                    <h3>${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="card__result">${e(p.result)}</p>
                    <ul class="card__tags" aria-label="Built with">${p.tags.map(t => `<li>${e(t)}</li>`).join('')}</ul>
                    <a href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="label-plate" data-reveal>Skills</h2>
            <div class="skills">
                <div class="keyboard" data-reveal>
                    <span class="keyboard__led" aria-hidden="true"></span>
                    ${P.skills.map(g => `
                    <div class="keyrow">
                        <h3 class="keyrow__name">${e(g.group)}</h3>
                        <ul class="keys">${g.items.map(s => `<li><kbd class="key">${e(s)}</kbd></li>`).join('')}</ul>
                    </div>`).join('')}
                </div>

                <figure class="diploma" data-reveal>
                    <div class="diploma__paper">
                        <p class="diploma__school">${e(P.education.school)}</p>
                        <p class="diploma__deg">${e(P.education.degree)}</p>
                        <p class="diploma__years">${e(P.education.years)}</p>
                        <span class="seal" aria-hidden="true"></span>
                    </div>
                    <figcaption class="visually-hidden">Education</figcaption>
                </figure>
            </div>
        </section>

        <section id="contact" class="section contact" aria-labelledby="contact-title">
            <div class="envelope" data-envelope>
                <div class="envelope__back" aria-hidden="true"></div>
                <div class="letter">
                    <h2 id="contact-title">${e(P.contactLine)}</h2>
                    <a class="letter__email" href="mailto:${e(P.email)}">${e(P.email)}</a>
                    <ul class="letter__links">
                        <li><a href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                        ${P.social.map(s => `<li><a href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
                    </ul>
                    <p class="letter__sign">Rahul</p>
                </div>
                <div class="envelope__front" aria-hidden="true"></div>
                <div class="envelope__flap" aria-hidden="true"><span class="wax">${e(P.initials)}</span></div>
            </div>
        </section>

        <footer class="foot">
            <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
            <a href="#top">Back to top</a>
        </footer>
    </main>`;

    /* Folder tabs: an accessible tablist with a paper slide between folders */
    const tabs = Array.from(document.querySelectorAll('.folder-tab'));
    const panels = Array.from(document.querySelectorAll('.folder'));

    function select(index, focus) {
        tabs.forEach(function (tab, i) {
            const on = i === index;
            tab.setAttribute('aria-selected', String(on));
            tab.tabIndex = on ? 0 : -1;
            panels[i].hidden = !on;
            if (on) {
                panels[i].classList.remove('is-shown');
                void panels[i].offsetWidth;
                panels[i].classList.add('is-shown');
            }
        });
        if (focus) tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(i, false); });
        tab.addEventListener('keydown', function (ev) {
            const k = ev.key;
            if (k === 'ArrowRight' || k === 'ArrowLeft' || k === 'Home' || k === 'End') {
                ev.preventDefault();
                let n = i;
                if (k === 'ArrowRight') n = (i + 1) % tabs.length;
                if (k === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
                if (k === 'Home') n = 0;
                if (k === 'End') n = tabs.length - 1;
                select(n, true);
            }
        });
    });

    /* Keys are "typed" one after another when the keyboard arrives */
    Kit.reveal({
        onReveal: function (el) {
            if (el.classList.contains('keyboard')) {
                el.querySelectorAll('.key').forEach(function (key, i) {
                    setTimeout(function () { key.classList.add('is-typed'); }, 120 + i * 45);
                });
            }
        }
    });

    /* The envelope opens as it scrolls into view */
    const envelope = document.querySelector('[data-envelope]');
    if ('IntersectionObserver' in window && !Kit.reduced) {
        new IntersectionObserver(function (entries, obs) {
            if (entries[0].isIntersecting) {
                envelope.classList.add('is-open');
                obs.disconnect();
            }
        }, { threshold: 0.45 }).observe(envelope);
    } else {
        envelope.classList.add('is-open');
    }

    Kit.loaded(150);
    Kit.switcher('skeuomorphism');
})();
