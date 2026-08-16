(function () {
  "use strict";
  var dialog = document.getElementById("lightbox");
  var image = document.getElementById("lightboxImage");
  document.querySelectorAll("[data-lightbox]").forEach(function (button) {
    button.addEventListener("click", function () { image.src = button.dataset.lightbox; dialog.showModal(); });
  });
  document.getElementById("closeLightbox").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
  function updateProgress() {
    var max = document.documentElement.scrollHeight - innerHeight;
    var progress = max > 0 ? scrollY / max : 0;
    var bar = document.getElementById("progressBar");
    if (bar) bar.style.transform = "scaleX(" + progress + ")";
  }
  updateProgress(); addEventListener("scroll", updateProgress, { passive: true });
}());
