//************************** *//
// Order form
//************************** *//

import OrderFormbox from "./components/menu_order_UI/OrderFormbox.js";
import OrderBasicForm from "./components/menu_order_UI/OrderBasicForm.js";
import SizeOptions from "./components/menu_order_UI/SizeOptions.js";

OrderFormbox.activate();
OrderBasicForm.activate();
SizeOptions.activate();
// ***********************
// SELECTED ELEMENTS
// ***********************

const htmlTag = document.querySelector("html");
const formContainer = document.querySelector(".formbox__container");
const menuArea = document.querySelector(".menu");

// record every food and its quantity
const allFoodNames = document.getElementsByClassName("food-name");
const qtyToBeAdded = {};
for (const name of allFoodNames) {
  const key = name.textContent.split(" ").join("");
  qtyToBeAdded[key] = 1;
}

// Form related variables and elements.
// currentFoodName is used as key or img src,
// orderName is what's rendered as the title of a form
let currentFoodName, orderName, currentFoodDescription, currentFoodPrice;
let smallPrice, mediumPrice, largePrice; // in case there are different sizes

const displayedQuantity = document.querySelector(".order__actual__qty");
const displayedPrice = document.querySelector(".order__price");

// Buttons to hanlde the order
const orderRemoveButton = document.querySelector("#order__qty__btn_left");
const orderAddButton = document.querySelector("#order__qty__btn_right");
const addToCart = document.querySelector(".Add__to__cart");

const optionsContainer = document.querySelector(".options__container");

// ***********************
// FUNCTIONS
// ***********************

const displayBox = () => {
  const freeBackground = () => (htmlTag.style.overflowY = "hidden");

  freeBackground();
  OrderFormbox.displayOrderFormbox();
};

const closeBox = () => {
  // first, set common variables to null
  currentFoodName = null;
  orderName = null;
  currentFoodDescription = null;
  currentFoodPrice = null;

  smallPrice = null;
  mediumPrice = null;
  largePrice = null;

  const unfreeBackground = () => (htmlTag.style.overflowY = null);
  const currentSelectedItem = document.querySelector(".item__being__selected");

  currentSelectedItem.classList.remove("item__being__selected");
  OrderFormbox.closeOrderFormbox();
  OrderBasicForm.closeBasicForm();
  SizeOptions.closeOptions();
  unfreeBackground();
};

const renderForm = (e) => {
  OrderBasicForm.displayBasicForm(); // display the form

  const foodInformationElement = e.target.closest(".food__information");
  foodInformationElement.classList.add("item__being__selected"); // mark the clicked item as selected

  const setDifferentPrices = () => {
    if (currentFoodPrice.includes("S")) {
      smallPrice = currentFoodPrice.split(",")[0].slice(-5);
    }
    if (currentFoodPrice.includes("M")) {
      mediumPrice = currentFoodPrice.split(",")[1].slice(-5);
    }
    if (currentFoodPrice.includes("L")) {
      largePrice = currentFoodPrice.includes("M")
        ? currentFoodPrice.split(",")[2].slice(-5)
        : currentFoodPrice.split(",")[1].slice(-5);
    }
  };

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
    orderName = foodNameElement.textContent;
    currentFoodName = orderName.split(" ").join("");
    currentFoodDescription = foodDescriptionElement
      ? foodDescriptionElement.textContent
      : null; // some foods don't have description

    currentFoodPrice = foodPriceElement.textContent;
    setDifferentPrices();
    currentFoodPrice = smallPrice ? smallPrice : currentFoodPrice;
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

    const orderNameElement = document.querySelector(".order__name");
    const orderDescriptionElement = document.querySelector(
      ".order__description"
    );
    const orderInfoContainer = document.querySelector(".order__info");

    // adding information to the form

    // image
    addImageToForm(foodImgElement, currentFoodName);

    // name
    orderNameElement.textContent = orderName;

    // description, some foods don't have description
    if (currentFoodDescription) {
      orderDescriptionElement.textContent = currentFoodDescription;
      orderInfoContainer.style.height = "13rem";
    } else {
      orderDescriptionElement.textContent = "";
      orderInfoContainer.style.height = "8rem";
    }

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

    // if there are different size options available, display them
    if (smallPrice) SizeOptions.displayOptions(mediumPrice);
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
    e.target.matches(".formbox__container") ||
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

optionsContainer.addEventListener("click", (e) => {
  if (e.target.matches(".options__container")) return;

  const updateSizeOptionPrice = () => {
    displayedPrice.textContent = `$ ${(
      currentFoodPrice * qtyToBeAdded[currentFoodName]
    ).toFixed(2)}`;
  };

  if (e.target.value === "small" && currentFoodPrice !== smallPrice) {
    currentFoodPrice = smallPrice;
    updateSizeOptionPrice();
  }

  if (e.target.value === "medium" && currentFoodPrice !== mediumPrice) {
    currentFoodPrice = mediumPrice;
    updateSizeOptionPrice();
  }

  if (e.target.value === "large" && currentFoodPrice !== largePrice) {
    currentFoodPrice = largePrice;
    updateSizeOptionPrice();
  }
});
