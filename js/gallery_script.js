import Lightbox from "./lightbox/Lightbox.js";

Lightbox.activate();

//************************** *//
// VARIABLES
//************************** *//

const htmlTag = document.getElementsByTagName("html");

const imageArray = [
  "CobbSalad",
  "Croatia",
  "dog",
  "dudes",
  "dudes2",
  "dudes3",
  "everybody",
  "everybody2",
  "fullhouse",
  "halloweenKids2",
  "halloweenKids",
  "kid",
  "kids",
  "ladies",
  "NoOneBartender",
  "oldHouse2",
  "oldHouse",
  "special-monday",
  "special-saturday",
  "special-saturday2",
  "special",
  "Startender",
  "steakSalad",
  "streetview2",
  "streetview3",
];
let currentImageIndex;
let leftHidden = false;
let rightHidden = false;

const galleryContainer = document.querySelector(".gallery-container");

const contentContainer = document.querySelector(".lightbox__content");
const leftButton = document.querySelector("#lightbox__left");
const rightButton = document.querySelector("#lightbox__right");

const lightBox = document.querySelector("#lightbox");
const lightBoxCloseButton = document.querySelector("#lightbox__close");
const content = document.querySelector(".lightbox__content");

const galleryPageNumber = document.querySelector(".gallery_page_number");

//************************** *//
// FUNCTIONS
//************************** *//

const popUpImage = (imageIndex) => {
  galleryPageNumber.textContent = `${imageIndex + 1}/${imageArray.length}`;

  const selectedImageName = imageArray[imageIndex];
  const selectedImageElement = document.createElement("img");
  selectedImageElement.src = `/img/gallery-imgs/${selectedImageName}.jpg`;
  Lightbox.show(selectedImageElement);
  freezeScrolling();
};

const freezeScrolling = () => {
  htmlTag[0].style.height = "100%";
  htmlTag[0].style.overflowY = "hidden";
};

const unfreezeScrolling = () => {
  htmlTag[0].style.height = null;
  htmlTag[0].style.overflowY = null;
};

const closeLightbox = () => {
  lightBox.style.display = "none";
  content.innerHTML = "";
  unfreezeScrolling();
};

const hideButton = (side) => {
  if (side === "left") {
    leftButton.style.visibility = "hidden";
    leftHidden = true;
  }

  if (side === "right") {
    rightButton.style.visibility = "hidden";
    rightHidden = true;
  }
};

const unhideButton = (side) => {
  if (side === "left") {
    leftButton.style.visibility = "visible";
    leftHidden = false;
  }

  if (side === "right") {
    rightButton.style.visibility = "visible";
    rightHidden = false;
  }
};

const moveTowardsLeft = () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    popUpImage(currentImageIndex);

    if (rightHidden) unhideButton("right");
    if (currentImageIndex === 0) hideButton("left");
  }
};

const moveTowardsRight = () => {
  if (currentImageIndex < imageArray.length - 1) {
    currentImageIndex++;
    popUpImage(currentImageIndex);

    if (leftHidden) unhideButton("left");
    if (currentImageIndex === imageArray.length - 1) hideButton("right");
  }
};

//************************** *//
// EVENT LISTENERS
//************************** *//
// Pop up the clicked image - start
galleryContainer.addEventListener("click", (e) => {
  currentImageIndex = imageArray.indexOf(e.target.id);

  if (e.target.matches(".gallery-container")) return;

  popUpImage(currentImageIndex);

  if (leftHidden) unhideButton("left");

  if (rightHidden) unhideButton("right");

  if (currentImageIndex === 0) hideButton("left");

  if (currentImageIndex === imageArray.length - 1) hideButton("right");
});
// Pop up the clicked image - end

// Change image using buttons - start
leftButton.addEventListener("click", (e) => {
  moveTowardsLeft();
});

rightButton.addEventListener("click", (e) => {
  moveTowardsRight();
});
// Change image using buttons - end

// Close lightbox - start
lightBox.addEventListener("mousedown", (e) => {
  if (e.target.matches("#lightbox")) {
    closeLightbox();
  }
});

lightBoxCloseButton.addEventListener("click", (e) => {
  closeLightbox();
});
// Close lightbox - end

//************************** *//
// SWIPTE GESTURE - start
//************************** *//

let touchStartX = 0;
let touchEndX = 0;

const handleGesture = () => {
  if (touchEndX < touchStartX) moveTowardsRight();
  if (touchEndX > touchStartX) moveTowardsLeft();
};

contentContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

contentContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});
//************************** *//
// SWIPTE GESTURE - end
//************************** *//
