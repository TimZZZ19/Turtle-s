import OrderPageBNG from "./OrderPageBNG.js";
import OrderBasicForm from "./OrderBasicForm.js";
import SizeOptions from "./options/SizeOptions.js";
import Constitutes from "./options/Constitutes.js";
import SubItems from "./options/SubItems.js";
import Toppings from "./options/Toppings.js";
import ATC from "./ATC.js";

// ************************************************************
// INITIALIZATION - components activation and local db creation
// ************************************************************

// *****************
// Components Activation
// ****************

// activate form and form components
OrderPageBNG.activate();
OrderBasicForm.activate();
ATC.activate();

SizeOptions.activate();

Constitutes.activate("dressing");
Constitutes.activate("pasta");

// Subitem can be substitute, extra
SubItems.activate("substitute");
SubItems.activate("extra");

Toppings.activate();

// *****************
// Local Database Creation
// ****************

// Store every menu item as an object in local storage.
const storeMenuItemsInLS = (menuItemElements) => {
  menuItemElements.forEach((item) => {
    // If LS has already stored this item, then skip to the next loop;
    if (localStorage.getItem(item.key)) return;

    // if not, then make an object out of current item and store it in LS.
    const obj = {};
    obj["ATCStatusConditions"] = {}; // These are the criteria for determining ATC's status

    // methods to add properties to each item
    const addLSKey = () => {
      obj.LSkey = item.key;
    };
    const addFoodName = () => {
      obj.foodName = item.querySelector(".food-name").textContent;
    };
    const addDescription = () => {
      const foodDescriptionElement = item.querySelector(".food-description");
      obj.description = foodDescriptionElement
        ? foodDescriptionElement.textContent
        : null;
    };
    const addQuantity = () => {
      obj.quantity = 0;
      obj.ATCStatusConditions["qtyIsSet"] = false;
    };
    const addSize = () => {
      const priceElement = item.querySelector(".food-price");
      const priceContent = priceElement.textContent;

      if (!priceElement.classList.contains("size__options")) return;

      const smallPrice = priceContent.split(",")[0].slice(-5);
      const mediumPrice = priceContent.includes("M")
        ? Number(priceContent.split(",")[1].slice(-5))
        : null;
      const largePrice = priceContent.includes("M")
        ? priceContent.split(",")[2].slice(-5)
        : priceContent.split(",")[1].slice(-5);

      // set sizeInfo property
      obj.sizeInfo = {};
      // add chozenSize and set null as default
      obj.sizeInfo.chozenSize = null;

      // add sizePricePairs
      obj.sizeInfo.sizePricePairs = {
        small: Number(smallPrice),
        medium: mediumPrice,
        large: Number(largePrice),
      };

      obj.ATCStatusConditions["sizeIsSet"] = false;
    };
    const addUnitPrice = () => {
      const priceElement = item.querySelector(".food-price");
      const priceContent = Number(priceElement.textContent);
      const sizeInfo = obj.sizeInfo;

      if (sizeInfo) {
        const sizeKey = sizeInfo.chozenSize;
        const kvp = sizeInfo.sizePricePairs;
        obj.unitPrice = kvp[sizeKey];
      } else {
        obj.unitPrice = priceContent;
      }
    };
    const addCurrentPrice = () => {
      obj["currentPrice"] = 0;
    };

    // Constitute can be dressing or pasta
    const addConstitutes = (constituteType) => {
      const constituteElements = item
        .closest(".menu-group")
        .querySelectorAll(`.${constituteType}`);

      if (constituteElements.length === 0) return;

      const propertyName = `${constituteType}Info`;
      const chozenConsitute = `chozen${capitalizeFirst(constituteType)}`;
      const constituteOptions = `${constituteType}Options`;

      obj[propertyName] = {};
      obj[propertyName][constituteOptions] = [];

      // This is the first element in the options array,
      // it stands for the default choice of constitute
      obj[propertyName][constituteOptions].push("-- --");

      constituteElements.forEach((element) => {
        obj[propertyName][constituteOptions].push(element.textContent);
      });

      // Choose the first element in the options array as the default chozen substitute
      obj[propertyName][chozenConsitute] =
        obj[propertyName][constituteOptions][0];

      obj.ATCStatusConditions[`${constituteType}IsSet`] = false;
    };

    // Subitems can be substitutes, extras
    const addSubItems = (subItem) => {
      const subItemElements = item.querySelectorAll(
        `.${subItem}__in__sub_item`
      );
      const subItemGroupDescription = item
        .closest(".menu-group")
        .querySelectorAll(`.${subItem}__in__group_description`);

      if (subItemElements.length === 0 && subItemGroupDescription.length === 0)
        return;

      const propertyName = `${subItem}s`;
      obj[propertyName] = [];

      fillInSubItems(subItemElements);
      fillInSubItems(subItemGroupDescription);

      function fillInSubItems(subItemElements) {
        if (subItemElements.length !== 0) {
          subItemElements.forEach((element) => {
            const subItemNameElement = element.querySelector(
              `.${subItem}__name`
            );
            const subItemPriceElement = element.querySelector(
              `.${subItem}__price`
            );

            const subItemObject = {
              name: subItemNameElement.textContent,
              price: Number(subItemPriceElement.textContent),
              isChecked: false,
            };
            obj[propertyName].push(subItemObject);
          });
        }
      }
    };

    const addToppings = () => {
      const toppingElements = item
        .closest(".menu-group")
        .querySelectorAll(".topping");

      if (toppingElements.length === 0) return;

      const toppingPrice = Number(
        item.querySelector(".topping__price").textContent
      );
      obj.toppingInfo = {};
      obj.toppingInfo["toppingPrice"] = toppingPrice;
      obj.toppingInfo["toppings"] = [];

      toppingElements.forEach((topping) => {
        const toppingObj = {
          toppingName: topping.textContent,
          quantity: 0,
        };
        obj.toppingInfo.toppings.push(toppingObj);
      });

      obj.ATCStatusConditions["toppingIsSet"] = false;
    };

    // const addaddToCartBtn = () => {
    //   obj.addToCartBtn = item.querySelector(".order-button");
    // };

    // call above methods to build obj
    addLSKey();
    addFoodName();
    addDescription();
    addQuantity();
    addSize();
    addUnitPrice();
    addCurrentPrice();

    addConstitutes("dressing");
    addConstitutes("pasta");

    addSubItems("substitute");
    addSubItems("extra");

    addToppings();
    // addToCartBtn();

    // Store current item as this obj in LS

    localStorage.setItem(item.key, JSON.stringify(obj));
  });
};

