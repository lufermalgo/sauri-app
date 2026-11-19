// Motion on the landing, always optional:
// 1. The short product clip plays only for visitors who have not asked for reduced motion, and only while it is
//    on screen. A visible button lets anyone pause it (WCAG 2.2.2).
// 2. Blocks marked .reveal fade in once when they enter the screen. styles.css only hides them while the page
//    has the .js class and the visitor accepts motion, so without JavaScript everything is visible.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("video.motion").forEach(function (video) {
    var toggle = video.parentElement.querySelector(".motion-toggle");
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

  var blocks = document.querySelectorAll(".reveal");
  if (reduce.matches || !("IntersectionObserver" in window)) {
    blocks.forEach(function (node) { node.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    blocks.forEach(function (node) { observer.observe(node); });
  }

  // «Cómo funciona»: three tabs (WAI-ARIA tabs pattern, vertical). Without JavaScript all panels stay visible.
  document.querySelectorAll("[data-tour]").forEach(function (tour) {
    var tabs = Array.prototype.slice.call(tour.querySelectorAll("[role=tab]"));
    if (!tabs.length) return;

    function select(index, focus) {
      tabs.forEach(function (tab, i) {
        var active = i === index;
        var panel = document.getElementById(tab.getAttribute("aria-controls"));
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        if (panel) panel.hidden = !active;
      });
      if (focus) tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(i, false); });
      tab.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (i + 1) % tabs.length;
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next === null) return;
        event.preventDefault();
        select(next, true);
      });
    });
    select(0, false);
  });
})();
