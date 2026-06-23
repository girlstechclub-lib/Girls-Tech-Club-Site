document.addEventListener("DOMContentLoaded", async () => {
  const els = document.querySelectorAll("[data-include]");
  for (const el of els) {
    const file = el.getAttribute("data-include");
    const res = await fetch(file);
    el.innerHTML = await res.text();
  }
  setActive();
});

function setActive() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link[data-page]").forEach(a => {
    if (a.dataset.page === page) {
      a.classList.add("active");
    }
  });
}