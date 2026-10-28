(function () {
  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  if (toggle && nav && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        header.classList.remove("is-open");
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Set a WhatsApp number in international format, without + or spaces.
  // Example: "60123456789"
  var whatsappNumber = "";
  var message = "Hi, I would like the Executive Pass for The Conversation Economy 2026.";
  var links = [
    document.getElementById("whatsapp-executive"),
    document.getElementById("whatsapp-closing")
  ];

  var toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    var toggleToTop = function () {
      toTop.classList.toggle("is-visible", window.scrollY > 480);
    };
    window.addEventListener("scroll", toggleToTop, { passive: true });
    toggleToTop();
  }

  if (whatsappNumber) {
    var href = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
    links.forEach(function (link) {
      if (link) link.href = href;
    });
  }
})();
