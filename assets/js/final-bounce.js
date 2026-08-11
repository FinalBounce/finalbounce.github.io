(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  document.documentElement.classList.toggle(
    "fb-reduced-motion",
    prefersReducedMotion.matches
  );

  const revealContent = () => {
    document.querySelectorAll('[data-start="hidden"]').forEach((element) => {
      element.style.visibility = "visible";
    });
  };

  const setupReducedMotionSliders = () => {
    if (!prefersReducedMotion.matches) {
      return;
    }

    document.querySelectorAll('[data-animate="slider"]').forEach((slider) => {
      if (slider.dataset.fbReducedMotionSlider === "true") {
        return;
      }

      const slides = [
        ...slider.querySelectorAll('[data-slider="slides"] > li'),
      ];
      const dots = [...slider.querySelectorAll('[data-slider="dots"] button')];
      const previous = slider.querySelector('[data-slider="prev"]');
      const next = slider.querySelector('[data-slider="next"]');

      if (slides.length === 0) {
        return;
      }

      let currentIndex = Math.max(
        0,
        slides.findIndex((slide) => slide.classList.contains("current"))
      );

      const render = () => {
        slides.forEach((slide, index) => {
          const isCurrent = index === currentIndex;
          slide.hidden = !isCurrent;
          slide.setAttribute("aria-hidden", String(!isCurrent));
        });

        dots.forEach((dot, index) => {
          dot.classList.toggle("current", index === currentIndex);
        });
      };

      previous?.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        render();
      });

      next?.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        render();
      });

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          currentIndex = index;
          render();
        });
      });

      slider.dataset.fbReducedMotionSlider = "true";
      render();
    });
  };

  const updateMotionPreference = () => {
    document.documentElement.classList.toggle(
      "fb-reduced-motion",
      prefersReducedMotion.matches
    );

    document.querySelectorAll("video").forEach((video) => {
      if (prefersReducedMotion.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      }
    });

    if (prefersReducedMotion.matches) {
      revealContent();
      setupReducedMotionSliders();
    }
  };

  const labelSliders = () => {
    document.querySelectorAll('[data-animate="slider"]').forEach((slider) => {
      slider.setAttribute("role", "region");
      slider.setAttribute("aria-roledescription", "carrousel");
      slider.setAttribute("aria-label", "Notre approche");
    });

    document.querySelectorAll('[data-slider="prev"]').forEach((button) => {
      button.setAttribute("type", "button");
      button.setAttribute("aria-label", "Diapositive précédente");
    });

    document.querySelectorAll('[data-slider="next"]').forEach((button) => {
      button.setAttribute("type", "button");
      button.setAttribute("aria-label", "Diapositive suivante");
    });

    document.querySelectorAll('[data-slider="dots"]').forEach((list) => {
      const dots = [...list.querySelectorAll("button")];

      const updateCurrentDot = () => {
        dots.forEach((dot, index) => {
          dot.setAttribute("type", "button");
          dot.setAttribute(
            "aria-label",
            `Afficher la diapositive ${index + 1} sur ${dots.length}`
          );

          if (dot.classList.contains("current")) {
            dot.setAttribute("aria-current", "true");
          } else {
            dot.removeAttribute("aria-current");
          }
        });
      };

      updateCurrentDot();

      new MutationObserver(updateCurrentDot).observe(list, {
        attributes: true,
        attributeFilter: ["class"],
        subtree: true,
      });
    });
  };

  const setupTapeHero = () => {
    const hero = document.querySelector(".body-3 [data-module='hero']");
    const toggle = hero?.querySelector("[data-hero='toggle'] input");
    const layer = hero?.querySelector("[data-hero='layer']");

    if (!hero || !toggle || !layer) {
      return;
    }

    toggle.setAttribute("aria-label", "Afficher la scène magnétophone animée");
    layer.setAttribute("aria-hidden", "true");

    const legacyVideos = [...layer.querySelectorAll("video")];

    legacyVideos.forEach((video) => {
      video.pause();
      video.remove();
    });

    const syncTapeState = () => {
      hero.classList.toggle("fb-tape-playing", toggle.checked);
    };

    toggle.addEventListener("change", syncTapeState);
    syncTapeState();
  };

  setupTapeHero();

  document.addEventListener("DOMContentLoaded", () => {
    updateMotionPreference();
    labelSliders();

    window.setTimeout(revealContent, 3500);
  });

  prefersReducedMotion.addEventListener("change", () => {
    window.location.reload();
  });
})();
