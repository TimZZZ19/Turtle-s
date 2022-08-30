const btnScrollTo = document.querySelector(".scroll-btn");
const reviewSection = document.querySelector("#review-section");
btnScrollTo.addEventListener("click", (e) => {
  const reviewRect = reviewSection.getBoundingClientRect();
  window.scrollTo({
    left: reviewRect.left + window.scrollX,
    top: reviewRect.top + window.scrollY - 75,
    behavior: "smooth",
  });
});

// LAZY LOADING IMGS
const images = document.querySelectorAll("[data-src]");
const imageOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px",
};
const preloadImage = (image) => {
  const src = image.getAttribute("data-src");
  if (!src) return;
  image.src = src;
};

const imageObserver = new IntersectionObserver((entries, imageObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    preloadImage(entry.target);
    imageObserver.unobserve(entry.target);
  });
}, imageOptions);

images.forEach((image) => {
  imageObserver.observe(image);
});
