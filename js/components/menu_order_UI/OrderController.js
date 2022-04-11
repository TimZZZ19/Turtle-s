import OrderBox from "./OrderBox.js";
import OrderBasicForm from "./OrderBasicForm.js";
import SizeOptions from "./options/SizeOptions.js";
import Constitutes from "./options/Constitutes.js";
import SubItems from "./options/SubItems.js";
import Toppings from "./options/Toppings.js";

// ************************************************************
// INITIALIZATION - components activation and local db creation
// ************************************************************

// *****************
// Components Activation
// ****************

// activate form and form components
OrderBox.activate();
OrderBasicForm.activate();
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
    };
    const addSize = () => {
      const priceElement = item.querySelector(".food-price");
      const priceContent = priceElement.textContent;

      if (!priceElement.classList.contains("size__options")) return;

      const smallPrice = priceContent.split(",")[0].slice(-5);
      const mediumPrice = priceContent.includes("M")
        ? priceContent.split(",")[1].slice(-5)
        : null;
      const largePrice = priceContent.includes("M")
        ? priceContent.split(",")[2].slice(-5)
        : priceContent.split(",")[1].slice(-5);

      // set sizeInfo property
      obj.sizeInfo = {};
      // add chozenSize and set small as default
      obj.sizeInfo.chozenSize = "small";

      // add sizePricePairs
      obj.sizeInfo.sizePricePairs = {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice,
      };
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
      obj[propertyName][chozenConsitute] = null;
      obj[propertyName][constituteOptions] = [];

      constituteElements.forEach((element) => {
        obj[propertyName][constituteOptions].push(element.textContent);
      });

      obj[propertyName][chozenConsitute] =
        obj[propertyName][constituteOptions][0];
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
// At this level, we only care about processing data
// and sending that data to the rendering part.

//capitalize the first letter
function capitalizeFirst(str) {
  // checks for null, undefined and empty string
  if (!str) return;
  return str.match("^[a-z]")
    ? str.charAt(0).toUpperCase() + str.substring(1)
    : str;
}

// Functions for processing data and rendering form components

// Constant food item information: foodImage, foodName, description
const processImage = (foodName) => {
  const foodNameNoSpace = foodName.split(" ").join("");

  const currentFoodImg = document.createElement("img");
  currentFoodImg.src = `/img/order-imgs/${foodNameNoSpace}.jpg`;
  currentFoodImg.alt = foodNameNoSpace;

  OrderBasicForm.renderImage(currentFoodImg);
};

const processName = (foodName) => {
  OrderBasicForm.renderName(foodName);
};

const processDescription = (description) => {
  OrderBasicForm.renderDescription(description);
};

// Variable food item information: quantity, size, price,
// subItem(extra, substitute), constitute(dressing, pasta), toppings

const processQuantity = (currentItem, updateQtyRequest = null) => {
  if (updateQtyRequest) updateQty(updateQtyRequest);

  OrderBasicForm.renderQuantity(currentItem.quantity);

  function updateQty({ updateOption, LSkey }) {
    if (updateOption === "add") {
      currentItem.quantity++;
    }
    if (updateOption === "remove" && currentItem.quantity > 0) {
      currentItem.quantity--;
    }
  }
};

const processSize = (currentItem, userSelectedSize = null) => {
  if (userSelectedSize) currentItem.sizeInfo.chozenSize = userSelectedSize;
  const currentSize = currentItem.sizeInfo.chozenSize;
  const mediumPrice = currentItem.sizeInfo.sizePricePairs["meidum"];
  SizeOptions.renderSize(currentSize, mediumPrice);
};

const processPrice = (currentItem) => {
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

    currentPrice = Number(currentPrice) + currentToppingPrice * totalToppingQty;
  }

  currentItem.currentPrice = currentPrice * currentQuantity;

  OrderBasicForm.renderPrice(currentItem.currentPrice);
};

// dressing, pasta
const processConstitutes = (
  constituteType,
  currentItem,
  chozenConstitute = null
) => {
  const propertyName = `${constituteType}Info`;
  const chozenConsitute = `chozen${capitalizeFirst(constituteType)}`;
  const constituteOptions = `${constituteType}Options`;

  if (chozenConstitute) {
    currentItem[propertyName][chozenConsitute] = chozenConstitute;
  }

  Constitutes.renderConstitutes(
    constituteType,
    currentItem[propertyName][chozenConsitute],
    currentItem[propertyName][constituteOptions]
  );
};

