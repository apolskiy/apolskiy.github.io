# apolskiy.github.io Personal Portfolio Website
#Aleksandr Polskiy

A hand-written personal portfolio site: semantic HTML5, CSS3, and vanilla ES6+ JavaScript, with no framework, no runtime dependency, and no build step. The sources in this repository are served to visitors exactly as committed.

The site doubles as the live target application for an end-to-end regression suite - see [PlaywrightAPWebsiteAutomation](https://github.com/apolskiy/PlaywrightAPWebsiteAutomation).

**Live Website:** [https://apolskiy.github.io](https://apolskiy.github.io)

---

## Features

- **Single-Page Tab Navigation:** `js/apolskiybiz.js` swaps `data-tab` panels in place by toggling an `active` class - no page reloads, no router library, no framework. Six tabs: Home (identity and skills), Engineering Outcomes (cross-project results), then one per project.
- **Cross-Tab Citations:** Each row of the Engineering Outcomes table cites the project it can be verified against, and the citation opens that project's tab rather than leaving the site. These controls carry a button role instead of being anchors: an anchor here must resolve to an absolute `https`/`mailto` target or to another page of this site, and a bare same-page fragment is neither.
- **Anti-Scraping Link Obfuscation:** Every outbound URL and the contact address ship as base64 payloads (`data-h` / `data-e`) inside `span.enc-link` placeholders and are decoded into real anchors on `DOMContentLoaded`, so a scraper reading the raw markup finds no addresses. Links marked `data-nw` open in a new tab, hardened with `rel="noopener noreferrer"`. A `<noscript>` LinkedIn fallback keeps contact reachable without JavaScript.
- **Responsive Layout:** A Flexbox tab strip plus a single `max-width: 600px` breakpoint that wraps the navigation onto multiple rows, stacks the profile header, and drops the column headers from the skills matrix. Verified free of horizontal overflow at 320px, 390px, and 600px.
- **Measured Impact, Not Adjectives:** The Engineering Outcomes tab opens with counted figures from the automation pipeline's complete run history, and links to a standalone [case study](case-study.html) covering what was changed and what the numbers were.
- **Zero Dependencies:** One stylesheet and one script drive the whole page. No bundler output, no CDN fetches, no third-party runtime.
- **Continuously Verified:** Each push runs the GitHub Pages `pages-build-deployment` job. A push that touches `.html`, `.css`, or `.js` additionally fires a `website_updated` `repository_dispatch` at the automation repository, so the deployed page is re-validated end to end automatically. Documentation-only commits do not spend a pipeline run.

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
├── .github/
│   └── workflows/
│       └── notify_automation.yml   # Fires website_updated at the E2E suite
├── css/
│   └── apolskiybiz.css      # Site stylesheet, including the mobile media query
├── js/
│   └── apolskiybiz.js       # Tab routing + base64 link/e-mail decoding
├── images/
│   └── aleksandr-polskiy.jpg
├── index.html               # The site: profile header + six content tabs
├── case-study.html          # Standalone write-up, linked from Engineering Outcomes
├── 404.html                 # Self-contained, inline-styled
├── favicon.ico, icon.png, icon.svg, site.webmanifest
├── robots.txt               # Crawling allowed
├── LICENSE                  # MIT
└── README.md
```

Every tracked file is either served to a visitor or required by GitHub Pages. The HTML5 Boilerplate scaffolding this project started from - `package.json`, three webpack configs, an empty `js/app.js`, empty `img/` and `js/vendor/` directories, an unreferenced `style.css`, and the upstream `LICENSE.txt` - has been removed: **GitHub Pages serves this repository directly and nothing is built**, so a build config that emitted a broken `dist/` was a trap rather than a deployment path.

---

## Automation Hand-Off

`.github/workflows/notify_automation.yml` notifies [PlaywrightAPWebsiteAutomation](https://github.com/apolskiy/PlaywrightAPWebsiteAutomation) that the live site changed. It runs only on pushes to `main` that touch `**.html`, `**.css`, or `**.js`, so README, LICENSE, and workflow edits never trigger a test run.

**Required secret.** The built-in `GITHUB_TOKEN` is scoped to this repository and cannot dispatch into another one, so the workflow needs a Personal Access Token stored here as `AUTOMATION_DISPATCH_TOKEN`:

- **Fine-grained PAT** - resource owner `apolskiy`, repository access limited to `PlaywrightAPWebsiteAutomation`, permission **Contents: Read and write** (the scope `POST /dispatches` checks).
- **Classic PAT** - the `repo` scope.

Add it under *Settings → Secrets and variables → Actions → New repository secret*. Without it the workflow fails loudly rather than deploying untested; a silent failure would leave a stale green badge on a page nothing verified.

The dispatch races the Pages deployment, and that is intentional: the automation pipeline gates itself, waiting until this repository reports no in-flight Actions run and the served `ETag` has settled before it launches a browser.

---

## Local Development

No toolchain required. Open `index.html` in a browser, or serve the directory so that root-relative paths resolve the way they do in production:

```bash
python -m http.server 8000     # then open http://localhost:8000
```

To point the E2E suite at a local copy instead of the live site, set `BASE_URL` in that project's `.env`.
