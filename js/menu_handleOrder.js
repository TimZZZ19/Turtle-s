import OrderFormbox from "./components/menu_order_UI/OrderFormbox.js";
import OrderBasicForm from "./components/menu_order_UI/OrderBasicForm.js";
import SizeOptions from "./components/menu_order_UI/sizeOptions/SizeOptions.js";

// activate form and form components
OrderFormbox.activate();
OrderBasicForm.activate();
SizeOptions.activate();

// ************************************************************
// GLOBAL VARIABLES      GLOBAL VARIABLES     GLOBAL VARIABLES
// ************************************************************

// record everyfood's quantity
const allFoodNames = document.querySelectorAll(".food-name");
const quantities = {};
for (const name of allFoodNames) {
  const key = name.textContent.split(" ").join("");
  quantities[key] = 1;
}

// record choice of size
const setsOfOptions = document.querySelectorAll(".size__options");
const sizeChoiceRecord = {};
for (const set of setsOfOptions) {
  const key =
    set.previousElementSibling.firstElementChild.firstElementChild.textContent
      .split(" ")
      .join("");
  sizeChoiceRecord[key] = "small";
}

// Form related variables and elements.
// currentFoodNameNoSpace is used as key or img src,
// currentFoodNameOriginal is what's rendered as the title of a form
let currentFoodNameNoSpace,
  currentFoodNameOriginal,
  currentFoodDescription,
  currentFoodPrice;

// in case there are different sizes
let currentSmallPrice, currentMediumPrice, currentLargePrice;

// ***********************************************************
// FUNCTIONS    FUNCTIONS   FUNCTIONS   FUNCTIONS   FUNCTIONS
// ***********************************************************

// freezing and unfreezing background
const htmlTag = document.querySelector("html");
const freeBackground = () => (htmlTag.style.overflowY = "hidden");
const unfreeBackground = () => (htmlTag.style.overflowY = null);

// for displaying price and quantity
const displayedPrice = document.querySelector(".order__price");
const displayedQuantity = document.querySelector(".order__actual__qty");

// functions
const displayBox = () => {
  freeBackground();
  OrderFormbox.displayOrderFormbox();
};

const closeBox = () => {
  // first, set common variables to null
  currentFoodNameNoSpace = null;
  currentFoodNameOriginal = null;
  currentFoodDescription = null;
  currentFoodPrice = null;

  currentSmallPrice = null;
  currentMediumPrice = null;
  currentLargePrice = null;

  // second, the currently selected item is no more being selected
  const currentSelectedItem = document.querySelector(".item__being__selected");
  currentSelectedItem.classList.remove("item__being__selected");

  // third, close the form and all the form components
  OrderFormbox.closeOrderFormbox();
  OrderBasicForm.closeBasicForm();
  SizeOptions.closeOptions();

  // lastly, unfreeze the background
  unfreeBackground();
};