const menuItemElements = document.querySelectorAll(".menu-item");
storeMenuItemsInLS(menuItemElements);

// ***********************************************************
// UTILITY FUNCTIONS
// ***********************************************************

//capitalize the first letter
function capitalizeFirst(str) {
  // checks for null, undefined and empty string
  if (!str) return;
  return str.match("^[a-z]")
    ? str.charAt(0).toUpperCase() + str.substring(1)
    : str;
}

const updateLocalStorage = (item) => {
  localStorage.setItem(`${item.LSkey}`, JSON.stringify(item));
};

// Functions for updating data and rendering form components

// Varying food-item information: quantity, size, price,
// subItem(extra, substitute), constitute(dressing, pasta), toppings

const updateQuantity = ({ updateOption, currentItem }) => {
  // UPDATE
  // update quantity
  if (updateOption === "add") currentItem.quantity++;
  if (updateOption === "remove" && currentItem.quantity > 0)
    currentItem.quantity--;

  // update quantity status
  currentItem.ATCStatusConditions.qtyIsSet =
    currentItem.quantity === 0 ? false : true;

  // USE UPDATED VALUES
  // render the most recent qty
  OrderBasicForm.renderQuantity(currentItem.quantity);

  // decide ATC status based on the most recent ATCStatusConditions
  ATC.decideATCStatus(currentItem.ATCStatusConditions);

  // UPDATE IN LS
  updateLocalStorage(currentItem);
};

