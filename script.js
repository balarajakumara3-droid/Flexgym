const testimonials = [
  {
    quote: "Coach Nivas corrected my form and kept me consistent. I feel stronger every week.",
    who: "Member • Strength",
  },
  {
    quote: "Clean gym, good equipment, and proper guidance. My stamina improved a lot.",
    who: "Member • Fitness",
  },
  {
    quote: "The plan was simple and easy to follow. Real progress tracking helped.",
    who: "Member • Weight loss",
  },
];

// Preloader logic
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const progress = document.querySelector(".preloader-progress");

  if (progress) progress.style.width = "100%";

  setTimeout(() => {
    if (preloader) {
      preloader.classList.add("is-hidden");
    }
  }, 600);
});


function qs(sel, root = document) {
  return root.querySelector(sel);
}
function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

// Year
qs("#year").textContent = String(new Date().getFullYear());

// Mobile nav
const navToggle = qs(".nav-toggle");
const navLinks = qs("#nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close on link click
  qsa("a", navLinks).forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Tabs
const tabs = qsa(".tab[data-tab]");
const panes = qsa(".pane[data-pane]");
function setTab(next) {
  tabs.forEach((t) => {
    const active = t.dataset.tab === next;
    t.classList.toggle("is-active", active);
    t.setAttribute("aria-selected", active ? "true" : "false");
  });
  panes.forEach((p) => {
    const active = p.dataset.pane === next;
    p.classList.toggle("is-active", active);
    p.hidden = !active;
  });
}
tabs.forEach((t) => t.addEventListener("click", () => setTab(t.dataset.tab)));

// Testimonials slider
let tIndex = 0;
const quoteEl = qs("#t-quote");
const whoEl = qs("#t-who");
function renderTestimonial() {
  const t = testimonials[tIndex];
  if (quoteEl) quoteEl.textContent = `“${t.quote}”`;
  if (whoEl) whoEl.textContent = t.who;
}
function nextTestimonial(dir) {
  tIndex = (tIndex + dir + testimonials.length) % testimonials.length;
  renderTestimonial();
}
qs(".t-nav.prev")?.addEventListener("click", () => nextTestimonial(-1));
qs(".t-nav.next")?.addEventListener("click", () => nextTestimonial(1));
renderTestimonial();

// Smooth scroll for same-page anchors
qsa('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", href);
  });
});

// Intersection Observer for reveal animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".section, .card, .coach-media, .pricing-grid, .cta-box").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

// Magnetic Buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});

// Transformation Slider
const tsRange = document.querySelector(".ts-range");
const tsAfter = document.querySelector(".ts-after");
const tsHandle = document.querySelector(".ts-handle");

if (tsRange && tsAfter && tsHandle) {
  tsRange.addEventListener("input", (e) => {
    const val = e.target.value;
    tsAfter.style.clipPath = `inset(0 0 0 ${val}%)`;
    tsHandle.style.left = `${val}%`;
  });
}

// Hero Parallax
const heroTitle = document.querySelector(".hero-title");
if (heroTitle) {
  window.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;
    heroTitle.style.transform = `translate(${x}px, ${y}px)`;
  });
}

