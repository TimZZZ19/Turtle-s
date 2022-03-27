import OrderBox from "./components/menu_order_UI/OrderBox.js";
import OrderBasicForm from "./components/menu_order_UI/OrderBasicForm.js";
import SizeOptions from "./components/menu_order_UI/options/SizeOptions.js";
import SubstituteOptions from "./components/menu_order_UI/options/substituteOptions.js";

// activate form and form components
OrderBox.activate();
OrderBasicForm.activate();
SizeOptions.activate();
SubstituteOptions.activate();

// ************************************************************
// Collecting data
// ************************************************************

// Create kvps for every food item, these kvps will be used to store
// user data and be constantly updated and accessed.
const items = {};
const menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach((item) => {
  // get current item's key and create an object for it
  const key = item.key;
  items[key] = {};

  // methods to add properties to each item
  const addFoodName = () => {
    items[key].foodName = item.querySelector(".food-name").textContent;
  };
  const addDescription = () => {
    const foodDescriptionElement = item.querySelector(".food-description");
    items[key].description = foodDescriptionElement
      ? foodDescriptionElement.textContent
      : null;
  };
  const addQuantity = () => {
    items[key].quantity = 0;
  };
  const addPrice = () => {
    const priceElement = item.querySelector(".food-price");
    const priceContent = priceElement.textContent;
    if (priceElement.classList.contains("size__options")) {
      const smallPrice = priceContent.split(",")[0].slice(-5);
      const mediumPrice = priceContent.includes("M")
        ? priceContent.split(",")[1].slice(-5)
        : null;
      const largePrice = priceContent.includes("M")
        ? priceContent.split(",")[2].slice(-5)
        : priceContent.split(",")[1].slice(-5);

      // set small as default
      items[key].price = smallPrice;
      items[key].size = "small";

      // since different sizes are available, set different prices
      items[key].sizePrices = {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice,
      };
    } else {
      items[key].price = priceContent;
    }
  };
  const addSubstitutes = () => {
    const substituteElements = item.querySelectorAll(".substitute");
    if (substituteElements.length !== 0) {
      items[key].substitutes = [];
      substituteElements.forEach((substitute) => {
        const substituteObject = {
          name: substitute.children[0].textContent.slice(5),
          price: substitute.children[1].textContent,
          isChecked: false,
        };
        items[key].substitutes.push(substituteObject);
      });
    }
  };

  // call above methods to add data
  addFoodName();
  addDescription();
  addQuantity();
  addPrice();
  addSubstitutes();
});

// ***********************************************************
// Utitlity functions
// ***********************************************************

// functions for rendering form components
const renderImage = (foodName) => {
  const currentFoodNameNoSpace = foodName.split(" ").join("");
  OrderBasicForm.renderImage(currentFoodNameNoSpace);
};

const renderName = (foodName) => {
  OrderBasicForm.renderName(foodName);
};

const renderDescription = (description) => {
  OrderBasicForm.renderDescription(description);
};

const renderQuantity = (quantity) => {
  OrderBasicForm.renderQuantity(quantity);
};

const renderPrice = (currentItem) => {
  const currentSize = currentItem.size;
  const currentSizePrices = currentItem.sizePrices;
  const currentSubstitutes = currentItem.substitutes;

  const currentQuantity = currentItem.quantity;
  let currentPrice = currentItem.price;

  // if different sizes are present for this item,
  // then set the current price to whatever the current size-price is
  if (currentSize && currentSizePrices) {
    const currentSizePrice = currentSizePrices[currentSize];
    currentPrice = currentSizePrice;
  }

  // if the current item has substitutes, add substitutes prices to its price
  if (currentSubstitutes) {
    currentSubstitutes.forEach((substitute) => {
      if (substitute.isChecked) {
        currentPrice = +currentPrice + +substitute.price;
      }
    });
  }

  const priceToBeRendered = currentPrice * currentQuantity;
  OrderBasicForm.renderPrice(priceToBeRendered);
};

