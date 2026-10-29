/* Psychedelic: a 1960s concert poster */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    const defs = `
    <svg class="defs" width="0" height="0" aria-hidden="true">
        <defs>
            <filter id="melt" x="-10%" y="-20%" width="120%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="3" result="noise">
                    ${Kit.reduced ? '' : '<animate attributeName="baseFrequency" dur="14s" values="0.012 0.03;0.02 0.045;0.012 0.03" repeatCount="indefinite"/>'}
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            <filter id="poster" color-interpolation-filters="sRGB">
                <feColorMatrix type="saturate" values="0"/>
                <feComponentTransfer>
                    <feFuncR type="discrete" tableValues="0.23 0.89 1 1"/>
                    <feFuncG type="discrete" tableValues="0.04 0.09 0.42 0.95"/>
                    <feFuncB type="discrete" tableValues="0.34 0.49 0.07 0.84"/>
                </feComponentTransfer>
            </filter>
            <linearGradient id="stripe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#ffde3b"/>
                <stop offset=".33" stop-color="#ffde3b"/>
                <stop offset=".33" stop-color="#ff6a13"/>
                <stop offset=".66" stop-color="#ff6a13"/>
                <stop offset=".66" stop-color="#e2177c"/>
                <stop offset="1" stop-color="#e2177c"/>
            </linearGradient>
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
            <h1 id="hero-name" class="visually-hidden">${e(P.name)}</h1>
            <svg class="hero__name" viewBox="0 0 900 360" aria-hidden="true" data-load>
                <g filter="url(#melt)">
                    <text x="450" y="160" text-anchor="middle" class="nm nm--shadow">${e(P.first)}</text>
                    <text x="450" y="160" text-anchor="middle" class="nm">${e(P.first)}</text>
                    <text x="450" y="320" text-anchor="middle" class="nm nm--shadow">${e(P.last)}</text>
                    <text x="450" y="320" text-anchor="middle" class="nm">${e(P.last)}</text>
                </g>
            </svg>

            <div class="hero__row">
                <figure class="sun" data-load>
                    <span class="sun__rays" aria-hidden="true"></span>
                    <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                </figure>
                <div class="panel hero__panel" data-load>
                    <p class="hero__role">${e(P.role)} in ${e(P.location)}</p>
                    <p class="hero__lede">${e(P.lede)}</p>
                    <div class="hero__actions">
                        <a class="btn btn--hot" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                        <a class="btn" href="mailto:${e(P.email)}">Email me</a>
                    </div>
                    <dl class="facts">
                        ${P.facts.map(f => `<div><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}
                    </dl>
                </div>
            </div>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <h2 id="work-title" class="title" data-reveal>Experience</h2>
            ${P.jobs.map((j, ji) => `
            <article class="panel job job--${ji + 1}" data-reveal>
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
                    <li class="win">
                        <h4>${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="win__result">${e(w.result)}</p>
                    </li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="title" data-reveal>Projects</h2>
            <div class="projects">
                ${P.projects.map((p, i) => `
                <article class="panel project project--${i + 1}" data-reveal>
                    <h3>${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="project__result">${e(p.result)}</p>
                    <ul class="chips" aria-label="Built with">${p.tags.map(t => `<li>${e(t)}</li>`).join('')}</ul>
                    <a class="btn btn--small" href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="title" data-reveal>Skills</h2>
            <div class="panel skills" data-reveal>
                ${P.skills.map(g => `
                <div class="skillset">
                    <h3>${e(g.group)}</h3>
                    <ul class="chips">${g.items.map(s => `<li>${e(s)}</li>`).join('')}</ul>
                </div>`).join('')}
                <div class="skillset">
                    <h3>Education</h3>
                    <p>${e(P.education.degree)}, ${e(P.education.school)}, ${e(P.education.years)}</p>
                </div>
            </div>
        </section>

        <section id="contact" class="section contact" aria-labelledby="contact-title">
            <div class="panel contact__panel" data-reveal>
                <h2 id="contact-title" class="contact__line">${e(P.contactLine)}</h2>
                <a class="contact__email" href="mailto:${e(P.email)}">${e(P.email)}</a>
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

    /* Liquid-light plasma: low-resolution sine field, banded into poster colours.
       Scrolling pushes the phase forward, so the light show swirls with the reader. */
    const canvas = document.querySelector('.plasma');
    const ctx = canvas.getContext('2d');
    const W = 200, H = 130;
    canvas.width = W;
    canvas.height = H;
    const img = ctx.createImageData(W, H);
    const palette = [
        [59, 10, 87], [226, 23, 124], [255, 106, 19], [255, 222, 59], [24, 194, 192], [120, 30, 150]
    ];
    let phase = 0;
    let lastY = scrollY;
    let push = 0;

    function draw(t) {
        const time = t / 1000 * .18 + phase;
        let i = 0;
        for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
                const nx = x / W, ny = y / H;
                const cx = nx - .5, cy = ny - .4;
                const v = Math.sin(nx * 7 + time) +
                    Math.sin((ny * 5 + time) * 1.3) +
                    Math.sin((nx * 4 + ny * 6 + time * 1.7)) +
                    Math.sin(Math.sqrt(cx * cx * 90 + cy * cy * 90) * 3 - time * 2.2);
                const band = Math.floor((v + 4) * 1.6) % palette.length;
                const c = palette[(band + palette.length) % palette.length];
                img.data[i++] = c[0];
                img.data[i++] = c[1];
                img.data[i++] = c[2];
                img.data[i++] = 255;
            }
        }
        ctx.putImageData(img, 0, 0);
    }

    function loop(t) {
        push *= .92;
        phase += push;
        draw(t);
        requestAnimationFrame(loop);
    }

    if (Kit.reduced) {
        draw(0);
    } else {
        requestAnimationFrame(loop);
        window.addEventListener('scroll', function () {
            const dy = scrollY - lastY;
            lastY = scrollY;
            push = Math.max(-.08, Math.min(.08, push + dy * .00025));
        }, { passive: true });
    }

    Kit.reveal({ stagger: 120 });
    Kit.loaded(100);
    Kit.switcher('psychedelic');
})();
