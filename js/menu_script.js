const menuNavbar = document.querySelector(".menu-navbar");

menuNavbar.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("menu-category")) {
    console.log(e);
    console.log(this);

    const id = e.target.getAttribute("href");
    const menuGroupSection = document.querySelector(id);
    const sectionRect = menuGroupSection.getBoundingClientRect();

    window.scrollTo({
      left: sectionRect.left + window.scrollX,
      top: sectionRect.top + window.scrollY - 150,
      behavior: "smooth",
    });
  }
});

document.querySelector("#app").addEventListener("click", function (e) {
  console.log(e);
  console.log(this);
});

// Reveal menu groups
const allGroups = document.querySelectorAll(".menu-group");
const revealGroup = function (entries, observer) {
  const [entry] = entries;
  entry.target.classList.remove("menu-group-hidden");
  observer.unobserve(entry.target);
};
const groupObserver = new IntersectionObserver(revealGroup, {
  root: null,
  threshold: 0.15,
});
allGroups.forEach(function (group) {
  groupObserver.observe(group);
  group.classList.add("menu-group-hidden");
});

// Reveal menu nav bar

const pizzaGroup = document.querySelector("#pizza");
const revealBar = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  menuNavbar.classList.remove("menu-navbar-hidden");
};
const pizzaObserver = new IntersectionObserver(revealBar, {
  root: null,
  threshold: 0.9,
});
pizzaObserver.observe(pizzaGroup);
