# apolskiy.github.io Personal Portfolio Website
#Aleksandr Polskiy

A hand-written personal portfolio site: semantic HTML5, CSS3, and vanilla ES6+ JavaScript, with no framework, no runtime dependency, and no build step. The sources in this repository are served to visitors exactly as committed.

The site doubles as the live target application for an end-to-end regression suite - see [PlaywrightAPWebsiteAutomation](https://github.com/apolskiy/PlaywrightAPWebsiteAutomation).

**Live Website:** [https://apolskiy.github.io](https://apolskiy.github.io)

---

## Features

- **Single-Page Tab Navigation:** `js/apolskiybiz.js` swaps `data-tab` panels in place by toggling an `active` class - no page reloads, no router library, no framework.
- **Anti-Scraping Link Obfuscation:** Every outbound URL and the contact address ship as base64 payloads (`data-h` / `data-e`) inside `span.enc-link` placeholders and are decoded into real anchors on `DOMContentLoaded`, so a scraper reading the raw markup finds no addresses. Links marked `data-nw` open in a new tab, hardened with `rel="noopener noreferrer"`. A `<noscript>` LinkedIn fallback keeps contact reachable without JavaScript.
- **Responsive Layout:** A Flexbox tab strip plus a single `max-width: 600px` breakpoint that wraps the navigation onto multiple rows, stacks the profile header, and drops the column headers from the skills matrix. Verified free of horizontal overflow at 320px, 390px, and 600px.
- **Zero Dependencies:** One stylesheet and one script drive the whole page. No bundler output, no CDN fetches, no third-party runtime.
- **Continuously Verified:** Each push runs the GitHub Pages `pages-build-deployment` job; the deployed page is then re-validated end to end by the Playwright suite, which waits for CDN propagation before asserting.

---

## Tech Stack

- **Markup & Styling:** HTML5, CSS3 (Flexbox for the tab strip, a `max-width: 600px` media query for mobile; page layout uses semantic tables marked `role="presentation"` where they are presentational)
- **Scripting:** Vanilla JavaScript (ES6+, DOM manipulation, base64 decoding) - no modules, no transpilation
- **IDE & Development:** WebStorm
- **Hosting & Deployment:** GitHub Pages, served directly from `main`
- **Version Control:** Git
- **Quality:** Playwright + Pytest E2E suite (external repository)

---

## Browser Support

Exercised on **Chromium** and **Firefox (Gecko)** by the automated suite; CI runs Chromium. WebKit is expected to work - the page uses no engine-specific features - but is not covered by an automated check.

---

## Project Structure

```text
apolskiy.github.io/
├── css/
│   ├── apolskiybiz.css      # Site stylesheet, including the mobile media query
│   └── style.css            # Boilerplate base styles
├── js/
│   ├── apolskiybiz.js       # Tab routing + base64 link/e-mail decoding
│   ├── app.js               # Empty; webpack entry point, unused
│   └── vendor/              # Empty
├── images/
│   └── aleksandr-polskiy.jpg
├── img/                     # Empty
├── index.html               # The site: profile header + five content tabs
├── 404.html
├── favicon.ico, icon.png, icon.svg, site.webmanifest
├── robots.txt               # Crawling allowed
├── LICENSE
└── README.md
```

### A note on the webpack files

`package.json`, `webpack.common.js`, `webpack.config.dev.js`, and `webpack.config.prod.js` are unused scaffolding left from an HTML5 Boilerplate starter. **GitHub Pages serves this repository directly; nothing is built.** The config is also stale - its entry point is the empty `js/app.js`, and it copies `img/` and `js/vendor/` while never referencing `js/apolskiybiz.js` or `images/` - so `npm run build` would emit a broken `dist/`. Treat these files as removable rather than as the deployment path.

---

## Local Development

No toolchain required. Open `index.html` in a browser, or serve the directory so that root-relative paths resolve the way they do in production:

```bash
python -m http.server 8000     # then open http://localhost:8000
```

To point the E2E suite at a local copy instead of the live site, set `BASE_URL` in that project's `.env`.