const updateSize = ({ updateValue, currentItem }) => {
  // UPDATE
  // update size
  currentItem.sizeInfo.chozenSize = updateValue;
  const currentSize = currentItem.sizeInfo.chozenSize;
  const mediumPrice = currentItem.sizeInfo.sizePricePairs["meidum"];

  // update size status
  currentItem.ATCStatusConditions.sizeIsSet =
    currentItem.sizeInfo.chozenSize === null ? false : true;

  // USE UPDATED VALUES
  // render the most recent size choice
  SizeOptions.renderSize(currentItem.sizeInfo);

  // decide ATC status based on the most recent ATCStatusConditions
  ATC.decideATCStatus(currentItem.ATCStatusConditions);

  // UPDATE IN LS
  updateLocalStorage(currentItem);
};

// dressing, pasta
const updateConstitute = ({ updateOption, updateValue, currentItem }) => {
  // UPDATE
  // update constitute
  const propertyName = `${updateOption}Info`;
  const chozenConsitute = `chozen${capitalizeFirst(updateOption)}`;
  const constituteOptions = `${updateOption}Options`;

  currentItem[propertyName][chozenConsitute] = updateValue;

  // update constitute status
  const statusName = `${updateOption}IsSet`;
  currentItem.ATCStatusConditions[statusName] =
    currentItem[propertyName][chozenConsitute] === "-- --" ? false : true;

  // USE UPDATED VALUES
  Constitutes.renderConstitutes(updateOption, currentItem[propertyName]);

  // decide ATC status based on the most recent ATCStatusConditions
  ATC.decideATCStatus(currentItem.ATCStatusConditions);

  // UPDATE IN LS
  updateLocalStorage(currentItem);
};

// SubItems can be substitutes, extras
const updateSubItem = ({ updateOption, updateValue, currentItem }) => {
  currentItem[`${updateOption}s`].forEach((subItem) => {
    if (subItem.name.split(" ").join("") == updateValue.id) {
      subItem.isChecked = updateValue.checked;
    }
  });

  SubItems.renderSubItems(updateOption, currentItem[`${updateOption}s`]);

  updateLocalStorage(currentItem);
};

const updateToppings = ({ updateOption, updateValue, currentItem }) => {
  // UPDATE
  // update topping
  currentItem.toppingInfo.toppings.forEach((topping) => {
    if (
      updateOption === "remove" &&
      capitalizeFirst(topping.toppingName) === updateValue.trim() &&
      topping.quantity > 0
    ) {
      topping.quantity--;
    }
    if (
      updateOption === "add" &&
      capitalizeFirst(topping.toppingName) === updateValue.trim()
    ) {
      topping.quantity++;
    }
  });

  // update topping status
  // Loop through all the toppings, if we find a topping whose
  // qty is not equal to zero, toppingIsSet is true otherwise false.
  currentItem.ATCStatusConditions.toppingIsSet = !(
    currentItem.toppingInfo.toppings.find(
      (topping) => topping.quantity !== 0
    ) === undefined
  );

  // USE UPDATED VALUES
  Toppings.renderToppings(currentItem.toppingInfo);

  // decide ATC status based on the most recent ATCStatusConditions
  ATC.decideATCStatus(currentItem.ATCStatusConditions);

  // UPDATE IN LS
  updateLocalStorage(currentItem);
};