// SubItems can be substitutes, extras
const processSubItems = (subItemType, currentItem, chozenSubItem = null) => {
  if (chozenSubItem) {
    currentItem[`${subItemType}s`].forEach((subItem) => {
      if (subItem.name.split(" ").join("") == chozenSubItem.id) {
        subItem.isChecked = chozenSubItem.checked;
      }
    });
  }

  SubItems.renderSubItems(subItemType, currentItem[`${subItemType}s`]);
};

const processToppings = (currentItem, toppingName = null, action = null) => {
  if (action == "remove") {
    currentItem.toppingInfo.toppings.forEach((topping) => {
      if (
        capitalizeFirst(topping.toppingName) === toppingName.trim() &&
        topping.quantity > 0
      ) {
        topping.quantity--;
      }
    });
  }

  if (action === "add") {
    currentItem.toppingInfo.toppings.forEach((topping) => {
      if (capitalizeFirst(topping.toppingName) === toppingName.trim()) {
        topping.quantity++;
      }
    });
  }

  Toppings.renderToppings(currentItem.toppingInfo.toppings);
};

// using the functions above
const displayComponents = (currentItem) => {
  // Basic food item information: foodImage, foodName, description

  processImage(currentItem.foodName);

  processName(currentItem.foodName);

  processDescription(currentItem.description);

  // Variable food item information: quantity, size, price,
  // subItem(extra, substitute), constitute(dressing, pasta), toppings

  processQuantity(currentItem.quantity);

  if (currentItem.sizeInfo) {
    processSize(currentItem);
  }

  processPrice(currentItem);

  // process dressings
  if (currentItem.dressingInfo) {
    processConstitutes("dressing", currentItem);
  }

  // process pastas
  if (currentItem.pastaInfo) {
    processConstitutes("pasta", currentItem);
  }

  // process substitutes
  if (currentItem.substitutes) {
    processSubItems("substitute", currentItem);
  }

  // process extra
  if (currentItem.extras) {
    processSubItems("extra", currentItem);
  }

  // process toppings
  if (currentItem.toppingInfo) {
    processToppings(currentItem);
  }
};

const openBox = (currentItem) => {
  // Lay out the canvas
  OrderBox.OpenOrderBox();
  OrderBasicForm.displayBasicForm();

  // Draw the currentItem on the canvas
  displayComponents(currentItem);
};

const closeBox = () => {
  OrderBox.closeOrderBox();
  OrderBasicForm.closeBasicForm();
  SizeOptions.closeOptions();

  Constitutes.closeOptions("dressing");
  Constitutes.closeOptions("pasta");

  SubItems.closeOptions("substitute");
  SubItems.closeOptions("extra");

  Toppings.closeOptions();
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
const orderAddButton = document.querySelector("#order__qty__btn_right");
const orderRemoveButton = document.querySelector("#order__qty__btn_left");
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
const getItemFromLS = (foodName) => {
  const key = foodName.split(" ").join("");
  const menuItems = JSON.parse(localStorage.getItem("menuItems"));
  const currentItem = menuobj;
  return currentItem;
};

const getCurrentItemFromOrderBox = (e) => {
  const foodName = e.target
    .closest(".order__form")
    .querySelector(".order__name").textContent;

  return getItemFromLS(foodName);
};

// open orderbox
menuArea.addEventListener("click", (e) => {
  if (!e.target.matches(".order-button") && !e.target.matches(".food-name"))
    return;

  const currentItem = getCurrentItemFromMenuPage(e);
  console.log(currentItem);

  openBox(currentItem);

  function getCurrentItemFromMenuPage(e) {
    // We get foodName either from the food-name span
    // or the order button that contains it.
    const foodName = e.target.matches(".food-name")
      ? e.target.textContent
      : e.target.querySelector(".food-name").textContent;

    return getItemFromLS(foodName);
  }
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
  const currentItem = getCurrentItemFromOrderBox(e);

  processQuantity(currentItem.quantity, {
    updateOption: "add",
    LSkey: currentItem.key,
  });
  processPrice(currentItem);
});

// remove quantity
orderRemoveButton.addEventListener("click", (e) => {
  const currentItem = getCurrentItemFromOrderBox(e);

  processQuantity(currentItem.quantity, {
    updateOption: "remove",
    LSkey: currentItem.key,
  });
  processPrice(currentItem);
});

// choose size
sizeOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(".size__option__input")) return;

  const currentItem = getCurrentItemFromOrderBox(e);
  const userSelectedSize = e.target.id;

  processSize(currentItem, userSelectedSize);
  processPrice(currentItem);
});

