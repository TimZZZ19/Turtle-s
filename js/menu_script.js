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
    top: sectionRect.top + window.scrollY - 200,
    behavior: "smooth",
  });
});

// Scroll progress indicator using Intersection Observer API
const menuGroups = document.querySelectorAll(".menu-group");
const options = {
  root: null,
  rootMargin: "-49% 0px",
  threshold: 0,
};

const indicatorGroupObserver = new IntersectionObserver((entries) => {
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
  indicatorGroupObserver.observe(menuGroup);
});

// Reveal menu groups
const allGroups = document.querySelectorAll(".menu-group");
const revealGroup = function (entries, observer) {
  const [entry] = entries;
  entry.target.classList.remove("menu-group-hidden");
  observer.unobserve(entry.target);
};
const revealRroupObserver = new IntersectionObserver(revealGroup, {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  threshold: 0,
});
allGroups.forEach(function (group) {
  revealRroupObserver.observe(group);
  group.classList.add("menu-group-hidden");
});
