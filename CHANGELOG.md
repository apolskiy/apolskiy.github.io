# Changelog

All notable changes to this site are recorded here. `README.md` always describes
the **current** site and nothing else; this file is where release-to-release
history lives, so the README never accumulates a sediment of "as of version X"
qualifiers.

Each README section carries the release and date its content last changed
(`<sub>v1.0.0 &middot; 2026-08-10</sub>`). Together the two answer different
questions: the stamp tells a reader arriving at a later version *which sections
moved*, and an entry here tells them *what changed and why*. A changelog entry
alone does not tell you where to look.

Versions follow [Semantic Versioning](https://semver.org/) as applied to a
published site:

- **Major** - a change to the site's structure or URLs that an existing link or
  an external test would no longer resolve against.
- **Minor** - new content: a tab, a page, a section.
- **Patch** - copy edits, styling fixes, and corrections that move no structure.

Dates are **UTC**, matching git commit dates and CI runners, so a stamp written
in the evening in one timezone still agrees with the commit that carries it.

---

## v1.1.2 - 2026-08-10

### Changed

- **The Web Automation tab's Test Coverage cell is broken into paragraphs, and
  its two figures now appear together.** The cell read as a single dense block
  in which "73 tests" opened the text and "71 run on the deployment path"
  arrived three sentences later, with nothing in between stating that the second
  is a subset of the first. Both numbers were correct - and both are verified
  against the running suite on every execution - but a reader met two different
  totals for the same suite and had no way to see they were not in conflict. A
  figure that is accurate and reads as a contradiction is still a defect in the
  page.

  The total and the deployment-path count now sit in the same sentence with the
  relationship stated, and the remaining detail is split by subject: how the
  suite grows without being edited, which two tests are held off the deployment
  path and why, and the Chromium-only CI caveat.

- `css/apolskiybiz.css` gained a paragraph rule for project-table cells, since
  the browser default margin would otherwise push the first line away from the
  cell's own padding.

### Notes

- The equivalent figures in the case study were left alone: that passage already
  says "the deployment pipeline runs 71 of them", which states the relationship
  the tab was missing.

---

## v1.1.1 - 2026-08-10

### Changed

- **The link-obfuscation claim now states what it does not protect against.**
  Nothing previously written was false - each claim was scoped to "the raw
  markup" or "visible text", and both remained true - but a reader could
  reasonably infer a guarantee that was never there, and the limitation was
  stated nowhere.

  What it actually buys: it defeats scrapers that fetch HTML without executing
  JavaScript, which is most of them. What it does not: once the decoder runs,
  the address is a working `mailto:` in the DOM, so the browser shows it in the
  status bar on hover and devtools shows it outright. Base64 is an encoding
  rather than a cipher, so a scraper that decodes `data-` attributes gets it
  without executing anything. And any headless browser defeats the mechanism
  entirely - which this repository already demonstrated in a different section,
  where the automation's crawler is documented as rendering pages in a real
  browser *because* an HTTP-only crawler would find none of these links. The
  bypass was described three sections above the claim; the two were never
  connected.

  Keeping the address in a real anchor is a deliberate trade, now recorded as
  one: constructing it at click time would keep it out of the DOM at the cost of
  a reader's ability to copy or middle-click it, and would stop nobody who can
  run a browser. A portfolio exists to be contacted.

  Also noted: the same encoding on the GitHub, LinkedIn and Docker Hub links
  buys no anti-spam value at all. Those URLs are meant to be found; they share
  the mechanism only because it is applied uniformly.

---

## v1.1.0 - 2026-08-10

### Added

- **A meta description on `index.html` and `case-study.html`.** The title and
  the description are the whole of what a search result shows, and the site had
  only the first. Neither is visible anywhere in the rendered page, so their
  absence was invisible to a reader and to every check that existed.
- Both are now held to a length range by the automation suite. That check caught
  the case-study description on the run that introduced it: 199 characters
  against a 160 ceiling, which a search result would have truncated mid-sentence.

### Changed

- **The document title now identifies the person rather than the file types.**
  It read `Sample Projects PYTHON/GO//Playwright/JavaScript/HTML/CSS` - a
  keyword list, carrying a stray double slash, that named neither the owner nor
  what the site is. The title is the single most visible piece of text the site
  has: it is the browser tab, the bookmark, and the blue line in a search
  result. It is now
  `Aleksandr Polskiy - Staff / Principal Software QA Engineer Portfolio`,
  matching how the profile header already describes the role.
- `404.html` and `site.webmanifest` brought in line with the same wording, so
  the tab title, the install prompt and the error page no longer disagree about
  what the site is called.

### Notes

- The old title was pinned by an automated check that required the word
  "Playwright". That assertion moved with this change - see the corresponding
  entry in the
  [automation suite's changelog](https://github.com/apolskiy/PlaywrightAPWebsiteAutomation/blob/main/CHANGELOG.md).
  A title check tied to one library in a list that keeps changing was asserting
  the wrong invariant; the owner's name is the part that has to be there.

---

## v1.0.0 - 2026-08-10

First release under version tracking. The site predates this file; commit-level
history before this point is in git. This entry records the state as shipped,
and the changes that landed with it.

### Added

- **VM Cluster Deployment tab**
  ([apolskiy/VM-Deployment-and-Configuration](https://github.com/apolskiy/VM-Deployment-and-Configuration)),
  the fifth project panel. Covers the golden-image deploy path, the
  credential-free image and its per-guest cloud-init identity, the encrypted
  inventory and its Python-to-Go interoperability, and the measured cost of a
  load-balancer failover.
- **Three Engineering Outcomes rows** citing that tab: the failover cost cut
  from roughly 2 lost requests in 10 to at most the one already in flight; the
  image made publishable without granting access to every cluster deployed from
  it; and the two things the runner made it easy not to test, covered anyway.
- **`CHANGELOG.md` and per-section documentation stamps** in `README.md`.

### Changed

- **Technical Skills Matrix** extended with the capabilities this project
  demonstrates: PowerShell automation and strict static typing under
  *Automation & Programming*; HTTP load balancing with active health checking,
  AES-256-GCM authenticated encryption, Ed25519 key management and
  credential-free image hardening under *Networking & Security*; and
  infrastructure provisioning, golden-image pipelines, cloud-init first-boot
  provisioning, OCI registries and high-availability failover testing under
  *Infrastructure & DevOps*.
- **Published suite-size figures** on the Web Automation tab and in the case
  study moved to **71 tests / 69 on the deployment path**. These are not
  maintained by hand: they carry `class="suite-count"` and are read back off the
  page by the automation suite on every run, so a stale figure fails a build
  rather than decaying quietly.
- **Project Structure** in the README corrected - `.editorconfig`,
  `.gitattributes` and `.gitignore` are tracked and were missing from the
  documented tree, which made the "every tracked file is served or required by
  Pages" claim inaccurate as written.

### Notes

- Adding a tab needs no change to `js/apolskiybiz.js`. The router binds by
  `data-tab` and the citation controls by `data-target`, so publishing a tab is
  a nav item plus a panel.
- The site is re-validated end to end after every content push by
  [PlaywrightAPWebsiteAutomation](https://github.com/apolskiy/PlaywrightAPWebsiteAutomation),
  which now runs 69 checks against it on the deployment path.
