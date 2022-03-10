const menuNavbar = document.querySelector(".menu-navbar");
let activeCategory = menuNavbar.firstElementChild;
activeCategory.classList.add("menu-category-active");

const updateActiveCategory = (newActiveCategory) => {
  activeCategory = document.querySelector(".menu-category-active");
  activeCategory.classList.remove("menu-category-active");
  newActiveCategory.classList.add("menu-category-active");
};

menuNavbar.addEventListener("click", (e) => {
  if (!e.target.matches(".menu-category")) return; //guard clause

  updateActiveCategory(e.target);

  e.preventDefault();
  const id = e.target.getAttribute("href");
  const menuGroupSection = document.querySelector(id);
  const sectionRect = menuGroupSection.getBoundingClientRect();
  window.scrollTo({
    left: sectionRect.left + window.scrollX,
    top: sectionRect.top + window.scrollY - 150,
    behavior: "smooth",
  });
});

// Show active menu group using Intersection Observer API
const menuGroups = document.querySelectorAll(".menu-group");
const options = {
  root: null,
  rootMargin: "-49% 0px",
  threshold: 0,
};

const groupObserver = new IntersectionObserver((entries, groupObserver) => {
  entries.forEach((entry) => {
    console.log(entry);

    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute("id");
    const query = `#menu-category-${id}`;
    const currentActiveCategory = document.querySelector(query);

    updateActiveCategory(currentActiveCategory);
    // groupObserver.unobserve(entry.target);
  });
}, options);

menuGroups.forEach((menuGroup) => {
  groupObserver.observe(menuGroup);
});