const updatePrice = (currentItem) => {
  currentItem.currentPrice = calculateFinalPrice(currentItem);

  OrderBasicForm.renderPrice(currentItem.currentPrice);

  updateLocalStorage(currentItem);

  function calculateFinalPrice(currentItem) {
    // factors that are related to price calculation
    const currentQuantity = currentItem.quantity;
    const sizeInfo = currentItem.sizeInfo;
    const currentSubstitutes = currentItem.substitutes;
    const currentExtras = currentItem.extras;
    const currentToppingInfo = currentItem.toppingInfo;

    let currentPrice = currentItem.unitPrice;

    // if different sizes are present for this item,
    // then set the current price to whatever the current size-price is
    if (sizeInfo) {
      const currentSize = sizeInfo.chozenSize;
      const currentSizePrice = sizeInfo.sizePricePairs[currentSize];
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

    // if the current item has extras, add extras prices to its price
    if (currentExtras) {
      currentExtras.forEach((extra) => {
        if (extra.isChecked) {
          currentPrice = +currentPrice + +extra.price;
        }
      });
    }

    // if this current item has toppings information, add topping price to current price
    if (currentToppingInfo) {
      const currentToppingPrice = Number(currentToppingInfo.toppingPrice);
      let totalToppingQty = 0;

      currentToppingInfo.toppings.forEach((topping) => {
        if (topping.quantity > 0) {
          totalToppingQty += Number(topping.quantity);
        }
      });

      currentPrice =
        Number(currentPrice) + currentToppingPrice * totalToppingQty;
    }

    return currentPrice * currentQuantity;
  }
};

// This function is used to display the box when order button is clicked
const displayComponents = (currentItem) => {
  console.log(currentItem);

  // Determine if ATC should be on or off
  ATC.decideATCStatus(currentItem.ATCStatusConditions);

  // Call rendering layer

  // Constant food item information: foodImage, foodName, description
  OrderBasicForm.renderImage(currentItem.foodName);

  OrderBasicForm.renderName(currentItem.foodName);

  OrderBasicForm.renderDescription(currentItem.description);

  // Variable food item information: quantity, size, price,
  // subItem(extra, substitute), constitute(dressing, pasta), toppings
  OrderBasicForm.renderQuantity(currentItem.quantity);

  // render size
  SizeOptions.renderSize(currentItem.sizeInfo);

  // render substitutes
  SubItems.renderSubItems("substitute", currentItem.substitutes);

  // render extra
  SubItems.renderSubItems("extra", currentItem.extras);

  // render dressings
  Constitutes.renderConstitutes("dressing", currentItem.dressingInfo);

  // render pastas
  Constitutes.renderConstitutes("pasta", currentItem.pastaInfo);

  // render toppings
  Toppings.renderToppings(currentItem.toppingInfo);

  // display price, this is the most complicated part in the displaying layer
  OrderBasicForm.renderPrice(currentItem.currentPrice);
};

const openOrderBox = (currentItem) => {
  // Lay out the canvas
  OrderPageBNG.OpenOrderPageBNG();
  OrderBasicForm.displayBasicForm();

  // Draw the currentItem on the canvas
  displayComponents(currentItem);

  // If currentItem is a cart item, then it must have id.
  // Store this id in the form as its id, so that the event listeners
  // can keep track of currenItem.
  if (currentItem.id) {
    document.querySelector(".order__form").id = currentItem.id;
  }
};

const closeBox = (newItemAdded = false) => {
  // first, close all components
  SizeOptions.closeSizeOptions();
  Constitutes.closeConstituteOptions("dressing");
  Constitutes.closeConstituteOptions("pasta");

  SubItems.closeSubItemOptions("substitute");
  SubItems.closeSubItemOptions("extra");

  Toppings.closeToppingOptions();

  // then, close the form
  OrderBasicForm.closeBasicForm();

  // check if a new item has been added; if yes, then run
  // the following process to display the added msg.
  if (newItemAdded) {
    setTimeout(() => {
      document
        .querySelector(".order__added__msg")
        .classList.toggle("order__added__msg_show");
    }, 500);

    setTimeout(() => {
      document
        .querySelector(".order__added__msg")
        .classList.toggle("order__added__msg_show");
    }, 2000);

    // display number of items
    displayCartBtnNumber();
  }

  // lastly, close the background
  OrderPageBNG.closeOrderPageBNG();

  function displayCartBtnNumber() {
    const numberOfItems = localStorage.getItem("order")
      ? JSON.parse(localStorage.getItem("order")).items.length
      : 0;
    const numberOfItemsSpan = document.querySelector(".number__of__items");
    numberOfItemsSpan.textContent = numberOfItems;
  }
};

// *********************************************************
// EVENT LISTENERS      EVENT LISTENERS     EVENT LISTENERS
// *********************************************************
// The level of event listeners is only responsible for taking user's
// input data and sending that to the processing layer for processing

// for closing and opening box
const menuArea = document.querySelector(".menu");
const formContainer = document.querySelector(".formbox__container");

// buttons to hanlde the order
const orderQtyAddButton = document.querySelector("#order__qty__btn_right");
const orderQTYRemoveButton = document.querySelector("#order__qty__btn_left");
const sizeOptionsContainer = document.querySelector(".size_options__container");
const substituteOptionsContainer = document.querySelector(
  ".order__substitutes__container"
);
const extraOptionsContainer = document.querySelector(
  ".order__extras__container"
);
const dressingSelectionElement = document.querySelector(".dressing__options");
const pastaSelectionElement = document.querySelector(".pasta__options");
const toppingOptionElement = document.querySelector(".order__topping__options");

// Utility functions to get the current item
const getCurrentFoodName = (e) => {
  return e.target.matches(".food-name")
    ? e.target.textContent
    : e.target.querySelector(".food-name").textContent;
};

const getCurrentItemAmongItems = (foodName) => {
  const LSKey = foodName.split(" ").join("");
  const currentItem = JSON.parse(localStorage.getItem(LSKey));
  return currentItem;
};

const getCurrentItemFromOrder = (orderId) => {};

// open orderbox
menuArea.addEventListener("click", (e) => {
  if (!e.target.matches(".order-button") && !e.target.matches(".food-name"))
    return;

  const foodName = getCurrentFoodName(e);
  const currentItem = getCurrentItemAmongItems(foodName);

  openOrderBox(currentItem);
});

// close orderbox
formContainer.addEventListener("click", (e) => {
  if (
    !e.target.matches(".formbox__container") &&
    !e.target.matches(".formbox__close_button")
  )
    return;

  closeBox();
});

// add quantity
orderQtyAddButton.addEventListener("click", (e) => {
  const foodName = getCurrentFoodName(e);
  const currentItem = getCurrentItemAmongItems(foodName);

  updateQuantity({ updateOption: "add", currentItem });
  updatePrice(currentItem);
});

// remove quantity
orderQTYRemoveButton.addEventListener("click", (e) => {
  const foodName = getCurrentFoodName(e);
  const currentItem = getCurrentItemAmongItems(foodName);

  updateQuantity({ updateOption: "remove", currentItem });
  updatePrice(currentItem);
});

// choose size
sizeOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(".size__option__input")) return;
  const foodName = getCurrentFoodName(e);
  const currentItem = getCurrentItemAmongItems(foodName);
  const userSelectedSize = e.target.id;

  updateSize({ updateValue: userSelectedSize, currentItem });
  updatePrice(currentItem);
});

