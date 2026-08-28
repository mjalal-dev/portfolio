document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const cursorGlow = document.querySelector(".cursor-glow");

  // Header state on scroll
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Reveal animations
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));

  // Subtle mouse glow on desktop
  if (window.matchMedia("(pointer:fine)").matches && cursorGlow) {
    window.addEventListener("mousemove", e => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // Current year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Smooth anchor behavior for older browsers
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
