const header = document.querySelector("[data-header]");
const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateHeader = () => {
  if (window.scrollY > 12) {
    header.style.boxShadow = "0 10px 30px rgba(29, 35, 45, 0.08)";
  } else {
    header.style.boxShadow = "none";
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visible.target.id}`;
      link.toggleAttribute("aria-current", isActive);
    });
  },
  { rootMargin: "-25% 0px -60% 0px", threshold: [0.2, 0.45, 0.7] }
);

sections.forEach((section) => observer.observe(section));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