// choose substitute
substituteOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(`.substitute__input__checkbox`)) return;
  const foodName = getCurrentFoodName(e);

  const currentItem = getCurrentItemAmongItems(foodName);
  const chozenSubstitute = e.target;

  updateSubItem({
    updateOption: "substitute",
    updateValue: chozenSubstitute,
    currentItem,
  });
  updatePrice(currentItem);
});

// choose extra
extraOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(`.extra__input__checkbox`)) return;

  const foodName = getCurrentFoodName(e);
  const currentItem = getCurrentItemAmongItems(foodName);
  const chozenExtra = e.target;

  updateSubItem({
    updateOption: "extra",
    updateValue: chozenExtra,
    currentItem,
  });
  updatePrice(currentItem);
});

// pick dressing
dressingSelectionElement.addEventListener("click", (e) => {
  const foodName = getCurrentFoodName(e);
  const currentItem = getCurrentItemAmongItems(foodName);

  if (e.target.value === currentItem.dressingInfo.chozenDressing) return;

  const chozenDressing = e.target.value;

  updateConstitute({
    updateOption: "dressing",
    updateValue: chozenDressing,
    currentItem,
  });
});

// pick pasta
pastaSelectionElement.addEventListener("click", (e) => {
  const foodName = getCurrentFoodName(e);
  const currentItem = getCurrentItemAmongItems(foodName);

  if (e.target.value === currentItem.pastaInfo.chozenPasta) return;

  const chozenPasta = e.target.value;

  updateConstitute({
    updateOption: "pasta",
    updateValue: chozenPasta,
    currentItem,
  });
});

