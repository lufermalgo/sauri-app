// Fills the download and extension blocks from the release config (#sauri-release) at the top of index.html.
// A link is enabled only when its URL is a real https address; anything else keeps the safe default that the
// HTML already shows («Disponible pronto» for the app, «En revisión» for the extension). The checksum, version
// and file size are shown only when they are set and well formed.
(function () {
  var config = {};
  try {
    var block = document.getElementById("sauri-release");
    config = JSON.parse(block ? block.textContent : "{}") || {};
  } catch (error) {
    config = {};
  }

  function realUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      var url = new URL(value.trim());
      var host = url.hostname.toLowerCase();
      var placeholder = /\.invalid$|\.example$|\.test$|^example\.(com|org|net)$|^localhost$/.test(host);
      return url.protocol === "https:" && !placeholder ? url.href : null;
    } catch (error) {
      return null;
    }
  }

  function text(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function each(selector, fn) {
    document.querySelectorAll(selector).forEach(fn);
  }

  function show(selector, visible) {
    each(selector, function (node) { node.hidden = !visible; });
  }

  var version = text(config.version);
  var fileSize = text(config.fileSize);
  var download = realUrl(config.downloadUrl);
  var releases = realUrl(config.releasesUrl);
  var store = realUrl(config.chromeWebStoreUrl);
  var sha = text(config.sha256).toLowerCase();

  // The Mac app.
  if (download) {
    each("[data-download-url]", function (link) {
      link.href = download;
      link.removeAttribute("aria-disabled");
      var label = link.querySelector("[data-label]");
      var ready = link.getAttribute("data-ready-label");
      if (label && ready) label.textContent = ready;
      link.addEventListener("click", function () {
        var group = link.closest("[data-download-group]");
        var note = group && group.querySelector("[data-download-note]");
        if (!note) return;
        note.innerHTML = "";
        note.append("Tu descarga empezó. Cuando termine, sigue los ");
        var guide = document.createElement("a");
        guide.href = "#instalar";
        guide.textContent = "pasos para abrirla la primera vez";
        note.append(guide, ".");
      });
    });
    show("[data-download-badge]", true);
    show("[data-download-badge-pending]", false);

    var meta = version ? "Versión " + version : "";
    if (fileSize) meta += meta ? " (" + fileSize + ")" : fileSize;
    meta += (meta ? " · " : "") + "macOS 14 o posterior";
    each("[data-release-meta]", function (node) {
      node.textContent = meta;
      node.hidden = false;
    });
    each("[data-release-file]", function (node) {
      var file = [version ? "versión " + version : "", fileSize].filter(Boolean).join(", ");
      if (!file) return;
      node.textContent = ", " + file;
      node.hidden = false;
    });
    if (/^[0-9a-f]{64}$/.test(sha)) {
      each("[data-release-sha-value]", function (node) { node.textContent = sha; });
      show("[data-release-sha]", true);
    }
  }

  if (releases) {
    each("[data-releases-url]", function (link) {
      link.href = releases;
      link.hidden = false;
    });
  }

  // The Chrome extension: «En revisión» until the store listing is real, then an «Agregar a Chrome» button.
  if (store) {
    each("[data-store-url]", function (link) {
      link.href = store;
      link.rel = "noopener";
    });
    show("[data-store-ready]", true);
    show("[data-store-pending]", false);
  }
})();
