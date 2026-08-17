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

## v1.7.0 - 2026-08-16

### Added

- **A Test Insights tab**, the eighth, covering
  [PortfolioTestInsights](https://github.com/apolskiy/PortfolioTestInsights) -
  the cross-repository collector that keeps the other four suites' results past
  GitHub's 90-day artifact retention. Panel id `apinsights8`, following the
  convention that ids carry the ordinal a tab was added in rather than its
  position, so nothing renumbers when a tab is inserted.

  The panel carries the same rows every project panel carries - repo, tagline,
  overview, highlights, tech stack, test coverage, CI badge, documentation -
  because the automation suite asserts that a panel ships no fewer rows than its
  siblings. That constraint had a real consequence: the collector had no CI
  workflow, so one was written before the tab could be published rather than
  pointing a badge at a pipeline that did not exist.

  Its Test Coverage row states that the unit tier is **not yet shipped**, and
  why. An absent row would have implied nothing; a stated absence is a claim
  that can be checked.

- **Two Engineering Outcomes rows**, both cited to the new tab: the four
  repositories found to be losing their own test history on a 90-day clock with
  three days left to act, and the format survey that disproved the collector's
  founding assumption before the code depending on it was written.

### Changed

- **Published suite-size figures**, on the landing page and in the case study,
  from **72/74 to 78/80**. Adding one navigation tab grew the automation suite
  by six tests without a test being written, because several of its modules
  parametrize over the tab list. Both figures are read back off these pages on
  every run and compared against the executing suite, so the update was not
  optional - the suite failed until the pages agreed with it.

- **Feature list and prose counts** updated from seven tabs to eight, including
  the runtime-health description of walking every tab.

---

## v1.6.0 - 2026-08-13

The AI Assisted REST API tab gains the static analysis gate. **Minor**: new
content on an existing tab, no structure, URL or navigation change.

### Added

- **An Engineering Outcomes row: *Found a quality gate that existed only on
  paper*.** It sits directly beneath *Made quality gates blocking, not advisory*
  because the two are the same claim from opposite ends - one project's gate was
  already blocking, and the row below records a second project that declared the
  same standard in two places, enforced it in none, and shipped a `.pylintrc`
  that could not be parsed at all. The row states the measured before and after
  (9.45/10 against nineteen findings, now a blocking 10.00/10) and notes the
  finding was confirmed by probe rather than inferred, since "this config was
  never in effect" is exactly the sort of claim that deserves evidence. Cited to
  the AI Assisted Rest API tab.

- **A *Static Analysis Gates the Suite* bullet** covering CountryWeather's new
  `lint` job: `pylint --fail-under=10` over every tracked `.py` file, with the
  test job declaring `needs: lint`. The bullet leads with why the jobs are
  ordered that way rather than with the tool, because the ordering is the
  interesting part - it is the same quota argument the tab already makes twice
  (serialized runs, and skipping documentation-only commits), applied a third
  time: the linter spends no API quota, so it is the cheap check and belongs
  first.

### Changed

- **The *AI-Assisted Engineering* bullet no longer stops at "the rules exist".**
  It said conventions were codified as machine-readable rules in
  `.claude/rules/`, which was true and incomplete - nothing ran a linter, so the
  rules bound a generator and nothing else. It now says so, and points at the
  gate that makes them binding.
- **The *One Entry Point* bullet** records that the `Makefile` now owns the
  pylint invocation alongside the pytest one, so `make lint` is the same command
  locally and in CI.
- **The Tech Stack CI/CD line** names Pylint 4.0.6 as a blocking 10.00/10 gate
  ahead of the suite.

---

## v1.5.0 - 2026-08-12

The HTTP Emulators tab gains the container-level coverage. **Minor**: new
content on an existing tab, no structure, URL or navigation change.

### Added

- **The tab now describes the 28 tests that exercise the artifact rather than
  the code.** It states the seam they close, which is the part worth reading: the
  108 source tests and the automation suite's registry check both pass against an
  image built from stale source, because one inspects the code and the other
  inspects the layers, and neither asks the container to answer a request. It
  also covers why the suite runs twice against two different containers - one
  built from the commit, one pulled from Docker Hub - and why two of its
  assertions are deliberately not HTTP requests, since an image running as root
  and shipping its own Dockerfile serves traffic perfectly well.

### Changed

- **The emulator test figure is now stated as a sum**, matching how the Web
  Automation tab already phrases its own: *108 tests against the source, plus 28
  against a running container - 136 in total*. A bare 136 would have hidden that
  the two halves answer different questions and run in different places.
- **The Engineering Outcomes row is scoped explicitly** to the suite it is about.
  It claims a specific achievement - making self-terminating software
  deterministically testable - which is a property of the 108, so it now says
  that suite stands at 108 with a further 28 exercising the container. Without
  the qualifier a reader moving between the two tabs would have found 108 in one
  place and 136 in the other and reasonably concluded one was stale.

---

## v1.4.0 - 2026-08-12

The HTTP Emulators tab catches up with the project it describes. **Minor**: new
content on an existing tab, no structure, URL or navigation change.

### Added

- **Latency injection is now described on the tab.** The emulator gained
  `X-Response-Delay-Ms` in PublicAP v1.1.0 and this page did not know about it -
  the tab described the Flask emulator purely as 21 status codes and a container.
  The new bullet covers the header, the `X-Applied-Delay-Ms` echo that makes a
  delay assertable from the response rather than a stopwatch, the 999 refusal for
  a delay that cannot be honoured, and why the 30s ceiling refuses rather than
  clamps. It also states plainly that this complements control code 590 rather
  than replacing it: 590 never answers, latency injection answers late by a known
  amount, and the cases either side of a timeout boundary need the second.
- **Release-versioned image tags are documented.** Tags now name the emulator
  release - `1.1.0` to pin in CI, `1.0.0` for the pre-latency image, `latest` for
  a look around - replacing a scheme that tagged the Python base version and so
  read like a release of the emulator without being one.

### Fixed

- **The published emulator test count was stale in two places.** The tab's
  coverage row and the Engineering Outcomes row both said **93**; the suite is at
  **108**. Unlike the deployment-path figures on the Web Automation tab, this
  number is not read back off the page by any test, so nothing would have caught
  it - it is maintained rather than verified, and that distinction is worth
  knowing when reading it.
- **The Engineering Outcomes row no longer implies its achievement covers the
  current total.** It read "93 tests, green on the first run", which fused a
  historical claim to a live number; as the suite grew, updating the number alone
  would have quietly extended "green on the first run" to fifteen tests written
  months later. It now separates the two: that suite went green on its first run,
  and the suite stands at 108 today.

### Changed

- **The containerization bullet notes that latency injection added no
  dependency.** It is `time.sleep` from the standard library, so the image still
  carries Flask and its six transitive dependencies and nothing else - the claim
  the scheduled consumer test verifies by reading the published layers.

---

## v1.3.1 - 2026-08-12

A copy correction on the Web Automation tab and in *Browser Support*.
**Patch**: no structure, URL or navigation changed.

### Fixed

- **The Web Automation tab implied WebKit coverage that this site's own README
  denied.** The tab said the suite "runs on Firefox and WebKit on request";
  *Browser Support* said WebKit "is expected to work but is not covered by an
  automated check". Two pages of the same site, two different answers about the
  same suite.

  Resolved by measurement rather than by rewording. The suite was run on all
  three engines against the live site on 2026-08-12 and passed its 72
  deployment-path tests on each - Chromium 34.6s, WebKit 52.1s, Firefox 102.7s.
  WebKit had not been covered because it was not installed for the pinned
  Playwright release, not because it failed. Both places now state that result,
  dated, and say plainly that CI still runs Chromium alone, so the other two are
  a verified state rather than a continuously enforced one.

- **Playwright's WebKit is no longer allowed to read as Safari.** Both places now
  note it is a build of the engine sharing the renderer but not Safari's platform
  integration - evidence the page is engine-neutral, not evidence that Safari
  works. Claiming Safari coverage on that basis would be worth less than stating
  the gap.

### Changed

- **The Chromium-only decision is now argued from the numbers on the tab
  itself**: three engines agreeing is the expected result for a page built on
  ordinary DOM, CSS and `atob`, and re-running all three per push would cost
  roughly 3.4x the wall clock while admitting engine-specific timing flake into
  the signal that gates a deploy.

---

## v1.3.0 - 2026-08-12

### Added

- **`notify_automation.yml` accepts a manual run**, with an optional one-line
  reason echoed into the run log. The path filter that keeps documentation
  commits from spending a pipeline run is deliberately narrow, and it left
  legitimate reasons to re-validate with no way to act on them: a deploy that
  raced its own dispatch, a suite fixed after a red run, a documentation commit
  that turned out to touch the page after all. The only route was to invent a
  change to an `.html` file and push it - a fabricated commit in the history of
  the very thing under test, which is a poor price for a button.

  This does not duplicate the automation repository's own manual trigger; the
  two test different things. Running it there tests the site. Running it here
  tests the site *and* the notification path - the PAT, its scope, its expiry -
  which a real deploy is otherwise the only thing that exercises, so a broken
  credential would otherwise be discovered at the exact moment it was needed.

  Filed as Minor rather than Patch: no content moved, but the repository can now
  do something it could not do before, and the version should say so.

### Fixed

- **An outcome row quoted a test total that no longer matched the one this site
  publishes.** The row about the error log said the log had been recorded "on 12
  of 73 tests"; 73 was the size of the suite *before* that work, and the Web
  Automation tab two clicks away publishes 74. Both numbers were defensible on
  their own and the pair was indefensible - a reader had no way to tell which
  was current, and unlike the published figures, the 73 was verified by nothing.

  The denominator is gone rather than corrected. The claim was never about a
  ratio: it is that only the per-route load checks recorded anything and nothing
  that clicks did, which is both the actual point and immune to the suite
  growing. A number nothing verifies does not belong on a page whose premise is
  that its numbers are verifiable.

---

## v1.2.0 - 2026-08-12

### Added

- **An Engineering Outcomes row: "Closed the gap between a page that renders and
  a page that works."** Placed fifth, beside the other rows about diagnosing a
  red build. The automation suite recorded the browser's
  error log on 12 of its 73 tests and only at load time, so a JavaScript
  exception thrown while a visitor clicked a tab was invisible to all of it -
  the checks that followed reported a locator timeout, which says an element
  never appeared and nothing at all about why. Every page in that suite now
  records, the interaction path is asserted, and the log is attached to every
  failure. Cited to Web Automation, like the other rows about that pipeline.

- **A paragraph in the Web Automation tab's Test Coverage cell** describing what
  is recorded, which two tests assert on it, and why those assertions are scoped
  to this site's own origin: the five CI badges on this page are served by
  GitHub, and a bad minute there is worth recording but not worth failing a
  deploy over.

### Changed

- **Published suite figures move to 72 tests on the deployment path plus 2 run
  weekly, 74 in total**, and the module count to ten. As always these are not
  maintained by hand - they carry `class="suite-count"` and are read back off
  this page by the suite on every run, so the figures and the suite agree by
  construction.

- **The two figures are now written as a sum rather than as a pair.** Both the
  tab and the case study led with the total and named the deployment-path count
  second, which put the larger number first and left a reader to work out that
  the second was a subset of it - and shortened anywhere to "74/72" it read as a
  fraction with the denominator smaller than the numerator, which is not a
  quantity at all. They now read "72 on the deployment path, plus 2 run weekly -
  74 in total", so the arithmetic is on the page instead of in the reader's
  head. The markup and the `data-scope` values are unchanged, so the figures are
  still read back and verified on every run.

- **The four places this site enumerates what a failure ships now include the
  browser's error log** - the *Diagnosable Failures* feature bullet, the
  *Reduced time-to-resolution* outcome, the *Diagnosis moved off the developer's
  machine* impact row, and the case study's *What was changed* paragraph. All
  four listed the screenshot, the DOM, the trace and the LLM verdict, and each
  would have been quietly incomplete.

- **The AI triage claim now says what the model is given, and how it is told to
  read it.** The bullet described a DOM snapshot being sent to Claude; the error
  log now goes with it, and the two answer different halves of the question -
  the DOM shows what the page ended up as, the log shows what went wrong on the
  way there. A script that threw before it could bind the tab router explains a
  missing panel far more directly than the absence of that panel does, so
  sending only the DOM was asking for a cause while withholding the evidence for
  it.

  The bullet also records the reading rules the prompt states outright rather
  than leaving to inference - a failure supported only by third-party events is
  a flake, an empty log is evidence rather than an absence of it - and that both
  inputs are size-bounded and announce their own truncation, since a model
  reasoning over a fragment it believes is whole gives a confident wrong answer
  rather than a missing one.

### Notes

- This release and the automation suite's v1.2.0 depend on each other: this page
  advertises 72 plus 2, and the suite that verifies those figures is the one
  that grew to 74. Whichever repository is pushed first goes red until the other
  follows, which is the cross-repository ordering race already documented in the
  case study. A re-run does not fix it - a re-run replays the same commit rather
  than picking up the default branch - so the second push is what turns the
  signal green.

---

## v1.1.3 - 2026-08-10

### Changed

- **Removed a "see below" from the Test Coverage cell and named the two tests
  where they are first mentioned.** Splitting the cell into paragraphs in
  v1.1.2 fixed the two figures reading as a contradiction, but introduced a
  worse problem in the same sentence: the reader was told two tests run weekly
  and pointed forward into four paragraphs, only one of which said which two.
  A pointer that makes a reader hunt is not an explanation, and this cell is
  describing test coverage - the one subject where being vague is
  self-defeating.

  The two are now identified in the sentence that introduces them, with the
  reason attached: they are the only tests depending on anything outside this
  site being reachable, so they are deselected from the deploy run and execute
  weekly. Nothing in the cell now refers forward; the module list moved into its
  own paragraph rather than trailing the figures it has nothing to do with.

### Notes

- An in-page anchor was considered and rejected. Every anchor on this site must
  resolve to an absolute `https`/`mailto` target or to another page, and
  `test_decoded_links_use_absolute_safe_schemes` enforces that by rejecting a
  bare `#fragment` outright. A jump link would have meant a new control type,
  new script, and new coverage - to solve a problem that disappears entirely by
  saying the thing in place rather than promising it later.

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
