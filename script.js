// Mark JS as active so the reveal styles only apply when we can undo them.
document.documentElement.classList.add("js");

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav: scrolled state
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const toggle = document.getElementById("navToggle");
const links = document.querySelector(".nav__links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

/* ---- Reveal on scroll + count-up ----
   Scroll-driven (not IntersectionObserver) so content can never be left
   stuck invisible if observer callbacks don't fire. */
const reveals = Array.from(document.querySelectorAll(".reveal"));
const counters = Array.from(document.querySelectorAll(".num[data-count]"));

function runCount(el) {
  const target = +el.dataset.count;
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 28));
  const tick = () => {
    cur = Math.min(target, cur + step);
    el.textContent = cur;
    if (cur < target) requestAnimationFrame(tick);
  };
  tick();
}

function check() {
  const trigger = window.innerHeight * 0.92;
  for (const el of reveals) {
    if (el.classList.contains("in")) continue;
    const r = el.getBoundingClientRect();
    if (r.top < trigger && r.bottom > 0) el.classList.add("in");
  }
  for (let i = counters.length - 1; i >= 0; i--) {
    const el = counters[i];
    const r = el.getBoundingClientRect();
    if (r.top < trigger && r.bottom > 0) {
      runCount(el);
      counters.splice(i, 1);
    }
  }
}

check();
window.addEventListener("scroll", check, { passive: true });
window.addEventListener("resize", check, { passive: true });
window.addEventListener("load", check);
// Backstop: guarantee everything is visible shortly after load no matter what.
setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 1200);

// Word rotator in hero
const words = ["bioinformatics", "AI prototyping", "data mining", "3D design", "CRISPR tooling"];
const rotator = document.getElementById("rotator");
if (rotator && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let wi = 0, ci = 0, deleting = false;
  const type = () => {
    const word = words[wi];
    rotator.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) {
      ci++;
      setTimeout(type, 70);
    } else if (!deleting && ci === word.length) {
      deleting = true;
      setTimeout(type, 1600);
    } else if (deleting && ci > 0) {
      ci--;
      setTimeout(type, 35);
    } else {
      deleting = false;
      wi = (wi + 1) % words.length;
      setTimeout(type, 350);
    }
  };
  setTimeout(type, 1200);
}