// choose substitute
substituteOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(`.substitute__input__checkbox`)) return;

  const currentItem = getCurrentItemFromOrderBox(e);
  const chozenSubstitute = e.target;

  processSubItems("substitute", currentItem, chozenSubstitute);
  processPrice(currentItem);
});

// choose extra
extraOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(`.extra__input__checkbox`)) return;

  const currentItem = getCurrentItemFromOrderBox(e);
  const chozenExtra = e.target;

  processSubItems("extra", currentItem, chozenExtra);
  processPrice(currentItem);
});

// pick dressing
dressingSelectionElement.addEventListener("click", (e) => {
  const currentItem = getCurrentItemFromOrderBox(e);
  if (e.target.value === currentItem.dressingInfo.chozenDressing) return;

  const chozenDressing = e.target.value;
  processConstitutes("dressing", currentItem, chozenDressing);
});

// pick pasta
pastaSelectionElement.addEventListener("click", (e) => {
  const currentItem = getCurrentItemFromOrderBox(e);
  if (e.target.value === currentItem.pastaInfo.chozenPasta) return;

  const chozenPasta = e.target.value;
  processConstitutes("pasta", currentItem, chozenPasta);
});

// choose topping
toppingOptionElement.addEventListener("click", (e) => {
  // if (!e.target.matches(".md.hydrated")) return;
  console.log(e.target.action);

  if (!e.target.matches(".topping__qty__btn")) return;

  console.log("button clicked");

  const currentItem = getCurrentItemFromOrderBox(e);

  const clikedToppingName = e.target
    .closest(".topping__item")
    .querySelector(".topping__name").textContent;

  // const action = e.target.attributes["aria-label"].nodeValue.split(" ")[0];
  const action = e.target.classList.contains("topping__qty__btn_left")
    ? "remove"
    : "add";

  processToppings(currentItem, clikedToppingName, action);
  processPrice(currentItem);
});

// *********************************************************
// ADD TO CART
// *********************************************************

const addToCart = document.querySelector(".Add__to__cart");
const storeCartItemInLS = (cartItem) => {
  // first, get the cartItems array.
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  // push this item to the array
  cartItems.push(cartItem);

  // store array in local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// add to cart
addToCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("Add__to__cart_inactive")) return;
  const currentItem = getCurrentItemFromOrderBox(e);

  // pack current user data into one item
  // and reset currentItem's every property back to default value
  const cartItem = packDataIntoOneItem(currentItem);

  // store carItem in an array and store the array in local storage
  storeCartItemInLS(cartItem);

  // since current item has been reset, display it to show that
  // it has been reset and also to turn off the onhold status
  displayComponents(currentItem);
  closeBox();

  // display number of items
  displayCartBtnNumber();
});

function packDataIntoOneItem(item) {
  const cartItem = {};

  cartItem.foodName = item.foodName;

  cartItem.quantity = item.quantity;
  item.quantity = 0;

  cartItem.currentPrice = item.currentPrice;
  item.currentPrice = 0;

  if (item.sizeInfo) {
    cartItem.chozenSize = item.sizeInfo.chozenSize;
    item.sizeInfo.chozenSize = "small";
  }
  if (item.substitutes) {
    cartItem["substitutes"] = [];

    item.substitutes.forEach((substitute) => {
      if (substitute.isChecked) {
        cartItem["substitutes"].push(substitute.name);
        substitute.isChecked = false;
      }
    });
  }
  if (item.extras) {
    cartItem["extras"] = [];

    item.extras.forEach((extra) => {
      if (extra.isChecked) {
        cartItem["extras"].push(extra.name);
        extra.isChecked = false;
      }
    });
  }
  if (item.dressingInfo) {
    cartItem["chozenDressing"] = item.dressingInfo.chozenDressing;
    item.dressingInfo.chozenDressing = item.dressingInfo.dressingOptions[0];
  }
  if (item.pastaInfo) {
    cartItem["chozenPasta"] = item.pastaInfo.chozenPasta;
    item.pastaInfo.chozenPasta = item.pastaInfo.pastaOptions[0];
  }
  if (item.toppingInfo) {
    cartItem["toppings"] = [];
    item.toppingInfo.toppings.forEach((topping) => {
      if (topping.quantity !== 0) {
        cartItem["toppings"].push({
          name: topping.toppingName,
          quantity: topping.quantity,
        });
        topping.quantity = 0;
      }
    });
  }

  return cartItem;
}

function displayCartBtnNumber() {
  const numberOfItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")).length
    : 0;
  const numberOfItemsSpan = document.querySelector(".number__of__items");
  numberOfItemsSpan.textContent = numberOfItems;
}
