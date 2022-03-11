const btnNavEl = document.querySelector(".mobile-nav-btn");
const headerEL = document.querySelector("header");
const reviewSexction = document.querySelector(".section-testimonials");

btnNavEl.addEventListener("click", (e) =>
  headerEL.classList.toggle("nav-open")
);
