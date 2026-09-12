(function () {
  "use strict";
  var books = {
    setouchi: { title: "瀬戸内海の旅", total: 66, folder: "assets/book-setouchi" }
  };
  var container = document.getElementById("book-container");
  var number = document.getElementById("page-num");
  var title = document.getElementById("book-title");
  var pageFlip = null;

  function pagePaths(book) {
    return Array.from({ length: book.total }, function (_, index) {
      return book.folder + "/page-" + String(index + 1).padStart(2, "0") + ".jpg";
    });
  }
  function update() {
    if (!pageFlip) return;
    number.textContent = String(pageFlip.getCurrentPageIndex() + 1).padStart(2, "0") + " / " + String(pageFlip.getPageCount()).padStart(2, "0");
  }
  function loadBook(key) {
    var book = books[key];
    if (!book || !window.St || !St.PageFlip) return;
    if (pageFlip) { pageFlip.destroy(); container.innerHTML = ""; }
    title.textContent = book.title;
    pageFlip = new St.PageFlip(container, { width: 859, height: 612, size: "stretch", minWidth: 280, maxWidth: 859, minHeight: 199, maxHeight: 612, maxShadowOpacity: .42, showCover: false, mobileScrollSupport: false, useMouseEvents: true, usePortrait: true, autoSize: true });
    pageFlip.loadFromImages(pagePaths(book));
    pageFlip.on("flip", update); pageFlip.on("init", update);
  }
  document.getElementById("prevPage").addEventListener("click", function () { if (pageFlip) pageFlip.flipPrev(); });
  document.getElementById("nextPage").addEventListener("click", function () { if (pageFlip) pageFlip.flipNext(); });
  document.addEventListener("keydown", function (event) { if (!pageFlip || document.getElementById("lightbox").open) return; if (event.key === "ArrowLeft") pageFlip.flipPrev(); if (event.key === "ArrowRight") pageFlip.flipNext(); });
  document.addEventListener("dragstart", function (event) { if (event.target.tagName === "IMG" && event.target.closest("#book-container")) event.preventDefault(); });
  loadBook("setouchi");
}());
