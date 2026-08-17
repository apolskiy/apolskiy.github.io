# apolskiy.github.io Personal Portfolio Website
#Aleksandr Polskiy

A hand-written personal portfolio site: semantic HTML5, CSS3, and vanilla ES6+ JavaScript, with no framework, no runtime dependency, and no build step. The sources in this repository are served to visitors exactly as committed.

The site doubles as the live target application for an end-to-end regression suite - see [PlaywrightAPWebsiteAutomation](https://github.com/apolskiy/PlaywrightAPWebsiteAutomation).

**Live Website:** [https://apolskiy.github.io](https://apolskiy.github.io)

> **Documentation status:** describes **v1.7.0**, reviewed 2026-08-16.
> Each section below carries the release and date its content last changed, so a
> reader arriving at a later version can see at a glance which parts moved. This
> file always describes the *current* site; release-to-release history lives in
> [CHANGELOG.md](CHANGELOG.md).

---

## Features

<sub>v1.1.1 &middot; 2026-08-10</sub>

- **Single-Page Tab Navigation:** `js/apolskiybiz.js` swaps `data-tab` panels in place by toggling an `active` class - no page reloads, no router library, no framework. Eight tabs: Home (identity and skills), Engineering Outcomes (cross-project results), then one per project - AI Assisted Rest API, Portfolio Website, Web Automation, HTTP Emulators, VM Cluster Deployment, and Test Insights. The router binds by `data-tab` rather than by an enumerated list, so a tab is published by adding a nav item and a panel; nothing in the script changes.
- **Cross-Tab Citations:** Each row of the Engineering Outcomes table cites the project it can be verified against, and the citation opens that project's tab rather than leaving the site. These controls carry a button role instead of being anchors: an anchor here must resolve to an absolute `https`/`mailto` target or to another page of this site, and a bare same-page fragment is neither.
- **Anti-Scraping Link Obfuscation:** Every outbound URL and the contact address ship as base64 payloads (`data-h` / `data-e`) inside `span.enc-link` placeholders and are decoded into real anchors on `DOMContentLoaded`, so a scraper that fetches the HTML without executing it finds no addresses. Links marked `data-nw` open in a new tab, hardened with `rel="noopener noreferrer"`. A `<noscript>` LinkedIn fallback keeps contact reachable without JavaScript.

  **What this does and does not protect against.** It is obfuscation, not encryption, and the distinction is worth stating rather than leaving a reader to infer a guarantee that is not there. It defeats scrapers that fetch HTML without running JavaScript, which is most of them, and that is the whole of the benefit. It defeats nothing else. Once the decoder has run, the contact address is a real `mailto:` anchor in the DOM: the browser shows it in the status bar on hover, right-click offers to copy it, and devtools displays it outright. Base64 is an encoding rather than a cipher, so a scraper that simply decodes `data-` attributes reads the address without executing anything at all. And any headless browser defeats the mechanism completely - demonstrated in this repository's own automation, whose crawler renders each page in a real browser *precisely because* an HTTP-only crawler would discover none of these links.

  Keeping the address in a working anchor is the deliberate trade. Constructing it at click time would keep it out of the DOM, at the cost of the reader's ability to copy or middle-click it, and against an adversary who can defeat the measure with commodity tooling regardless. A portfolio exists to be contacted. Note also that the same encoding applied to the GitHub, LinkedIn and Docker Hub links buys no anti-spam value whatever - those URLs are meant to be found; they share the mechanism only because it is applied uniformly.
- **Responsive Layout:** A Flexbox tab strip plus a single `max-width: 600px` breakpoint that wraps the navigation onto multiple rows, stacks the profile header, and drops the column headers from the skills matrix. Verified free of horizontal overflow at 320px, 390px, and 600px.
- **Measured Impact, Not Adjectives:** The Engineering Outcomes tab opens with counted figures from the automation pipeline's complete run history, and links to a standalone [case study](case-study.html) covering what was changed and what the numbers were.
- **Zero Dependencies:** One stylesheet and one script drive the whole page. No bundler output, no CDN fetches, no third-party runtime.
- **Continuously Verified:** Each push runs the GitHub Pages `pages-build-deployment` job. A push that touches `.html`, `.css`, or `.js` additionally fires a `website_updated` `repository_dispatch` at the automation repository, so the deployed page is re-validated end to end automatically. Documentation-only commits do not spend a pipeline run.

---

## Tech Stack

<sub>v1.0.0 &middot; 2026-08-10</sub>

- **Markup & Styling:** HTML5, CSS3 (Flexbox for the tab strip, a `max-width: 600px` media query for mobile; page layout uses semantic tables marked `role="presentation"` where they are presentational)
- **Scripting:** Vanilla JavaScript (ES6+, DOM manipulation, base64 decoding) - no modules, no transpilation
- **IDE & Development:** WebStorm
- **Hosting & Deployment:** GitHub Pages, served directly from `main`
- **Version Control:** Git
- **Quality:** Playwright + Pytest E2E suite (external repository)

---

## Browser Support

<sub>v1.3.1 &middot; 2026-08-12</sub>

Exercised on **Chromium**, **Firefox (Gecko)** and **WebKit** by the automated suite, all three passing its 72 deployment-path tests as of 2026-08-12. CI runs Chromium only, so the other two are a verified state rather than a continuously enforced one, and a regression specific to either would not be caught by the pipeline.

Note what the WebKit result does and does not mean: Playwright ships a build of the WebKit engine, not Safari. It shares the renderer, not Safari's platform integration, so a pass here is evidence the page's layout and scripting are engine-neutral - not a substitute for testing on Safari itself.

---

## Project Structure

<sub>v1.0.0 &middot; 2026-08-10</sub>

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
├── index.html               # The site: profile header + seven content tabs
├── case-study.html          # Standalone write-up, linked from Engineering Outcomes
├── 404.html                 # Self-contained, inline-styled
├── favicon.ico, icon.png, icon.svg, site.webmanifest
├── robots.txt               # Crawling allowed
├── .editorconfig            # Shared indentation and newline settings
├── .gitattributes           # Line-ending normalization
├── .gitignore
├── CHANGELOG.md             # Release-to-release history; this file holds only the present
├── LICENSE                  # MIT
└── README.md
```

Every tracked file is either served to a visitor, required by GitHub Pages, or one of the four repository-hygiene files listed at the bottom. The HTML5 Boilerplate scaffolding this project started from - `package.json`, three webpack configs, an empty `js/app.js`, empty `img/` and `js/vendor/` directories, an unreferenced `style.css`, and the upstream `LICENSE.txt` - has been removed: **GitHub Pages serves this repository directly and nothing is built**, so a build config that emitted a broken `dist/` was a trap rather than a deployment path.

---

## Automation Hand-Off

<sub>v1.3.0 &middot; 2026-08-12</sub>

`.github/workflows/notify_automation.yml` notifies [PlaywrightAPWebsiteAutomation](https://github.com/apolskiy/PlaywrightAPWebsiteAutomation) that the live site changed. It runs on pushes to `main` that touch `**.html`, `**.css`, or `**.js`, so README, LICENSE, and workflow edits never trigger a test run.

It also accepts a **manual run** (*Actions → Notify Automation Suite → Run workflow*), with an optional one-line reason recorded in the run log. The path filter is deliberately narrow, and that leaves legitimate reasons to re-validate with no way to say so: a deploy that raced its own dispatch, a suite fixed after a red run, a documentation commit that turned out to touch the page after all. Without a button the only route was to invent a change to an `.html` file and push it, which puts a fabricated commit in the history of the very thing under test - a bad trade.

Dispatching from here is not the same as dispatching the suite from its own repository, and both are worth keeping. Running it there tests the site. Running it here tests the site *and* the notification path - the PAT, its scope, its expiry - which is otherwise exercised only by a real deploy, and so is otherwise only ever found to be broken at the moment it was needed.

**Required secret.** The built-in `GITHUB_TOKEN` is scoped to this repository and cannot dispatch into another one, so the workflow needs a Personal Access Token stored here as `AUTOMATION_DISPATCH_TOKEN`:

- **Fine-grained PAT** - resource owner `apolskiy`, repository access limited to `PlaywrightAPWebsiteAutomation`, permission **Contents: Read and write** (the scope `POST /dispatches` checks).
- **Classic PAT** - the `repo` scope.

Add it under *Settings → Secrets and variables → Actions → New repository secret*. Without it the workflow fails loudly rather than deploying untested; a silent failure would leave a stale green badge on a page nothing verified.

The dispatch races the Pages deployment, and that is intentional: the automation pipeline gates itself, waiting until this repository reports no in-flight Actions run and the served `ETag` has settled before it launches a browser.

---

## Local Development

<sub>v1.0.0 &middot; 2026-08-10</sub>

No toolchain required. Open `index.html` in a browser, or serve the directory so that root-relative paths resolve the way they do in production:

```bash
python -m http.server 8000     # then open http://localhost:8000
```

To point the E2E suite at a local copy instead of the live site, set `BASE_URL` in that project's `.env`.
