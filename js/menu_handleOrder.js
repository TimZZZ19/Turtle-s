//************************** *//
// Order form
//************************** *//

import OrderFormbox from "./lightbox/OrderFormbox.js";

OrderFormbox.activate();
// ***********************
// SELECTED ELEMENTS
// ***********************
const htmlTag = document.querySelector("html");
const formContainer = document.querySelector(".formbox");

const menuArea = document.querySelector(".menu");

// ***********************
// FUNCTIONS
// ***********************

const displayBox = (e) => {
  const freeBackground = () => (htmlTag.style.overflowY = "hidden");

  if (!e.target.matches(".order-button") && !e.target.matches(".food-name"))
    return;

  freeBackground();
  formContainer.style.display = null;
};

const closeBox = (e) => {
  const unfreeBackground = () => (htmlTag.style.overflowY = null);
  if (
    !e.target.matches(".formbox") &&
    !e.target.matches(".formbox__close_icon")
  )
    return;

  formContainer.style.display = "none";
  unfreeBackground();
};

// ***********************
// EVENT LISTENERS
// ***********************

formContainer.addEventListener("click", (e) => closeBox(e));

menuArea.addEventListener("click", (e) => displayBox(e));
