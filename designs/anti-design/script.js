/* Anti-design: controlled chaos */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    // Deliberately uneven sizes for the skills cloud (stable, not random)
    const sizes = [1, 2.4, 1.3, 3.1, 1.1, 1.8, 2.7, 1.2, 1.6, 2.1];
    let k = 0;
    const marquee = `${e(P.role)} *** ${e(P.location)} *** available for interesting problems *** `;

    app.innerHTML = `
    <div class="marquee" aria-hidden="true"><div class="marquee__track">${marquee.repeat(6)}</div></div>

    <header class="top">
        <p class="top__file">file:///rahul-prasad/index.html</p>
        <nav aria-label="Sections">
            <a href="#work">experience</a>,
            <a href="#projects">projects</a>,
            <a href="#skills">skills</a>,
            <a href="#contact">contact</a>
        </nav>
        <p class="top__counter" aria-hidden="true"><span class="pct">0</span>%</p>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <h1 id="hero-name" class="giant" data-drift="-.25"><span class="giant__a">${e(P.first)}</span><span class="giant__b">${e(P.last.toUpperCase())}</span></h1>

            <figure class="strip" data-drift=".12">
                <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                <figcaption>fig. 1 &mdash; the engineer, at sunset, slightly cropped.</figcaption>
            </figure>

            <p class="hero__lede">${e(P.lede)}</p>

            <p class="hero__role"><mark>${e(P.role)}</mark><br>(${e(P.location)})</p>

            <ul class="hero__actions">
                <li><a href="${e(P.cv)}" target="_blank" rel="noopener">[download cv]</a></li>
                <li><a href="mailto:${e(P.email)}">[email me]</a></li>
            </ul>

            <dl class="facts">
                ${P.facts.map((f, i) => `<div class="facts__${i + 1}" data-drift="${[.3, -.15, .2][i]}"><dt>${e(f.label)}:</dt><dd>${e(f.value)}</dd></div>`).join('')}
            </dl>

            <p class="note note--1" aria-hidden="true">← this is not a mistake</p>
        </section>

        <section id="work" class="work" aria-labelledby="work-title">
            <h2 id="work-title" class="vertical">Experience</h2>
            ${P.jobs.map((j, ji) => `
            <article class="job job--${ji + 1}" data-reveal>
                <h3><span class="job__years">${e(j.start)}&ndash;${e(j.end)}</span> ${e(j.company)}</h3>
                <p class="job__meta">${e(j.role)} / ${e(j.place)} / ${e(j.context)}</p>
                <table class="raw">
                    <thead><tr><th scope="col">#</th><th scope="col">what</th><th scope="col">how</th><th scope="col">so what</th></tr></thead>
                    <tbody>
                        ${j.wins.map((w, i) => `<tr><td>${i + 1}</td><th scope="row">${e(w.title)}</th><td>${e(w.text)}</td><td><mark>${e(w.result)}</mark></td></tr>`).join('')}
                    </tbody>
                </table>
            </article>`).join('')}
        </section>

        <section id="projects" class="projects" aria-labelledby="projects-title">
            <h2 id="projects-title" class="label">Projects (${P.projects.length})</h2>
            <ol class="plist">
                ${P.projects.map((p, i) => `
                <li class="pitem" data-reveal>
                    <a class="pitem__link" href="${e(p.href)}" target="_blank" rel="noopener">${e(p.name)}</a>
                    <div class="pitem__card">
                        <p>${e(p.summary)}</p>
                        <p><b>${e(p.result)}</b></p>
                        <p class="pitem__tags">${p.tags.map(e).join(' &middot; ')}</p>
                    </div>
                </li>`).join('')}
            </ol>
        </section>

        <section id="skills" class="skills" aria-labelledby="skills-title">
            <h2 id="skills-title" class="label">Skills, in no particular order</h2>
            <p class="cloud" data-reveal>
                ${P.skills.flatMap(g => g.items).map(s => `<span style="--s:${sizes[k++ % sizes.length]}">${e(s)}</span>`).join(', ')}.
            </p>
            <p class="edu" data-reveal>Also: ${e(P.education.degree)}, ${e(P.education.school)}, ${e(P.education.years)}.</p>
        </section>

        <section id="contact" class="contact" aria-labelledby="contact-title">
            <h2 id="contact-title" class="contact__line" data-reveal>${e(P.contactLine)}</h2>
            <a class="contact__email" href="mailto:${e(P.email)}" data-reveal>${e(P.email)}</a>
            <p class="contact__more" data-reveal>or call <a href="${e(P.phoneHref)}">${e(P.phone)}</a>, or find me on ${P.social.map(s => `<a href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a>`).join(', ')}.</p>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}. best viewed in any browser.</p>
        <a href="#top">^ top</a>
    </footer>

    <div class="sticker" aria-hidden="true">hire Rahul?</div>`;

    /* Scroll: a big percentage counter, and elements drifting sideways at odd rates */
    const pct = document.querySelector('.pct');
    const drifters = Array.from(document.querySelectorAll('[data-drift]'));
    Kit.onScroll(function (progress, y) {
        pct.textContent = Math.round(progress * 100);
        if (Kit.reduced) return;
        drifters.forEach(function (el) {
            el.style.setProperty('--dx', (y * parseFloat(el.dataset.drift)).toFixed(1) + 'px');
        });
    });

    /* A sticker that trails the pointer, a little late */
    const sticker = document.querySelector('.sticker');
    let sx = innerWidth / 2, sy = innerHeight / 2, tx = sx, ty = sy;
    if (!Kit.reduced && matchMedia('(pointer: fine)').matches) {
        window.addEventListener('pointermove', function (ev) { tx = ev.clientX; ty = ev.clientY; sticker.classList.add('is-on'); });
        (function follow() {
            sx += (tx - sx) * .12;
            sy += (ty - sy) * .12;
            sticker.style.transform = 'translate(' + (sx + 18).toFixed(0) + 'px,' + (sy + 18).toFixed(0) + 'px) rotate(-8deg)';
            requestAnimationFrame(follow);
        })();
    }

    Kit.reveal({ stagger: 60 });
    Kit.loaded(50);
    Kit.switcher('anti-design');
})();
