
/* =========================================
   NEXUS-9 | INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // -----------------------------------------
  // MOBILE NAVIGATION
  // -----------------------------------------

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      navLinks.classList.toggle("open", !isOpen);
    });

    navItems.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu =
        navLinks.contains(event.target) ||
        menuToggle.contains(event.target);

      if (!clickedInsideMenu) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // -----------------------------------------
  // ACTIVE NAVIGATION LINK
  // -----------------------------------------

  const sections = document.querySelectorAll(
    "#home, #technology, #modules, #about, #contact"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;

          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // -----------------------------------------
  // SCROLL REVEAL ANIMATIONS
  // -----------------------------------------

  const revealElements = document.querySelectorAll(".reveal");

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${(index % 3) * 90}ms`;
      revealObserver.observe(element);
    });
  }

  // -----------------------------------------
  // ANIMATED STATISTICS
  // -----------------------------------------

  const statNumbers = document.querySelectorAll("[data-count]");

  function animateCounter(element) {
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || "";

    if (!Number.isFinite(target)) return;

    if (prefersReducedMotion) {
      element.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 1300;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out curve
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = target * easedProgress;

      const formattedValue =
        target % 1 === 0
          ? Math.round(currentValue)
          : currentValue.toFixed(1);

      element.textContent = `${formattedValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `${target}${suffix}`;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    statNumbers.forEach((stat) => {
      counterObserver.observe(stat);
    });
  } else {
    statNumbers.forEach(animateCounter);
  }

  // -----------------------------------------
  // DIAGNOSTIC PROGRESS BARS
  // -----------------------------------------

  const progressBars = document.querySelectorAll("[data-progress]");

  function revealProgressBar(bar) {
    const value = Number(bar.dataset.progress);
    const safeValue = Math.min(100, Math.max(0, value));

    bar.style.setProperty("--progress-width", `${safeValue}%`);
    bar.style.width = `${safeValue}%`;
  }

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    progressBars.forEach(revealProgressBar);
  } else {
    const progressObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          revealProgressBar(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    progressBars.forEach((bar) => {
      progressObserver.observe(bar);
    });
  }

  // -----------------------------------------
  // CYBORG VISUAL POINTER EFFECT
  // -----------------------------------------

  const cyborgStage = document.getElementById("cyborgStage");

  if (
    cyborgStage &&
    !prefersReducedMotion &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    cyborgStage.addEventListener("pointermove", (event) => {
      const rect = cyborgStage.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 5;
      const rotateX = (0.5 - y) * 4;

      const artwork = cyborgStage.querySelector(".cyborg-art");

      if (artwork) {
        artwork.style.transform =
          `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });

    cyborgStage.addEventListener("pointerleave", () => {
      const artwork = cyborgStage.querySelector(".cyborg-art");

      if (artwork) {
        artwork.style.transform = "";
      }
    });
  }

  // -----------------------------------------
  // FOOTER YEAR
  // -----------------------------------------

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // -----------------------------------------
  // CONSOLE MESSAGE
  // -----------------------------------------

  console.info(
    "%c NEXUS-9 ",
    "background:#00e5ff;color:#080a10;font-weight:bold;padding:5px 10px;"
  );

  console.info(
    "System initialized. Welcome to the next frontier."
  );
});
