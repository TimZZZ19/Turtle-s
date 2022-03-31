import OrderBox from "./components/menu_order_UI/OrderBox.js";
import OrderBasicForm from "./components/menu_order_UI/OrderBasicForm.js";
import SizeOptions from "./components/menu_order_UI/options/SizeOptions.js";
import Constitutes from "./components/menu_order_UI/options/Constitutes.js";
import SubItems from "./components/menu_order_UI/options/SubItems.js";
import Toppings from "./components/menu_order_UI/options/Toppings.js";

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

// ************************************************************
// SCRAPING DATA FROM HTML
// ************************************************************

// Create kvps for every food item, these kvps will be used to store
// user data and be constantly updated and accessed.
const items = [];
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
    items[key].sizeInfo = {};
    // add chozenSize and set small as default
    items[key].sizeInfo.chozenSize = "small";

    // add sizePricePairs
    items[key].sizeInfo.sizePricePairs = {
      small: smallPrice,
      medium: mediumPrice,
      large: largePrice,
    };
  };
  const addPrice = () => {
    const priceElement = item.querySelector(".food-price");
    const priceContent = Number(priceElement.textContent);
    const sizeInfo = items[key].sizeInfo;

    if (sizeInfo) {
      const sizeKey = sizeInfo.chozenSize;
      const kvp = sizeInfo.sizePricePairs;
      items[key].price = kvp[sizeKey];
    } else {
      items[key].price = priceContent;
    }
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

    items[key][propertyName] = {};
    items[key][propertyName][chozenConsitute] = null;
    items[key][propertyName][constituteOptions] = [];

    constituteElements.forEach((element) => {
      items[key][propertyName][constituteOptions].push(element.textContent);
    });
  };

  // Subitems can be substitutes, extras
  const addSubItems = (subItem) => {
    const subItemElements = item.querySelectorAll(`.${subItem}__in__sub_item`);
    const subItemGroupDescription = item
      .closest(".menu-group")
      .querySelectorAll(`.${subItem}__in__group_description`);

    if (subItemElements.length === 0 && subItemGroupDescription.length === 0)
      return;

    const propertyName = `${subItem}s`;
    items[key][propertyName] = [];

    fillInSubItems(subItemElements);
    fillInSubItems(subItemGroupDescription);

    function fillInSubItems(subItemElements) {
      if (subItemElements.length !== 0) {
        subItemElements.forEach((element) => {
          const subItemNameElement = element.querySelector(`.${subItem}__name`);
          const subItemPriceElement = element.querySelector(
            `.${subItem}__price`
          );

          const subItemObject = {
            name: subItemNameElement.textContent,
            price: Number(subItemPriceElement.textContent),
            isChecked: false,
          };
          items[key][propertyName].push(subItemObject);
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
    items[key].toppingInfo = {};
    items[key].toppingInfo["toppingPrice"] = toppingPrice;
    items[key].toppingInfo["toppings"] = [];

    toppingElements.forEach((topping) => {
      const toppingObj = {
        toppingName: topping.textContent,
        quantity: 0,
      };
      items[key].toppingInfo.toppings.push(toppingObj);
    });
  };

  const addaddToCartBtn = () => {
    items[key].addToCartBtn = item.querySelector(".order-button");
  };

  // call above methods to scrape data
  addFoodName();
  addDescription();
  addQuantity();
  addSize();
  addPrice();

  addConstitutes("dressing");
  addConstitutes("pasta");

  addSubItems("substitute");
  addSubItems("extra");

  addToppings();
  addaddToCartBtn();
});

// console.log(items);

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

// functions for rendering form components
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

const processQuantity = (currentItem, action = null) => {
  if (action === "add") currentItem.quantity++;
  if (action === "remove" && currentItem.quantity > 0) currentItem.quantity--;

  OrderBasicForm.renderQuantity(currentItem.quantity, currentItem.addToCartBtn);
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

  let currentPrice = currentItem.price;

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
    console.log(currentPrice, typeof currentPrice);
  }

  const priceToBeRendered = currentPrice * currentQuantity;
  OrderBasicForm.renderPrice(priceToBeRendered);
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

const displayComponents = (e) => {
  const currentKey = e.target.closest(".menu-item").key;
  const currentItem = items[currentKey];
  // assign the form the current key
  // so the form can be identified and the current item can be accessed
  // from the event listeners below
  OrderBasicForm.displayBasicForm(currentKey);

  processImage(currentItem.foodName);

  processName(currentItem.foodName);

  processDescription(currentItem.description);

  processQuantity(currentItem);

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

const openBox = (e) => {
  const freezeBackground = () => {
    document.querySelector("html").style.overflowY = "hidden";
  };

  freezeBackground();
  OrderBox.OpenOrderBox();
  displayComponents(e);
};

const closeBox = () => {
  const unfreezeBackground = () => {
    document.querySelector("html").style.overflowY = null;
  };

  OrderBox.closeOrderBox();
  OrderBasicForm.closeBasicForm();
  SizeOptions.closeOptions();

  Constitutes.closeOptions("dressing");
  Constitutes.closeOptions("pasta");

  SubItems.closeOptions("substitute");
  SubItems.closeOptions("extra");

  Toppings.closeOptions();

  unfreezeBackground();
};

// *********************************************************
// EVENT LISTENERS      EVENT LISTENERS     EVENT LISTENERS
// *********************************************************
// The level of event listeners is responsible for taking user's
// input data and updating the items object accordingly

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
const addToCart = document.querySelector(".Add__to__cart");

// Utility function to get the current item after clicking a menu item
const getCurrentItem = (e) => {
  const currentKey = e.target.closest(".order__form").key;
  const currentItem = items[currentKey];
  return currentItem;
};

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
  const currentItem = getCurrentItem(e);

  processQuantity(currentItem, "add");
  processPrice(currentItem);
});

// remove quantity
orderRemoveButton.addEventListener("click", (e) => {
  const currentItem = getCurrentItem(e);

  processQuantity(currentItem, "remove");
  processPrice(currentItem);
});

// choose size
sizeOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(".size__option__input")) return;

  const currentItem = getCurrentItem(e);
  const userSelectedSize = e.target.id;

  processSize(currentItem, userSelectedSize);
  processPrice(currentItem);
});

