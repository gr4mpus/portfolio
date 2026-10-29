/* ===================================================================
 * Portfolio content shared by every design study.
 * Each design renders this into its own markup, so copy stays identical
 * across all of them. Paths are relative to designs/<slug>/.
 * ------------------------------------------------------------------- */

window.PORTFOLIO = {
    name: 'Rahul Prasad',
    first: 'Rahul',
    last: 'Prasad',
    initials: 'RP',
    role: 'Senior frontend engineer',
    location: 'Pune, India',
    lede: 'I architect and ship React, Next.js and TypeScript platforms: micro-frontends, design systems and the APIs behind them. For seven years that work has served enterprise HR tools, global brand sites and consumer banking.',
    email: 'hello@rahulprasad.co.in',
    phone: '+91 95605 20021',
    phoneHref: 'tel:+919560520021',
    cv: '../../Rahul_Prasad_Resume.pdf',
    photo: '../../images/rahul-photo.jpg',
    photoAlt: 'Rahul standing by a fence at sunset, a lake and hills behind him',
    photoAlt2: 'Rahul standing in a snowfield with pine trees and mountains behind him',
    photo2: '../../images/rahul-photo-neo.jpg',
    contactLine: 'Hiring for a frontend or platform role, or have a product to build? I\'d like to hear about it.',

    facts: [
        { label: 'Experience', value: '7 years', short: '7', unit: 'years' },
        { label: 'Now', value: 'Kaiser Permanente', short: 'KP', unit: 'since 2025' },
        { label: 'Platforms used by', value: '120,000+ people', short: '120k+', unit: 'people' }
    ],

    social: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/grampus/' },
        { label: 'GitHub', href: 'https://github.com/gr4mpus' },
        { label: 'Instagram', href: 'https://www.instagram.com/gr4mpus/' }
    ],

    jobs: [
        {
            company: 'Kaiser Permanente',
            role: 'Senior Frontend Engineer',
            when: 'Jul 2025 to present',
            start: '2025',
            end: 'Now',
            place: 'Pune',
            context: 'Enterprise HR and compensation platform used by more than 120,000 employees.',
            wins: [
                {
                    title: 'Micro-frontend re-architecture',
                    text: 'Moved a legacy Angular and jQuery approvals platform, handling 12,000+ approvals a month, to React, Next.js and TypeScript micro-frontends with Module Federation. Three teams now deploy independently, and two sibling teams adopted the shared component library.',
                    result: 'Bundle 30% smaller, WCAG 2.1 AA, Lighthouse 90+'
                },
                {
                    title: 'Wage Estimator, built from zero',
                    text: 'Owned the whole cycle alone, from VP requirements to release: a Redux Toolkit rule engine covering 8 unions, 140+ job codes and 8 regional markets, plus a superuser view for live scenario testing.',
                    result: '30,000+ employees use it, support tickets down 67%'
                },
                {
                    title: 'No-code policy configurator',
                    text: 'A drag-and-drop JSON schema editor with large data grids, bulk uploads and multi-step approvals. 25+ authors use it to manage 180+ nested policies across 400+ pages.',
                    result: 'Setup time from 1 week to 30 minutes, zero defects after launch'
                },
                {
                    title: 'Backend-for-frontend layer',
                    text: 'Co-designed Next.js API routes that merge 4 to 6 microservice calls into one normalized payload per page, covered by unit, integration and end-to-end tests of real user flows.',
                    result: 'Average API latency from 480 ms to 310 ms'
                },
                {
                    title: 'Personalization and release pipeline',
                    text: 'Co-built a 20+ attribute personalization engine with role-restricted impersonation, retiring 35+ QA accounts, and a Docker and Kubernetes pipeline that replaced manual releases.',
                    result: '1 deploy a week to 12+, visibility complaints down 78%'
                }
            ]
        },
        {
            company: 'Publicis Sapient',
            role: 'Senior Associate, Frontend Engineering',
            when: 'Oct 2021 to Jul 2025',
            start: '2021',
            end: '2025',
            place: 'Gurugram',
            context: 'Global brand platform in 14 languages across 15+ countries, with 120+ inquiry forms.',
            wins: [
                {
                    title: 'Form recovery that multiplied conversions',
                    text: 'Consent-based state capture across 120+ multi-step forms, persisted through a REST API, so abandoned forms came back pre-filled. Measured over a 90-day before-and-after study.',
                    result: 'Form completion from 5% to 25%'
                },
                {
                    title: 'Design system and SPA migration',
                    text: 'Built React and TypeScript components in a 60-component design system that turned the site into a single-page app, with route-level code splitting and lazy loading. Mentored 4 junior engineers along the way.',
                    result: 'JavaScript bundle 32% smaller, page load from 4.1 s to 3.2 s'
                },
                {
                    title: 'Design-token compiler for 14 languages',
                    text: 'A Style Dictionary and Webpack pipeline that emits a dedicated CSS bundle per language instead of one monolithic file. It became the standard across the organization.',
                    result: 'Per-language CSS 40% smaller'
                },
                {
                    title: 'Accessibility across 80+ templates',
                    text: 'Fixed 240+ Axe and WAVE violations and wrote a shared accessibility library the whole team builds on.',
                    result: 'WCAG 2.1 AA compliance from 62% to 95%, screen-reader defects down 60%'
                },
                {
                    title: 'Testing as a merge gate',
                    text: 'Made Jest, React Testing Library and Cypress mandatory checks in Jenkins and Bitbucket, and instrumented 1.5M+ monthly events that drive personalized recommendations.',
                    result: 'Coverage from 45% to 75%, production bugs down 30%, recommendation CTR up 22%'
                }
            ]
        },
        {
            company: 'Tata Consultancy Services',
            role: 'Software Engineer, Frontend',
            when: 'Jul 2019 to Oct 2021',
            start: '2019',
            end: '2021',
            place: 'Gurugram',
            context: 'Consumer banking for Citibank North America, and network telemetry products.',
            wins: [
                {
                    title: 'Citi virtual account numbers',
                    text: 'Built 14 modular React and Next.js components for the credit card virtual account number flow, separating the API and state layer from the views and covering them with unit tests.',
                    result: 'Transaction processing time down 30%'
                },
                {
                    title: 'Live network dashboards for MWC 2020',
                    text: 'Reusable React and Chart.js components that turn high-volume network logs into interactive alarm tables and charts, without redundant API calls.',
                    result: 'Shown live to operators at Mobile World Congress 2020'
                }
            ]
        }
    ],

    projects: [
        {
            name: 'Harmony Editor',
            summary: 'A photo and video editor where you lasso any object and adjust just that part, with layered edits you can revisit any time.',
            result: '40+ filters, all processed on your device',
            tags: ['React 19', 'TypeScript', 'WebGL', 'MediaPipe', 'PWA'],
            href: 'https://harmony.rahulprasad.co.in/',
            link: 'Open Harmony Editor'
        },
        {
            name: 'Ehsaan Khata',
            summary: 'A mobile-first ledger where groups of friends record and approve favours, with balances that sync in real time.',
            result: '55+ active groups',
            tags: ['Next.js', 'TypeScript', 'Supabase', 'Google OAuth', 'Vercel'],
            href: 'https://ehsaankhata.com/',
            link: 'Visit ehsaankhata.com'
        },
        {
            name: 'Sensei Mods',
            summary: 'A direct-to-consumer store for custom PC cables, with a live configurator that previews colours, pins and layouts before checkout.',
            result: '150+ custom orders',
            tags: ['Angular 16', 'TypeScript', 'RxJS', 'Razorpay'],
            href: 'https://www.senseimods.com/',
            link: 'Visit senseimods.com'
        },
        {
            name: 'Insta Carousel',
            summary: 'An offline-first web app with an endless canvas for laying out Instagram carousels. Images and video are edited entirely in the browser.',
            result: 'Works fully offline',
            tags: ['React 19', 'TypeScript', 'FFmpeg WASM', 'IndexedDB', 'PWA'],
            href: 'https://gr4mpus.github.io/Insta-Carousel/',
            link: 'Open Insta Carousel'
        }
    ],

    skills: [
        { group: 'Architecture', items: ['React', 'Next.js', 'Micro-frontends', 'Module Federation', 'Redux Toolkit', 'Design systems', 'Design tokens', 'Angular', 'RxJS'] },
        { group: 'Languages and standards', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS and SCSS', 'WCAG 2.1 AA', 'Browser APIs'] },
        { group: 'APIs and data', items: ['Node.js', 'Backend for frontend', 'REST', 'Supabase', 'PostgreSQL', 'Data grids'] },
        { group: 'Performance', items: ['Core Web Vitals', 'Code splitting', 'Lazy loading', 'Bundle analysis', 'Event telemetry'] },
        { group: 'Testing and delivery', items: ['Jest', 'React Testing Library', 'Cypress', 'TDD', 'Docker', 'Kubernetes', 'Jenkins', 'Claude, Copilot and MCP'] }
    ],

    education: {
        degree: 'B.Tech in Computer Science and Engineering',
        school: 'Guru Gobind Singh Indraprastha University, New Delhi',
        years: '2015 to 2019'
    }
};