const renderForm = (e) => {
  OrderBasicForm.displayBasicForm(); // display the form

  const foodInformationElement = e.target.closest(".food__information");
  foodInformationElement.classList.add("item__being__selected"); // mark the clicked item as selected

  const renderName = () => {
    const foodNameElement = document.querySelector(
      ".item__being__selected .food-name"
    );
    currentFoodNameOriginal = foodNameElement.textContent;
    currentFoodNameNoSpace = currentFoodNameOriginal.split(" ").join("");

    const currentFoodNameElement = document.querySelector(".order__name");
    currentFoodNameElement.textContent = currentFoodNameOriginal;
  };

  const renderImage = () => {
    // rendering information to the form
    const foodImgElement = document.querySelector(".order__image");

    // image
    const addImageToForm = (parent, foodName) => {
      const currentFoodImg = document.createElement("img");

      currentFoodImg.src = `/img/order-imgs/${foodName}.jpg`;
      currentFoodImg.alt = foodName;
      if (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
      parent.appendChild(currentFoodImg);
    };
    addImageToForm(foodImgElement, currentFoodNameNoSpace);
  };

  const renderDescription = () => {
    const foodDescriptionElement = document.querySelector(
      ".item__being__selected .food-description"
    );
    const orderInfoContainer = document.querySelector(".order__info");

    currentFoodDescription = foodDescriptionElement
      ? foodDescriptionElement.textContent
      : null; // some foods don't have description
    const orderDescriptionElement = document.querySelector(
      ".order__description"
    );
    if (currentFoodDescription) {
      orderDescriptionElement.textContent = currentFoodDescription;
      orderInfoContainer.style.height = "13rem";
    } else {
      orderDescriptionElement.textContent = "";
      orderInfoContainer.style.height = "8rem";
    }
  };

  const setDifferentPrices = () => {
    if (currentFoodPrice.includes("S")) {
      currentSmallPrice = currentFoodPrice.split(",")[0].slice(-5);
    }
    if (currentFoodPrice.includes("M")) {
      currentMediumPrice = currentFoodPrice.split(",")[1].slice(-5);
    }
    if (currentFoodPrice.includes("L")) {
      currentLargePrice = currentFoodPrice.includes("M")
        ? currentFoodPrice.split(",")[2].slice(-5)
        : currentFoodPrice.split(",")[1].slice(-5);
    }

    if (sizeChoiceRecord[currentFoodNameNoSpace] === "small")
      currentFoodPrice = currentSmallPrice;

    if (sizeChoiceRecord[currentFoodNameNoSpace] === "medium")
      currentFoodPrice = currentMediumPrice;

    if (sizeChoiceRecord[currentFoodNameNoSpace] === "large")
      currentFoodPrice = currentLargePrice;
  };

  const renderPrice = () => {
    const foodPriceElement = document.querySelector(
      ".item__being__selected .food-price"
    );

    currentFoodPrice = foodPriceElement.textContent;

    setDifferentPrices(); // if there are different prices
    // selecting elements on the form
    // price
    displayedPrice.textContent = `$ ${(
      currentFoodPrice * quantities[currentFoodNameNoSpace]
    ).toFixed(2)}`;

    // if there are different size options available, display them
    if (currentSmallPrice) SizeOptions.displayOptions(currentMediumPrice);
  };

  const renderQuantity = () => {
    console.log(orderRemoveButton);

    // quantity
    if (
      quantities[currentFoodNameNoSpace] === 1 &&
      !orderRemoveButton.classList.contains("btn__inactive")
    ) {
      // if left btn doesn't have .btn__inactive, add it
      orderRemoveButton.classList.add("btn__inactive");
    }
    displayedQuantity.textContent = quantities[currentFoodNameNoSpace];
  };

  renderName();

  renderImage();

  renderDescription();

  renderPrice();

  renderQuantity();
};

const updateQtyPrice = (qty) => {
  displayedQuantity.textContent = qty;
  const newPrice = `$ ${(currentFoodPrice * qty).toFixed(2)} `;
  displayedPrice.textContent = newPrice;
};

// *********************************************************
// EVENT LISTENERS      EVENT LISTENERS     EVENT LISTENERS
// *********************************************************

// for closing and opening box
const formContainer = document.querySelector(".formbox__container");
const menuArea = document.querySelector(".menu");

// Buttons to hanlde the order
const orderRemoveButton = document.querySelector("#order__qty__btn_left");
const orderAddButton = document.querySelector("#order__qty__btn_right");
const sizeOptionsContainer = document.querySelector(".size_options__container");

// event listeners
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
  quantities[currentFoodNameNoSpace]++;
  updateQtyPrice(quantities[currentFoodNameNoSpace]);

  // if left btn has .btn__inactive, remove it
  if (orderRemoveButton.classList.contains("btn__inactive")) {
    orderRemoveButton.classList.remove("btn__inactive");
  }
});

orderRemoveButton.addEventListener("click", (e) => {
  if (quantities[currentFoodNameNoSpace] < 2) {
    return;
  }

  quantities[currentFoodNameNoSpace]--;
  updateQtyPrice(quantities[currentFoodNameNoSpace]);

  // when qty gets decreased to 1, add btn__inactive
  if (quantities[currentFoodNameNoSpace] === 1) {
    orderRemoveButton.classList.add("btn__inactive");
  }
});

sizeOptionsContainer.addEventListener("click", (e) => {
  if (e.target.matches(".size_options__container")) return;

  const updateDisplayedPrice = () => {
    displayedPrice.textContent = `$ ${(
      currentFoodPrice * quantities[currentFoodNameNoSpace]
    ).toFixed(2)}`;
  };

  if (e.target.value === "small" && currentFoodPrice !== currentSmallPrice) {
    currentFoodPrice = currentSmallPrice;
    sizeChoiceRecord[currentFoodNameNoSpace] = "small";
    updateDisplayedPrice();
  }

  if (e.target.value === "medium" && currentFoodPrice !== currentMediumPrice) {
    currentFoodPrice = currentMediumPrice;
    sizeChoiceRecord[currentFoodNameNoSpace] = "medium";
    updateDisplayedPrice();
  }

  if (e.target.value === "large" && currentFoodPrice !== currentLargePrice) {
    currentFoodPrice = currentLargePrice;
    sizeChoiceRecord[currentFoodNameNoSpace] = "large";
    updateDisplayedPrice();
  }
});
