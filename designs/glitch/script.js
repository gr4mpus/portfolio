/* Glitch: signal corrupted */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');
    const GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEFX%$&';

    const g = function (tag, text, cls, attrs) {
        return `<${tag} class="glitch ${cls || ''}" data-text="${e(text)}" ${attrs || ''}>${e(text)}</${tag}>`;
    };

    app.innerHTML = `
    <header class="bar">
        <a class="bar__name" href="#top"><span class="rec" aria-hidden="true"></span>${e(P.name)}</a>
        <nav aria-label="Sections">
            <a href="#work">/experience</a>
            <a href="#projects">/projects</a>
            <a href="#skills">/skills</a>
            <a href="#contact">/contact</a>
        </nav>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <div class="hero__text">
                <p class="hero__boot" data-load>&gt; boot sequence ok. signal: ${e(P.location)}</p>
                <h1 id="hero-name" class="hero__name">
                    ${g('span', P.first, 'line', 'data-scramble')}
                    ${g('span', P.last, 'line line--2', 'data-scramble')}
                </h1>
                <p class="hero__role" data-load>${e(P.role)}</p>
                <p class="hero__lede" data-load>${e(P.lede)}</p>
                <div class="hero__actions" data-load>
                    <a class="btn btn--solid" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="btn" href="mailto:${e(P.email)}">Email me</a>
                </div>
            </div>

            <figure class="mosh" data-load>
                <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                <span class="mosh__ch mosh__ch--r" aria-hidden="true"></span>
                <span class="mosh__ch mosh__ch--c" aria-hidden="true"></span>
                <span class="mosh__slice" aria-hidden="true"></span>
                <span class="mosh__slice mosh__slice--2" aria-hidden="true"></span>
                <figcaption>CAM_01 // ${e(P.location)} // live</figcaption>
            </figure>

            <dl class="readout" data-load>
                ${P.facts.map(f => `<div><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
            </dl>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            ${g('h2', 'Experience', 'title', 'id="work-title" data-scramble data-reveal')}
            ${P.jobs.map(j => `
            <article class="log" data-reveal>
                <header class="log__head">
                    <p class="log__stamp">[${e(j.start)} → ${e(j.end)}] ${e(j.place)}</p>
                    ${g('h3', j.company, 'log__company')}
                    <p class="log__role">${e(j.role)}</p>
                </header>
                <p class="log__context">// ${e(j.context)}</p>
                <ol class="entries">
                    ${j.wins.map(w => `
                    <li class="entry">
                        <h4>&gt; ${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="entry__ok"><span>OK</span>${e(w.result)}</p>
                    </li>`).join('')}
                </ol>
            </article>`).join('')}
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            ${g('h2', 'Projects', 'title', 'id="projects-title" data-scramble data-reveal')}
            <div class="projects">
                ${P.projects.map((p, i) => `
                <article class="file" data-reveal>
                    <p class="file__meta">0x${(i + 1).toString(16).padStart(2, '0').toUpperCase()} // ${e(p.tags[0])}</p>
                    ${g('h3', p.name, 'file__name')}
                    <p>${e(p.summary)}</p>
                    <p class="file__result">${e(p.result)}</p>
                    <p class="file__tags">${p.tags.map(t => `<span>${e(t)}</span>`).join('')}</p>
                    <a class="btn btn--small" href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            ${g('h2', 'Skills', 'title', 'id="skills-title" data-scramble data-reveal')}
            <div class="dump" data-reveal>
                ${P.skills.map((gr, i) => `
                <div class="dump__row">
                    <h3>${(i * 16).toString(16).padStart(4, '0')}: ${e(gr.group)}</h3>
                    <ul>${gr.items.map(s => `<li>${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="dump__row">
                    <h3>${(80).toString(16).padStart(4, '0')}: Education</h3>
                    <p>${e(P.education.degree)}, ${e(P.education.school)}, ${e(P.education.years)}</p>
                </div>
            </div>
        </section>

        <section id="contact" class="section contact" aria-labelledby="contact-title">
            <p class="contact__lost" aria-hidden="true">NO SIGNAL</p>
            <h2 id="contact-title" class="contact__line" data-reveal>${e(P.contactLine)}</h2>
            ${g('a', P.email, 'contact__email', `href="mailto:${e(P.email)}" data-reveal`)}
            <ul class="contact__links" data-reveal>
                <li><a href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                ${P.social.map(s => `<li><a href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
            </ul>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)} // end of transmission</p>
        <a href="#top">Back to top</a>
    </footer>`;

    /* Text scramble: characters churn, then lock in from left to right */
    function scramble(el, duration) {
        const final = el.dataset.text || el.textContent;
        if (Kit.reduced) return;
        const start = performance.now();
        const ms = duration || 900;
        function frame(now) {
            const t = Math.min(1, (now - start) / ms);
            const locked = Math.floor(final.length * t);
            let out = '';
            for (let i = 0; i < final.length; i++) {
                if (i < locked || final[i] === ' ') out += final[i];
                else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            el.firstChild ? (el.firstChild.nodeValue = out) : (el.textContent = out);
            if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    /* Datamosh bursts on the portrait: channel offsets and torn slices */
    const mosh = document.querySelector('.mosh');
    function burst() {
        if (Kit.reduced || !mosh) return;
        let n = 0;
        const id = setInterval(function () {
            const a = Math.random() * 80, b = Math.random() * 80;
            mosh.style.setProperty('--r', (Math.random() * 14 - 7).toFixed(1) + 'px');
            mosh.style.setProperty('--c', (Math.random() * 14 - 7).toFixed(1) + 'px');
            mosh.style.setProperty('--s1', a.toFixed(1) + '%');
            mosh.style.setProperty('--s2', b.toFixed(1) + '%');
            mosh.style.setProperty('--h1', (4 + Math.random() * 10).toFixed(1) + '%');
            mosh.style.setProperty('--h2', (2 + Math.random() * 8).toFixed(1) + '%');
            mosh.style.setProperty('--x1', (Math.random() * 60 - 30).toFixed(1) + 'px');
            mosh.style.setProperty('--x2', (Math.random() * 60 - 30).toFixed(1) + 'px');
            mosh.classList.add('is-moshing');
            if (++n > 6) {
                clearInterval(id);
                mosh.classList.remove('is-moshing');
                mosh.style.setProperty('--r', '-3px');
                mosh.style.setProperty('--c', '3px');
            }
        }, 70);
    }

    setTimeout(burst, 1300);
    if (!Kit.reduced) setInterval(burst, 4200);

    /* Fast scrolling tears the screen for a moment */
    const tear = document.querySelector('.tear');
    let lastY = scrollY;
    Kit.onScroll(function (_, y) {
        const v = Math.abs(y - lastY);
        lastY = y;
        if (v > 60 && !Kit.reduced) {
            tear.style.setProperty('--t', (Math.random() * 90).toFixed(1) + '%');
            tear.style.setProperty('--tx', (Math.random() * 40 - 20).toFixed(0) + 'px');
            tear.classList.remove('is-on');
            void tear.offsetWidth;
            tear.classList.add('is-on');
        }
    });

    /* Hero names decode on load; headings re-scramble as they arrive */
    Kit.loaded(100);
    setTimeout(function () {
        document.querySelectorAll('.hero [data-scramble]').forEach(function (el, i) {
            setTimeout(function () { scramble(el, 1000); }, i * 250);
        });
    }, 250);

    Kit.reveal({
        stagger: 100,
        onReveal: function (el) {
            if (el.hasAttribute('data-scramble')) scramble(el, 700);
            if (el.classList.contains('contact__email')) scramble(el, 1200);
        }
    });

    Kit.switcher('glitch');
})();
