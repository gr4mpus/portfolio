/* Steampunk: engineer of the steam age */
(function () {
    "use strict";

    const P = window.PORTFOLIO;
    const e = Kit.esc;
    const app = document.getElementById('app');

    /* Gear path: n trapezoid teeth around a rim, with a hub hole and spoke cut-outs */
    function gearPath(teeth, outer, root, hole) {
        const pts = [];
        const step = (Math.PI * 2) / teeth;
        for (let i = 0; i < teeth; i++) {
            const a = i * step;
            const seq = [
                [root, a - step * .5],
                [root, a - step * .28],
                [outer, a - step * .17],
                [outer, a + step * .17],
                [root, a + step * .28]
            ];
            seq.forEach(function (p) {
                pts.push((p[0] * Math.cos(p[1])).toFixed(2) + ' ' + (p[0] * Math.sin(p[1])).toFixed(2));
            });
        }
        let d = 'M' + pts.join(' L') + ' Z';
        // hub hole
        d += ` M ${hole} 0 A ${hole} ${hole} 0 1 0 ${-hole} 0 A ${hole} ${hole} 0 1 0 ${hole} 0 Z`;
        // spoke windows
        const inner = root * .72, innerHub = hole * 2.1, windows = teeth > 14 ? 6 : 4;
        for (let w = 0; w < windows; w++) {
            const a0 = (w / windows) * Math.PI * 2 + .22, a1 = ((w + 1) / windows) * Math.PI * 2 - .22;
            const p = function (r, a) { return (r * Math.cos(a)).toFixed(2) + ' ' + (r * Math.sin(a)).toFixed(2); };
            d += ` M ${p(innerHub, a0)} L ${p(inner, a0)} A ${inner} ${inner} 0 0 1 ${p(inner, a1)} L ${p(innerHub, a1)} A ${innerHub} ${innerHub} 0 0 0 ${p(innerHub, a0)} Z`;
        }
        return d;
    }

    /* A gear element: teeth sets its speed so meshing gears turn in step */
    function gear(cls, teeth, size, dir, style) {
        const outer = 50, root = 50 - 100 / teeth * 1.1, hole = 7;
        return `<svg class="gear ${cls}" viewBox="-52 -52 104 104" style="--size:${size};${style || ''}" data-teeth="${teeth}" data-dir="${dir}" aria-hidden="true">
            <path d="${gearPath(teeth, outer, root, hole)}" fill="url(#brass)" fill-rule="evenodd" stroke="#3a240f" stroke-width="1.2"/>
            <circle r="${hole + 4}" fill="none" stroke="#6b4a1e" stroke-width="2"/>
        </svg>`;
    }

    /* A pressure gauge; value 0..1 sets where the needle settles */
    function gauge(label, value, reading) {
        const ticks = Array.from({ length: 11 }, (_, i) => {
            const a = (-135 + i * 27) * Math.PI / 180;
            const r1 = 38, r2 = i % 5 === 0 ? 30 : 33;
            return `<line x1="${(Math.sin(a) * r1).toFixed(1)}" y1="${(-Math.cos(a) * r1).toFixed(1)}" x2="${(Math.sin(a) * r2).toFixed(1)}" y2="${(-Math.cos(a) * r2).toFixed(1)}"/>`;
        }).join('');
        return `
        <div class="gauge" style="--v:${value}">
            <dt>${e(label)}</dt>
            <dd>
            <svg viewBox="-50 -50 100 100" aria-hidden="true">
                <circle r="48" fill="url(#brass)" stroke="#3a240f" stroke-width="1.5"/>
                <circle r="42" fill="#efe2c2" stroke="#6b4a1e" stroke-width="1.5"/>
                <g class="gauge__ticks" stroke="#2a1c10" stroke-width="1.4">${ticks}</g>
                <path d="${describeArc(0, 0, 36, 81, 135)}" fill="none" stroke="#a8322a" stroke-width="3"/>
                <g class="gauge__needle"><path d="M -2 4 L 0 -34 L 2 4 Z" fill="#2a1c10"/><circle r="4.5" fill="url(#brass)" stroke="#2a1c10"/></g>
            </svg>
            <span class="gauge__reading">${e(reading)}</span>
            </dd>
        </div>`;
    }

    function describeArc(x, y, r, start, end) {
        const s = polar(x, y, r, end), en = polar(x, y, r, start);
        return `M ${s.x} ${s.y} A ${r} ${r} 0 0 0 ${en.x} ${en.y}`;
    }

    function polar(cx, cy, r, deg) {
        const a = (deg - 90) * Math.PI / 180;
        return { x: (cx + r * Math.cos(a)).toFixed(2), y: (cy + r * Math.sin(a)).toFixed(2) };
    }

    const defs = `
    <svg class="defs" width="0" height="0" aria-hidden="true">
        <defs>
            <radialGradient id="brass" cx="35%" cy="30%" r="80%">
                <stop offset="0" stop-color="#f6dc9c"/>
                <stop offset=".35" stop-color="#c99a4a"/>
                <stop offset=".75" stop-color="#8a5e24"/>
                <stop offset="1" stop-color="#5a3a14"/>
            </radialGradient>
        </defs>
    </svg>`;

    const gaugeValues = [.7, .92, .84];

    app.innerHTML = `
    ${defs}
    <header class="bar">
        <a class="bar__plate" href="#top">${e(P.name)}</a>
        <nav aria-label="Sections">
            <a href="#work">Experience</a>
            <a href="#projects">Patents</a>
            <a href="#skills">Inventory</a>
            <a href="#contact">Telegraph</a>
        </nav>
    </header>

    <div class="clockwork" aria-hidden="true">
        ${gear('cw cw--1', 24, '9rem', 1)}
        ${gear('cw cw--2', 12, '4.6rem', -1)}
        ${gear('cw cw--3', 18, '6.8rem', -1)}
    </div>

    <main id="top">
        <section class="hero" aria-labelledby="hero-name">
            <div class="hero__machine" data-load>
                ${gear('hg hg--1', 30, '22rem', 1, 'left:-6%;top:-4%')}
                ${gear('hg hg--2', 16, '11.9rem', -1, 'left:62%;top:-2%')}
                ${gear('hg hg--3', 20, '14.9rem', -1, 'left:56%;top:58%')}
                ${gear('hg hg--4', 10, '7.6rem', 1, 'left:4%;top:70%')}
                <figure class="porthole">
                    <img src="${e(P.photo)}" alt="${e(P.photoAlt)}" width="800" height="1000">
                </figure>
                <div class="pipe" aria-hidden="true"><span class="steam s1"></span><span class="steam s2"></span><span class="steam s3"></span></div>
            </div>

            <div class="hero__text">
                <p class="hero__role" data-load>${e(P.role)}, ${e(P.location)}</p>
                <h1 id="hero-name" class="nameplate" data-load><span>${e(P.name)}</span></h1>
                <p class="hero__lede" data-load>${e(P.lede)}</p>
                <div class="hero__actions" data-load>
                    <a class="lever" href="${e(P.cv)}" target="_blank" rel="noopener">Download CV</a>
                    <a class="lever lever--copper" href="mailto:${e(P.email)}">Email me</a>
                </div>
                <dl class="gauges" data-load>
                    ${P.facts.map((f, i) => gauge(f.label, gaugeValues[i], f.value)).join('')}
                </dl>
            </div>
        </section>

        <section id="work" class="section" aria-labelledby="work-title">
            <h2 id="work-title" class="plate-title" data-reveal><span>Experience</span></h2>
            ${P.jobs.map((j, ji) => `
            <article class="document" data-reveal>
                <header class="document__head">
                    <p class="document__no">Entry ${['the First', 'the Second', 'the Third'][ji]}</p>
                    <h3>${e(j.company)}</h3>
                    <p class="document__role">${e(j.role)}</p>
                    <p class="document__when">${e(j.when)}, ${e(j.place)}</p>
                </header>
                <p class="document__context">${e(j.context)}</p>
                <ul class="wins">
                    ${j.wins.map(w => `
                    <li>
                        <h4>${e(w.title)}</h4>
                        <p>${e(w.text)}</p>
                        <p class="wins__result">${e(w.result)}</p>
                    </li>`).join('')}
                </ul>
            </article>`).join('')}
        </section>

        <section id="projects" class="section" aria-labelledby="projects-title">
            <h2 id="projects-title" class="plate-title" data-reveal><span>Patents</span></h2>
            <div class="patents">
                ${P.projects.map((p, i) => `
                <article class="patent" data-reveal>
                    <p class="patent__no">Patent No. ${String(i + 1).padStart(3, '0')}</p>
                    <h3>${e(p.name)}</h3>
                    <p>${e(p.summary)}</p>
                    <p class="patent__result">${e(p.result)}</p>
                    <p class="patent__mats"><i>Materials:</i> ${p.tags.map(e).join(', ')}</p>
                    <a href="${e(p.href)}" target="_blank" rel="noopener">${e(p.link)}</a>
                    <span class="seal" aria-hidden="true">RP</span>
                </article>`).join('')}
            </div>
        </section>

        <section id="skills" class="section" aria-labelledby="skills-title">
            <h2 id="skills-title" class="plate-title" data-reveal><span>Inventory</span></h2>
            <div class="inventory document" data-reveal>
                ${P.skills.map(g => `
                <div class="inv">
                    <h3>${e(g.group)}</h3>
                    <ul>${g.items.map(s => `<li><span>${e(s)}</span></li>`).join('')}</ul>
                </div>`).join('')}
                <div class="inv">
                    <h3>Education</h3>
                    <p>${e(P.education.degree)}<br>${e(P.education.school)}<br><i>${e(P.education.years)}</i></p>
                </div>
            </div>
        </section>

        <section id="contact" class="section contact" aria-labelledby="contact-title">
            <div class="telegraph" data-reveal>
                <span class="rivets" aria-hidden="true"></span>
                <h2 id="contact-title" class="telegraph__line">${e(P.contactLine)}</h2>
                <a class="telegraph__email" href="mailto:${e(P.email)}">${e(P.email)}</a>
                <ul class="telegraph__links">
                    <li><a class="lever lever--small" href="${e(P.phoneHref)}">${e(P.phone)}</a></li>
                    ${P.social.map(s => `<li><a class="lever lever--small lever--copper" href="${e(s.href)}" target="_blank" rel="noopener">${e(s.label)}</a></li>`).join('')}
                </ul>
            </div>
        </section>
    </main>

    <footer class="foot">
        <p>&copy; ${new Date().getFullYear()} ${e(P.name)}</p>
        <a href="#top">Back to top</a>
    </footer>`;

    /* Gears turn with scroll. Angular speed is inversely proportional to tooth
       count, so neighbouring gears mesh; a slow idle keeps the clockwork alive. */
    const gears = Array.from(document.querySelectorAll('.gear'));
    let idle = 0;
    let base = 0;

    function turn() {
        const t = base + idle;
        gears.forEach(function (g) {
            const teeth = +g.dataset.teeth, dir = +g.dataset.dir;
            g.style.transform = 'rotate(' + (t * dir * 24 / teeth).toFixed(2) + 'deg)';
        });
    }

    Kit.onScroll(function (_, y) { base = y * .35; turn(); });

    if (!Kit.reduced) {
        (function loop() {
            idle += .12;
            turn();
            requestAnimationFrame(loop);
        })();
    }

    Kit.reveal({ stagger: 110 });
    Kit.loaded(120);
    Kit.switcher('steampunk');
})();