// choose substitute
substituteOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(`.substitute__input__checkbox`)) return;

  const currentItem = getCurrentItem(e);
  const chozenSubstitute = e.target;

  processSubItems("substitute", currentItem, chozenSubstitute);
  processPrice(currentItem);
});

// choose extra
extraOptionsContainer.addEventListener("click", (e) => {
  if (!e.target.matches(`.extra__input__checkbox`)) return;

  const currentItem = getCurrentItem(e);
  const chozenExtra = e.target;

  processSubItems("extra", currentItem, chozenExtra);
  processPrice(currentItem);
});

// pick dressing
dressingSelectionElement.addEventListener("click", (e) => {
  const currentItem = getCurrentItem(e);
  if (e.target.value === currentItem.dressingInfo.chozenDressing) return;

  const chozenDressing = e.target.value;
  processConstitutes("dressing", currentItem, chozenDressing);
});

// pick pasta
pastaSelectionElement.addEventListener("click", (e) => {
  const currentItem = getCurrentItem(e);
  if (e.target.value === currentItem.pastaInfo.chozenPasta) return;

  const chozenPasta = e.target.value;
  processConstitutes("pasta", currentItem, chozenPasta);
});

// choose topping
toppingOptionElement.addEventListener("click", (e) => {
  if (!e.target.matches(".md.hydrated")) return;

  const currentItem = getCurrentItem(e);

  const clikedToppingName = e.target
    .closest(".topping__item")
    .querySelector(".topping__name").textContent;

  const action = e.target.attributes["aria-label"].nodeValue.split(" ")[0];

  processToppings(currentItem, clikedToppingName, action);
  processPrice(currentItem);
});

// add to cart
addToCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("Add__to__cart_inactive")) return;
  console.log("Add data to cart");
});
