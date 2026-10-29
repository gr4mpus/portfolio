/* Liquid chrome */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    // Shared SVG defs: a chrome gradient and the liquid-metal filter
    // (blur + alpha threshold merges shapes; specular lighting gives them depth)
    const defs = `
    <svg class="defs" width="0" height="0" aria-hidden="true">
        <defs>
            <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#ffffff"/>
                <stop offset=".35" stop-color="#cfd7e4"/>
                <stop offset=".48" stop-color="#4c5566"/>
                <stop offset=".52" stop-color="#2a303c"/>
                <stop offset=".66" stop-color="#9aa6ba"/>
                <stop offset="1" stop-color="#f4f7fb"/>
            </linearGradient>
            <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
                <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur"/>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -13" result="goo"/>
                <feGaussianBlur in="goo" stdDeviation="5" result="soft"/>
                <feSpecularLighting in="soft" surfaceScale="7" specularConstant="1.25" specularExponent="26" lighting-color="#ffffff" result="spec">
                    <fePointLight x="120" y="-160" z="320"/>
                </feSpecularLighting>
                <feComposite in="spec" in2="goo" operator="in" result="shine"/>
                <feComposite in="goo" in2="shine" operator="arithmetic" k1="0" k2="1" k3=".9" k4="0"/>
            </filter>
        </defs>
    </svg>`;

    app.innerHTML = `
    ${defs}
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
            <svg class="mercury" viewBox="0 0 800 700" aria-hidden="true">
                <g filter="url(#liquid)" fill="url(#chrome)">
                    ${Array.from({ length: 7 }, (_, i) => `<circle class="drop" data-i="${i}" cx="400" cy="350" r="60"/>`).join('')}
                </g>
            </svg>

            <div class="hero__text">
                <p class="hero__role" data-load>${e(P.role)}, ${e(P.location)}</p>
                <h1 id="hero-name" class="chrome-type hero__name" data-load>
                    <span>${e(P.first)}</span><span>${e(P.last)}</span>
                </h1>
                <p class="hero__lede" data-load>${e(P.lede)}</p>
                <div class="hero__actions" data-load>
                    <a class="pill pill--chrome" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="pill pill--glass" href="mailto:${e(P.email)}">Email me</a>
                </div>
            </div>

            <figure class="droplet" data-load>
                <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
            </figure>

            <dl class="capsules" data-load>
                ${P.facts.map(f => `<div class="capsule"><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
            </dl>
        </section>

        <section id="work" class="section work" aria-labelledby="work-title">
            <h2 id="work-title" class="chrome-type title" data-reveal>Experience</h2>
            <div class="work__body" data-progress>
                <div class="tube" aria-hidden="true"><span class="tube__fill"></span></div>
                ${P.jobs.map(j => `
                <article class="job">
                    <header class="job__head" data-reveal>
                        <span class="bead" aria-hidden="true"></span>
                        <div>
                            <p class="job__when">${e(j.when)}, ${e(j.place)}</p>
                            <h3>${e(j.company)}</h3>
                            <p class="job__role">${e(j.role)}</p>
                        </div>
                    </header>
                    <p class="job__context" data-reveal>${e(j.context)}</p>
                    <ul class="wins">
                        ${j.wins.map(w => `
                        <li class="glass win" data-reveal>
                            <h4>${e(w.title)}</h4>
                            <p>${e(w.text)}</p>
                            <p class="win__result">${e(w.result)}</p>
                        </li>`).join('')}
                    </ul>
                </article>`).join('')}
            </div>
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="chrome-type title" data-reveal>Projects</h2>
            <div class="projects">
                ${P.projects.map(p => `
                <article class="glass project" data-reveal>
                    <h3 class="chrome-type">${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="project__result">${e(p.result)}</p>
                    <ul class="chips" aria-label="Built with">${p.tags.map(t => `<li>${e(t)}</li>`).join('')}</ul>
                    <a class="pill pill--glass pill--small" href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="chrome-type title" data-reveal>Skills</h2>
            <div class="skills">
                ${P.skills.map(g => `
                <div class="skillset" data-reveal>
                    <h3>${e(g.group)}</h3>
                    <ul class="chips chips--chrome">${g.items.map(s => `<li>${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="skillset" data-reveal>
                    <h3>Education</h3>
                    <p class="edu">${e(P.education.degree)}<br>${e(P.education.school)}<br><span>${e(P.education.years)}</span></p>
                </div>
            </div>
        </section>

        <section id="contact" class="contact" aria-labelledby="contact-title">
            <svg class="drips" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
                <g filter="url(#liquid)" fill="url(#chrome)">
                    <rect x="-40" y="-60" width="1280" height="90"/>
                    ${[90, 250, 420, 610, 780, 960, 1120].map((x, i) => `<ellipse class="drip" style="--i:${i}" cx="${x}" cy="40" rx="${26 + (i % 3) * 8}" ry="34"/>`).join('')}
                </g>
            </svg>
            <h2 id="contact-title" class="contact__line" data-reveal>${e(P.contactLine)}</h2>
            <a class="chrome-type contact__email" href="mailto:${e(P.email)}" data-reveal>${e(P.email)}</a>
            <ul class="contact__links" data-reveal>
                <li><a class="pill pill--glass pill--small" href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                ${P.social.map(s => `<li><a class="pill pill--glass pill--small" href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
            </ul>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
        <a href="#top">Back to top</a>
    </footer>`;

    /* Mercury: drops orbit and merge; one follows the pointer; scroll spreads them */
    const drops = Array.from(document.querySelectorAll('.drop'));
    const svg = document.querySelector('.mercury');
    const seeds = drops.map(function (_, i) {
        return { a: i * 0.9, r: 90 + (i % 3) * 55, s: 0.25 + (i % 4) * 0.08, size: 48 + (i % 3) * 22 };
    });
    const pointer = { x: 520, y: 330, tx: 520, ty: 330 };
    let spread = 0;

    if (svg) {
        svg.addEventListener('pointermove', function (ev) {
            const r = svg.getBoundingClientRect();
            pointer.tx = (ev.clientX - r.left) / r.width * 800;
            pointer.ty = (ev.clientY - r.top) / r.height * 700;
        });
        svg.addEventListener('pointerleave', function () { pointer.tx = 520; pointer.ty = 330; });
    }

    function frame(t) {
        const time = t / 1000;
        pointer.x += (pointer.tx - pointer.x) * 0.08;
        pointer.y += (pointer.ty - pointer.y) * 0.08;
        drops.forEach(function (d, i) {
            const s = seeds[i];
            if (i === 0) {
                d.setAttribute('cx', pointer.x.toFixed(1));
                d.setAttribute('cy', pointer.y.toFixed(1));
                d.setAttribute('r', 70);
                return;
            }
            const ang = s.a + time * s.s * (i % 2 ? 1 : -1);
            const rad = s.r * (1 + spread * 1.6) + Math.sin(time * 1.3 + i) * 18;
            d.setAttribute('cx', (520 + Math.cos(ang) * rad * 1.25).toFixed(1));
            d.setAttribute('cy', (330 + Math.sin(ang) * rad * .8).toFixed(1));
            d.setAttribute('r', (s.size + Math.sin(time * 2 + i * 1.7) * 8).toFixed(1));
        });
        if (!Kit.reduced) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

    Kit.onScroll(function () {
        const hero = document.querySelector('.hero');
        const r = hero.getBoundingClientRect();
        spread = Math.min(1, Math.max(0, -r.top / r.height));
    });

    Kit.reveal({ stagger: 90 });
    Kit.loaded(100);
    Kit.switcher('liquid-chrome');
})();
