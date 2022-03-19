//************************** *//
// Order form
//************************** *//

import OrderFormbox from "./lightbox/OrderFormbox.js";
import OrderBasicForm from "./forms/OrderBasicForm.js";

OrderFormbox.activate();
OrderBasicForm.activate();
// ***********************
// SELECTED ELEMENTS
// ***********************

const htmlTag = document.querySelector("html");
const formContainer = document.querySelector(".formbox");
const menuArea = document.querySelector(".menu");

// Form related variables and elements
let currentFoodName, currentFoodDescription, currentQty, currentFoodPrice;
const displayedQuantity = document.querySelector(".order__actual__qty");
const displayedPrice = document.querySelector(".order__price");

// Buttons to hanlde the order
const orderRemoveButton = document.querySelector("#order__qty__btn_left");
const orderAddButton = document.querySelector("#order__qty__btn_right");
const addToCart = document.querySelector(".Add__to__cart");

// ***********************
// FUNCTIONS
// ***********************

const displayBox = () => {
  const freeBackground = () => (htmlTag.style.overflowY = "hidden");

  freeBackground();
  formContainer.style.display = null;
};

const closeBox = () => {
  // first, set common variables back to undefined
  currentFoodName = undefined;
  currentFoodDescription = undefined;
  currentQty = undefined;
  currentFoodPrice = undefined;

  const unfreeBackground = () => (htmlTag.style.overflowY = null);
  const currentSelectedItem = document.querySelector(".item__being__selected");

  currentSelectedItem.classList.remove("item__being__selected");
  formContainer.style.display = "none";
  unfreeBackground();
};

const renderForm = (e) => {
  const orderForm = document.querySelector(".order__form");
  orderForm.style.display = null; // display the form

  const foodInformationElement = e.target.closest(".food__information");
  foodInformationElement.classList.add("item__being__selected"); // mark the clicked item as selected

  const collectCurrentFoodInfo = () => {
    // first collect information from the menu item
    const foodNameElement = document.querySelector(
      ".item__being__selected .food-name"
    );
    const foodDescriptionElement = document.querySelector(
      ".item__being__selected .food-description"
    );
    const foodPriceElement = document.querySelector(
      ".item__being__selected .food-price"
    );

    // set menu item varialbes
    currentFoodName = foodNameElement.textContent;
    currentFoodDescription = foodDescriptionElement
      ? foodDescriptionElement.textContent
      : null; // some foods don't have description

    currentQty = 1;
    currentFoodPrice = foodPriceElement.textContent;
  };

  const renderFoodInfoOnForm = () => {
    // selecting elements on the form
    const foodImgElement = document.querySelector(".order__image");
    const addImageToForm = (parent, foodName) => {
      const currentFoodImg = document.createElement("img");
      const nameWithoutSpace = foodName.split(" ").join("");
      currentFoodImg.src = `/img/order-imgs/${nameWithoutSpace}.jpg`;
      currentFoodImg.alt = nameWithoutSpace;
      if (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
      parent.appendChild(currentFoodImg);
    };

    const foodNameElement = document.querySelector(".order__name");
    const foodDescriptionElement = document.querySelector(
      ".order__description"
    );
    const orderInfoContainer = document.querySelector(".order__info");

    // adding information to the form

    // image
    addImageToForm(foodImgElement, currentFoodName);

    // name
    foodNameElement.textContent = currentFoodName;

    // description, some foods don't have description
    if (currentFoodDescription) {
      foodDescriptionElement.textContent = currentFoodDescription;
      orderInfoContainer.style.height = "13rem";
    } else {
      foodDescriptionElement.textContent = "";
      orderInfoContainer.style.height = "8rem";
    }

    // quantity
    displayedQuantity.textContent = currentQty;

    // price
    displayedPrice.textContent = `$ ${currentFoodPrice}`;
  };

  // get info for the currently selected item
  collectCurrentFoodInfo();

  // render info of current food on the form
  renderFoodInfoOnForm();
};

const updateQtyPrice = (qty) => {
  displayedQuantity.textContent = qty;
  const newPrice = `$ ${(currentFoodPrice * qty).toFixed(2)} `;
  displayedPrice.textContent = newPrice;
};

// ***********************
// EVENT LISTENERS
// ***********************

formContainer.addEventListener("click", (e) => {
  if (
    e.target.matches(".formbox") ||
    e.target.matches(".formbox__close_icon")
  ) {
    closeBox();
  }
});

menuArea.addEventListener("click", (e) => {
  if (e.target.matches(".order-button") || e.target.matches(".food-name")) {
    displayBox();
    renderForm(e);
  }
});

orderAddButton.addEventListener("click", (e) => {
  currentQty++;
  updateQtyPrice(currentQty);
});

orderRemoveButton.addEventListener("click", (e) => {
  if (currentQty <= 1) return;

  currentQty--;
  updateQtyPrice(currentQty);
});