const renderSizeOptions = (currentItem) => {
  const currentSize = currentItem.size;
  if (currentSize) {
    const mediumPrice = currentItem.sizePrices.medium;
    SizeOptions.displayOptions(currentSize, mediumPrice);
  }
};

const renderSubstituteOptions = (substitutes) => {
  if (substitutes) {
    SubstituteOptions.displayOptions(substitutes);
  }
};

const renderForm = (e) => {
  const currentKey = e.target.closest(".menu-item").key;
  const currentItem = items[currentKey];
  // assign the form the current key
  // so the form can be identified and the current item can be accessed
  // from the event listeners below
  OrderBasicForm.displayBasicForm(currentKey);

  renderImage(currentItem.foodName);

  renderName(currentItem.foodName);

  renderDescription(currentItem.description);

  renderQuantity(currentItem.quantity);

  renderPrice(currentItem);

  renderSizeOptions(currentItem);

  renderSubstituteOptions(currentItem.substitutes);
};

const openBox = (e) => {
  const freezeBackground = () => {
    document.querySelector("html").style.overflowY = "hidden";
  };

  freezeBackground();
  OrderBox.OpenOrderBox();
  renderForm(e);
};

const closeBox = () => {
  const unfreezeBackground = () => {
    document.querySelector("html").style.overflowY = null;
  };

  OrderBox.closeOrderBox();
  OrderBasicForm.closeBasicForm();
  SizeOptions.closeOptions();
  SubstituteOptions.closeOptions();

  unfreezeBackground();
};

const getCurrentItem = (e) => {
  const currentKey = e.target.closest(".order__form").key;
  const currentItem = items[currentKey];
  return currentItem;
};

const updateQuantity = (e, action) => {
  const currentItem = getCurrentItem(e);

  if (action === "add") currentItem.quantity++;
  if (action === "remove" && currentItem.quantity > 0) currentItem.quantity--;

  renderQuantity(currentItem.quantity);
  renderPrice(currentItem);
};

// *********************************************************
// EVENT LISTENERS      EVENT LISTENERS     EVENT LISTENERS
// *********************************************************

// for closing and opening box
const menuArea = document.querySelector(".menu");
const formContainer = document.querySelector(".formbox__container");

// buttons to hanlde the order
const orderAddButton = document.querySelector("#order__qty__btn_right");
const orderRemoveButton = document.querySelector("#order__qty__btn_left");
const sizeOptionsContainer = document.querySelector(".size_options__container");
const substituteOptionsContainer = document.querySelector(
  ".order__substitutes__container"
);
const addToCart = document.querySelector(".Add__to__cart");

// open orderbox
menuArea.addEventListener("click", (e) => {
  if (!e.target.matches(".order-button") && !e.target.matches(".food-name"))
    return;

  openBox(e);
});

// close orderbox
formContainer.addEventListener("click", (e) => {
  if (
    !e.target.matches(".formbox__container") &&
    !e.target.matches(".formbox__close_icon")
  )
    return;

  closeBox();
});

// add quantity
orderAddButton.addEventListener("click", (e) => {
  updateQuantity(e, "add");
});

// remove quantity
orderRemoveButton.addEventListener("click", (e) => {
  updateQuantity(e, "remove");
});

// choose size
sizeOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(".size__option__input")) return;

  const currentItem = getCurrentItem(e);
  currentItem.size = e.target.id;

  renderSizeOptions(currentItem);
  renderPrice(currentItem);
});

// choose substitute
substituteOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(".substitute__input__checkbox")) return;

  const currentItem = getCurrentItem(e);
  const currentSubstitutes = currentItem.substitutes;

  currentSubstitutes.forEach((substitute) => {
    if (substitute.name.split(" ").join("") == e.target.id) {
      substitute.isChecked = e.target.checked;
    }
  });

  renderSubstituteOptions(currentItem.substitutes);
  renderPrice(currentItem);
});

// add to cart
addToCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("Add__to__cart_inactive")) return;
  console.log("Add data to cart");
});
