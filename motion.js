// Motion on the landing, always optional:
// 1. The short product clip plays only for visitors who have not asked for reduced motion, and only while it is
//    on screen. A visible button lets anyone pause it (WCAG 2.2.2).
// 2. Blocks marked .reveal slide a few pixels into place once when they enter the screen. They are never
//    hidden: styles.css only offsets them while the page has the .js class and the visitor accepts motion.
// 3. The header menu marks the section being read.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("video.motion").forEach(function (video) {
    var scope = video.closest(".showcase__media") || video.parentElement;
    var toggle = scope.querySelector(".motion-toggle");
    var paused = reduce.matches;

    function sync() {
      if (!toggle) return;
      toggle.hidden = false;
      toggle.textContent = paused ? "Reproducir animación" : "Pausar animación";
      toggle.setAttribute("aria-pressed", String(paused));
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        paused = !paused;
        if (paused) video.pause(); else video.play().catch(function () {});
        sync();
      });
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !paused) {
            video.preload = "auto";
            video.play().catch(function () {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.4 }).observe(video);
    }
    sync();
  });

  // Blocks marked .reveal start a few pixels lower and slide into place once. Blocks already on screen when
  // the page loads are settled at once, so nothing moves under the visitor's eyes on arrival.
  var blocks = document.querySelectorAll(".reveal");
  if (reduce.matches || !("IntersectionObserver" in window)) {
    blocks.forEach(function (node) { node.classList.add("is-in"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    blocks.forEach(function (node) { observer.observe(node); });
  }

  // Header menu: mark the section being read.
  document.querySelectorAll("[data-spy]").forEach(function (nav) {
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      var section = document.getElementById(link.getAttribute("href").slice(1));
      if (section) links[section.id] = link;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(links).forEach(function (id) { links[id].classList.remove("is-current"); });
          link.classList.add("is-current");
        } else {
          link.classList.remove("is-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) { spy.observe(document.getElementById(id)); });
  });
})();
