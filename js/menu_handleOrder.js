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

// record every food and its quantity
const allFoodNames = document.getElementsByClassName("food-name");
const qtyToBeAdded = {};
for (const name of allFoodNames) {
  const key = name.textContent.split(" ").join("");
  qtyToBeAdded[key] = 1;
}

// Form related variables and elements
let currentFoodName, currentFoodDescription, currentFoodPrice;
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
    currentFoodName = foodNameElement.textContent.split(" ").join("");
    currentFoodDescription = foodDescriptionElement
      ? foodDescriptionElement.textContent
      : null; // some foods don't have description

    currentFoodPrice = foodPriceElement.textContent;
  };

  const renderFoodInfoOnForm = () => {
    // selecting elements on the form
    const foodImgElement = document.querySelector(".order__image");
    const addImageToForm = (parent, foodName) => {
      const currentFoodImg = document.createElement("img");

      currentFoodImg.src = `/img/order-imgs/${foodName}.jpg`;
      currentFoodImg.alt = foodName;
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

    console.log(qtyToBeAdded[currentFoodName]);
    // quantity
    if (
      qtyToBeAdded[currentFoodName] === 1 &&
      !orderRemoveButton.classList.contains("btn__inactive")
    ) {
      // if left btn doesn't have .btn__inactive, add it
      orderRemoveButton.classList.add("btn__inactive");
    }

    displayedQuantity.textContent = qtyToBeAdded[currentFoodName];

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
  qtyToBeAdded[currentFoodName]++;
  updateQtyPrice(qtyToBeAdded[currentFoodName]);

  // if left btn has .btn__inactive, remove it
  if (orderRemoveButton.classList.contains("btn__inactive")) {
    orderRemoveButton.classList.remove("btn__inactive");
  }
});

orderRemoveButton.addEventListener("click", (e) => {
  if (qtyToBeAdded[currentFoodName] < 2) {
    return;
  }

  qtyToBeAdded[currentFoodName]--;
  updateQtyPrice(qtyToBeAdded[currentFoodName]);

  // when qty gets decreased to 1, add btn__inactive
  if (qtyToBeAdded[currentFoodName] === 1) {
    orderRemoveButton.classList.add("btn__inactive");
  }
});
