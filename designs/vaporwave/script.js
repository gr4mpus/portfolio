/* Vaporwave */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    const fileName = function (s) { return s.replace(/[^A-Za-z0-9]+/g, '_').replace(/_+$/, ''); };

    // A Windows 95 style window
    const win = function (title, body, opts) {
        const o = opts || {};
        return `
        <${o.tag || 'div'} class="win ${o.cls || ''}" ${o.attrs || ''}>
            <div class="win__title">
                <span class="win__icon" aria-hidden="true"></span>
                <span class="win__name">${title}</span>
                <span class="win__ctrl" aria-hidden="true"><i>_</i><i>□</i><i>×</i></span>
            </div>
            <div class="win__body">${body}</div>
        </${o.tag || 'div'}>`;
    };


    app.innerHTML = `
    <main id="top">
        <section class="scene" aria-labelledby="hero-name">
            <div class="sky" aria-hidden="true">
                <span class="sun"></span>
                <span class="kana">ラフル・プラサド</span>
                <svg class="mountains" viewBox="0 0 1440 220" preserveAspectRatio="none">
                    <path d="M0 220 L120 120 L210 170 L330 60 L450 160 L560 110 L640 180 L760 70 L880 150 L990 100 L1100 170 L1220 80 L1330 150 L1440 110 L1440 220 Z"/>
                    <path class="mountains__wire" d="M120 120 L190 220 M330 60 L300 220 M330 60 L400 220 M760 70 L700 220 M760 70 L830 220 M1220 80 L1180 220 M1220 80 L1290 220" />
                </svg>
            </div>
            <div class="floor" aria-hidden="true"><div class="floor__grid"></div></div>

            <div class="scene__content">
                <p class="scene__role" data-load>${e(P.role)}　${e(P.location)}</p>
                <h1 id="hero-name" class="neon" data-load>${e(P.first)}<br>${e(P.last)}</h1>

                <div class="scene__windows">
                    ${win('About_me.txt', `
                        <p class="scene__lede">${e(P.lede)}</p>
                        <div class="dialog__actions">
                            <a class="btn95 btn95--default" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                            <a class="btn95" href="mailto:${e(P.email)}">Email me</a>
                        </div>`, { cls: 'win--about', attrs: 'data-load' })}

                    ${win('rahul.jpg - Paint', `
                        <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">`, { tag: 'figure', cls: 'win--photo', attrs: 'data-load' })}
                </div>

                <dl class="stats" data-load>
                    ${P.facts.map(f => `<div><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
                </dl>
            </div>
        </section>

        <div class="desktop">
            <section id="work" class="section" aria-labelledby="work-title">
                <h2 id="work-title" class="section__title" data-reveal>Experience <span aria-hidden="true">経験</span></h2>
                ${P.jobs.map(j => win(`${fileName(j.company)}.exe`, `
                    <header class="job__head">
                        <div>
                            <h3>${e(j.company)}</h3>
                            <p class="job__role">${e(j.role)}</p>
                        </div>
                        <p class="job__when">${e(j.when)}<br>${e(j.place)}</p>
                    </header>
                    <p class="job__context">${e(j.context)}</p>
                    <ul class="wins">
                        ${j.wins.map(w => `
                        <li class="well">
                            <h4><span class="doc" aria-hidden="true"></span>${e(w.title)}</h4>
                            <p>${e(w.text)}</p>
                            <p class="well__result">${e(w.result)}</p>
                        </li>`).join('')}
                    </ul>`, { tag: 'article', cls: 'job', attrs: 'data-reveal' })).join('')}
            </section>

            <section id="projects" class="section" aria-labelledby="projects-title">
                <h2 id="projects-title" class="section__title" data-reveal>Projects <span aria-hidden="true">作品</span></h2>
                <div class="projects">
                    ${P.projects.map(p => win(`${fileName(p.name)}.app`, `
                        <h3>${e(p.name)}</h3>
                        <p>${e(p.summary)}</p>
                        <p class="project__result">${e(p.result)}</p>
                        <p class="project__tags">${p.tags.map(e).join(' / ')}</p>
                        <a class="btn95" href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>`, { tag: 'article', cls: 'project', attrs: 'data-reveal' })).join('')}
                </div>
            </section>

            <section id="skills" class="section" aria-labelledby="skills-title">
                <h2 id="skills-title" class="section__title" data-reveal>Skills <span aria-hidden="true">技術</span></h2>
                ${win('Control Panel', `
                    <div class="panels">
                        ${P.skills.map(g => `
                        <fieldset class="group">
                            <legend>${e(g.group)}</legend>
                            <ul class="icons">${g.items.map(s => `<li><span class="ico" aria-hidden="true"></span>${e(s)}</li>`).join('')}</ul>
                        </fieldset>`).join('')}
                        <fieldset class="group">
                            <legend>Education</legend>
                            <p>${e(P.education.degree)}<br>${e(P.education.school)}<br>${e(P.education.years)}</p>
                        </fieldset>
                    </div>`, { cls: 'skills', attrs: 'data-reveal' })}
            </section>

            <section id="contact" class="section" aria-labelledby="contact-title">
                ${win('New Message', `
                    <h2 id="contact-title" class="mail__line">${e(P.contactLine)}</h2>
                    <div class="mail__field"><span>To:</span><a href="mailto:${e(P.email)}">${e(P.email)}</a></div>
                    <div class="mail__field"><span>Call:</span><a href="${e(P.phoneHref)}">${e(P.phone)}</a></div>
                    <div class="mail__actions">
                        <a class="btn95 btn95--default" href="mailto:${e(P.email)}">Send</a>
                        ${P.social.map(s => `<a class="btn95" href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a>`).join('')}
                    </div>`, { cls: 'mail', attrs: 'data-reveal' })}
                <p class="outro" aria-hidden="true">ありがとう</p>
            </section>
        </div>
    </main>

    <nav class="taskbar" aria-label="Sections">
        <a class="start" href="#top"><span class="start__logo" aria-hidden="true"></span>Start</a>
        <a class="task" href="#work">Experience</a>
        <a class="task" href="#projects">Projects</a>
        <a class="task" href="#skills">Skills</a>
        <a class="task" href="#contact">Contact</a>
        <span class="tray"><time class="clock"></time></span>
    </nav>`;

    /* Taskbar clock */
    const clock = document.querySelector('.clock');
    function tick() {
        const d = new Date();
        clock.textContent = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        clock.dateTime = d.toISOString();
    }
    tick();
    setInterval(tick, 15000);

    /* Active section's taskbar button looks pressed */
    const tasks = document.querySelectorAll('.task');
    const ids = ['work', 'projects', 'skills', 'contact'];

    /* The grid floor drifts toward the viewer, faster while scrolling */
    const grid = document.querySelector('.floor__grid');
    let drift = 0;
    let last = performance.now();
    let lastY = scrollY;

    function roll(now) {
        const dt = Math.min(64, now - last);
        last = now;
        const dy = Math.abs(scrollY - lastY);
        lastY = scrollY;
        drift = (drift + dt * .03 + dy * .8) % 70;
        grid.style.backgroundPosition = '0 ' + drift.toFixed(1) + 'px, 0 ' + drift.toFixed(1) + 'px';
        requestAnimationFrame(roll);
    }

    if (!Kit.reduced) requestAnimationFrame(roll);

    /* The sun sinks as the page scrolls */
    Kit.onScroll(function (_, y) {
        document.documentElement.style.setProperty('--y', y.toFixed(0));
        let current = -1;
        ids.forEach(function (id, i) {
            if (document.getElementById(id).getBoundingClientRect().top < innerHeight * .5) current = i;
        });
        tasks.forEach(function (t, i) { t.classList.toggle('is-on', i === current); });
    });

    Kit.reveal({ stagger: 120 });
    Kit.loaded(100);
    Kit.switcher('vaporwave');
})();