// choose topping
toppingOptionElement.addEventListener("click", (e) => {
  // if (!e.target.matches(".md.hydrated")) return;

  if (!e.target.matches(".topping__qty__btn")) return;

  const foodName = getCurrentFoodName(e);
  const currentItem = getCurrentItemAmongItems(foodName);

  const clikedToppingName = e.target
    .closest(".topping__item")
    .querySelector(".topping__name").textContent;

  // const action = e.target.attributes["aria-label"].nodeValue.split(" ")[0];
  const action = e.target.classList.contains("topping__qty__btn_left")
    ? "remove"
    : "add";

  updateToppings({
    updateOption: action,
    updateValue: clikedToppingName,
    currentItem,
  });
  updatePrice(currentItem);
});

// *********************************************************
// ADD TO CART
// *********************************************************

const addToCart = document.querySelector(".Add__to__cart");

// add to cart
addToCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("Add__to__cart_inactive")) return;
  const foodName = getCurrentFoodName(e);
  const currentItem = getCurrentItemAmongItems(foodName);

  // Make a deep copy of current item and store it in LS
  const cartItem = JSON.parse(JSON.stringify(currentItem));
  storeCartItemInLS(cartItem);

  // Reset current item
  resetCurrentItem(currentItem);

  // Now since current item has been reset, update it in LS
  updateLocalStorage(currentItem);

  closeBox(true); // true here means a new item has been added to the cart

  // *******************
  // Utility functions
  // *******************

  function storeCartItemInLS(cartItem) {
    // Store cartItem in order as an element of items and store order in LS.
    // First, get the order object if it exists, otherwise create it.
    const order = localStorage.getItem("order")
      ? JSON.parse(localStorage.getItem("order"))
      : {
          delivery: { method: null, fee: 0 },
          items: [],
          subtotal: 0,
          tip: 0,
          tax: { rate: 0.1025, amount: 0 },
          serviceFee: 0.99,
          total: 0,
        };

    // Generate unique id for each item
    cartItem.id = createUniqueId(order.items);

    // Then, push this item to the array
    order.items.push(cartItem);

    // Calculate order's subtotal
    order.subtotal = calculateSubtotal(order.items);

    // Calculate tax amount
    order.tax.amount = calculateTaxAmount(order.tax.rate, order.subtotal);

    // Calculate order total
    order.total = calculateOrderTotal(order);

    // Store order in local storage
    localStorage.setItem("order", JSON.stringify(order));

    // Utility functions
    function createUniqueId(items) {
      let fourDigitId;

      do {
        // 1. generate a 4-digit id
        fourDigitId = Math.floor(1000 + Math.random() * 9000);

        // 2. if items' length is greater than 0
        // and it already exists, regenerate another id
      } while (
        items.length > 0 &&
        items.find((item) => item.id === fourDigitId) !== undefined
      );

      // 3. if this id doesn't already exist, add it
      return fourDigitId;
    }

    function calculateSubtotal(items) {
      let subtotal = 0;
      items.forEach((item) => (subtotal += item.currentPrice));
      return subtotal;
    }

    function calculateTaxAmount(taxRate, subtotal) {
      return taxRate * subtotal;
    }

    function calculateOrderTotal({ subtotal, serviceFee, tip, tax, delivery }) {
      return subtotal + serviceFee + tip + tax.amount + delivery.fee;
    }
  }

  function resetCurrentItem(item) {
    // Reset currentItem's every property
    item.quantity = 0;

    item.currentPrice = 0;

    if (item.sizeInfo) {
      item.sizeInfo.chozenSize = null;
    }

    if (item.dressingInfo) {
      item.dressingInfo.chozenDressing = item.dressingInfo.dressingOptions[0];
    }

    if (item.pastaInfo) {
      item.pastaInfo.chozenPasta = item.pastaInfo.pastaOptions[0];
    }

    if (item.substitutes) {
      item.substitutes.forEach((substitute) => {
        substitute.isChecked = false;
      });
    }

    if (item.extras) {
      item.extras.forEach((extra) => {
        extra.isChecked = false;
      });
    }

    if (item.toppingInfo) {
      item.toppingInfo.toppings.forEach((topping) => {
        topping.quantity = 0;
      });
    }

    // Reset ATC status back to inactive because now every property
    // has been reset to the default state
    Object.keys(item.ATCStatusConditions).forEach(
      (prop) => (item.ATCStatusConditions[prop] = false)
    );
  }
});

export { openOrderBox };
