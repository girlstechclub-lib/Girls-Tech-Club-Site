document.addEventListener("DOMContentLoaded", async () => {
  const els = document.querySelectorAll("[data-include]");
  for (const el of els) {
    const file = el.getAttribute("data-include");
    const path = file.startsWith("/") ? file : `/${file}`;
    const res = await fetch(path);
    el.innerHTML = await res.text();
  }
  setActive();
});

function setActive() {
  let page = window.location.pathname.replace(/\/$/, "").split("/").pop();
  if (!page || page === "index.html") {
    page = "home";
  }
  document.querySelectorAll(".nav-link[data-page]").forEach(a => {
    if (a.dataset.page === page) {
      a.classList.add("active");
    }
  });
}