document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  const closeMenu = () => {
    if (!menuToggle) return;
    body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "Menu";
  };

  const openMenu = () => {
    if (!menuToggle) return;
    body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.textContent = "Fermer";
  };

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      if (menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
      } else {
        openMenu();
      }
    });

    siteNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100) closeMenu();
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const contactForm = document.querySelector("[data-contact-form]");

  if (contactForm) {
    const contactStatus = contactForm.querySelector("[data-contact-status]");
    const mailtoFallback = contactForm.querySelector("[data-mailto-fallback]");

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const oneLine = (value) => String(value || "").replace(/[\r\n]+/g, " ").trim();
      const name = oneLine(formData.get("name"));
      const email = oneLine(formData.get("email"));
      const project = oneLine(formData.get("project"));
      const message = String(formData.get("message") || "").trim();
      const subject = `Projet Final Bounce — ${project}`;
      const body = [
        "Bonjour Final Bounce,",
        "",
        `Nom / artiste : ${name}`,
        `E-mail : ${email}`,
        `Projet : ${project}`,
        "",
        "Mon projet :",
        message,
        "",
        "À bientôt,",
      ].join("\r\n");
      const mailto = `mailto:contact@finalbounce.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (mailtoFallback) {
        mailtoFallback.href = mailto;
      }

      if (contactStatus) {
        contactStatus.hidden = false;
      }

      window.location.href = mailto;
    });
  }
});
