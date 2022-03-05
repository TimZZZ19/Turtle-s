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
