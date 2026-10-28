/* Meta Pixel events - The Conversation Economy 2026 - Dataset 1810564633146415
   Standalone file. Load it AFTER js/main.js:
   <script src="js/pixel-events.js?v=1.0"></script>
   It only adds click listeners. It does not change any existing behaviour
   except on the Stripe button, where it waits 300ms before navigating so
   the InitiateCheckout event can fire. */
(function () {
  function newEventId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'evt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
  }
  function track(eventName, params, eventId) {
    if (typeof window.fbq !== 'function') return;
    if (eventId) window.fbq('track', eventName, params || {}, { eventID: eventId });
    else window.fbq('track', eventName, params || {});
  }

  // Delegate pass -> Stripe Payment Link: InitiateCheckout
  document.querySelectorAll('a[href*="buy.stripe.com"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var eventId = newEventId();
      track('InitiateCheckout', {
        value: 98.00,
        currency: 'MYR',
        content_name: 'Delegate Pass - The Conversation Economy 2026',
        content_category: 'Conference Ticket',
        content_ids: ['delegate-pass'],
        content_type: 'product',
        num_items: 1
      }, eventId);
      // Pass the event ID to Stripe so the Make.com CAPI flow can read it
      // back from checkout.session.client_reference_id and correlate.
      try {
        var url = new URL(link.href);
        if (!url.searchParams.get('client_reference_id')) {
          url.searchParams.set('client_reference_id', eventId);
          link.href = url.toString();
        }
      } catch (err) { /* leave href untouched */ }
      e.preventDefault();
      var target = link.href;
      setTimeout(function () { window.location.href = target; }, 300);
    });
  });

  // Executive pass -> WhatsApp: Contact
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
    link.addEventListener('click', function () {
      track('Contact', {
        content_name: 'Executive Pass enquiry - The Conversation Economy 2026',
        content_category: 'Conference Ticket'
      });
    });
  });

  // Conversation Maturity Index -> survey: Lead
  document.querySelectorAll('a[href*="survey.superanium.com"]').forEach(function (link) {
    link.addEventListener('click', function () {
      track('Lead', {
        content_name: 'Conversation Maturity Index - The Conversation Economy 2026',
        content_category: 'Lead Magnet'
      });
    });
  });
})();
