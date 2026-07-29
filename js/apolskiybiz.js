//by Aleksandr Polskiy
//this javascript for https://apolskiy.github.io
//


//navigation menu functions

document.addEventListener('DOMContentLoaded', () => {
  // Decode the base64-obfuscated email so scrapers/bots don't see it in the markup.
  // Without JS the span stays empty and the <noscript> LinkedIn fallback shows instead.
  const emailEl = document.getElementById('contact-email');
  if (emailEl && emailEl.dataset.e) {
    const address = atob(emailEl.dataset.e);
    const link = document.createElement('a');
    link.href = 'mailto:' + address;
    link.textContent = 'Email'; // show only the word "Email", never the actual address
    emailEl.replaceWith(link);
  }

  // Decode all base64-obfuscated hyperlinks. Each <span class="enc-link" data-h="...">
  // keeps its visible label as text; the real URL lives base64-encoded in data-h.
  document.querySelectorAll('.enc-link').forEach(el => {
    if (!el.dataset.h) return;
    const link = document.createElement('a');
    link.href = atob(el.dataset.h);
    // Preserve the original contents (text and/or elements such as badge images)
    while (el.firstChild) link.appendChild(el.firstChild);
    // Opt-in "open in new tab" via the data-nw attribute
    if (el.hasAttribute('data-nw')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    el.replaceWith(link);
  });

  //menu tabs, activation and deactivation loading appropriate content into div
  //depending which tab was clicked
  const tabItems = document.querySelectorAll('.item');
  const tabContents = document.querySelectorAll('.tab-content');

  tabItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all tabs and content
      tabItems.forEach(tab => tab.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to the clicked tab
      item.classList.add('active');

      // Get the data-tab attribute to find corresponding content
      const targetTabId = item.getAttribute('data-tab');
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // In-page cross references (the "Evidence" column of the outcomes table).
  // These open the relevant project tab instead of leaving the site, so the
  // reader keeps their place. They are deliberately NOT anchors: an href of
  // "#panel-id" would be a same-page fragment, and every link on this site is
  // expected to resolve to an absolute https:// or mailto: target.
  // Activation is delegated to the matching nav tab so the switching rules
  // live in exactly one place.
  const jumpToTab = (targetTabId) => {
    const navItem = document.querySelector('.item[data-tab="' + targetTabId + '"]');
    if (!navItem) return;
    navItem.click();
    // The reader clicked something mid-page; bring the newly opened tab into view.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  document.querySelectorAll('.tab-jump').forEach(el => {
    el.addEventListener('click', () => jumpToTab(el.dataset.target));
    // Keyboard parity: these carry role="button", so Enter and Space must work.
    el.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        jumpToTab(el.dataset.target);
      }
    });
  });
});
