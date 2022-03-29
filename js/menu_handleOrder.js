import OrderBox from "./components/menu_order_UI/OrderBox.js";
import OrderBasicForm from "./components/menu_order_UI/OrderBasicForm.js";
import SizeOptions from "./components/menu_order_UI/options/SizeOptions.js";
import Dressings from "./components/menu_order_UI/options/Dressings.js";
import StuffOptions from "./components/menu_order_UI/options/StuffOptions.js";

// activate form and form components
OrderBox.activate();
OrderBasicForm.activate();
SizeOptions.activate();

// stuff can be substitute, extra
Dressings.activate();
StuffOptions.activate("substitute");
StuffOptions.activate("extra");

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
    const priceContent = priceElement.textContent;
    const sizeInfo = items[key].sizeInfo;

    if (sizeInfo) {
      const sizeKey = sizeInfo.chozenSize;
      const kvp = sizeInfo.sizePricePairs;
      items[key].price = kvp[sizeKey];
    } else {
      items[key].price = priceContent;
    }
  };
  const addDressings = () => {
    const dressingElements = item
      .closest(".menu-group")
      .querySelectorAll(".dressing");

    if (dressingElements.length === 0) return;

    items[key]["dressingInfo"] = {};
    items[key]["dressingInfo"].chozenDressing = null;
    items[key]["dressingInfo"].dressingOptions = [];

    dressingElements.forEach((element) => {
      items[key]["dressingInfo"].dressingOptions.push(element.textContent);
    });
  };

  // stuff can be substitutes, extras
  const addStuff = (stuff) => {
    const stuffElementsInSubItem = item.querySelectorAll(
      `.${stuff}__in__sub_item`
    );
    const stuffInGroupDescription = item
      .closest(".menu-group")
      .querySelectorAll(`.${stuff}__in__group_description`);

    if (
      stuffElementsInSubItem.length === 0 &&
      stuffInGroupDescription.length === 0
    )
      return;

    const propertyName = `${stuff}s`;
    items[key][propertyName] = [];

    fillInStuff(stuffElementsInSubItem);
    fillInStuff(stuffInGroupDescription);

    function fillInStuff(stuffElements) {
      if (stuffElements.length !== 0) {
        stuffElements.forEach((element) => {
          const stuffNameElement = element.querySelector(`.${stuff}__name`);
          const stuffPriceElement = element.querySelector(`.${stuff}__price`);

          const stuffObject = {
            name: stuffNameElement.textContent,
            price: stuffPriceElement.textContent,
            isChecked: false,
          };
          items[key][propertyName].push(stuffObject);
        });
      }
    }
  };

  const addOrderBtn = () => {
    items[key].orderBtn = item.querySelector(".order-button");
  };

  // call above methods to scrape data
  addFoodName();
  addDescription();
  addQuantity();
  addSize();
  addPrice();
  addDressings();
  addStuff("substitute");
  addStuff("extra");
  addOrderBtn();
});

// ***********************************************************
// UTILITY FUNCTIONS
// ***********************************************************
//capitalize the first letter
const capitlizeFirst = (str) => {
  // checks for null, undefined and empty string
  if (!str) return;
  return str.match("^[a-z]")
    ? str.charAt(0).toUpperCase() + str.substring(1)
    : str;
};

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

const processQuantity = (currentItem) => {
  const quantity = currentItem.quantity;
  const orderBtn = currentItem.orderBtn;
  OrderBasicForm.renderQuantity(quantity, orderBtn);
};

const processSize = (sizeInfo) => {
  if (!sizeInfo) return;

  const currentSize = sizeInfo.chozenSize;
  const mediumPrice = sizeInfo.sizePricePairs["meidum"];
  SizeOptions.renderSize(currentSize, mediumPrice);
};

const processPrice = (currentItem) => {
  const currentQuantity = currentItem.quantity;

  const sizeInfo = currentItem.sizeInfo;

  const currentSubstitutes = currentItem.substitutes;
  const currentExtras = currentItem.extras;

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

  const priceToBeRendered = currentPrice * currentQuantity;
  OrderBasicForm.renderPrice(priceToBeRendered);
};

const processDressings = (dressingInfo) => {
  if (!dressingInfo) return;

  const capitalizedDressingChoice = capitlizeFirst(dressingInfo.chozenDressing);
  const capitalizedDressingOptions = [];

  dressingInfo.dressingOptions.map((dressing) =>
    capitalizedDressingOptions.push(capitlizeFirst(dressing))
  );

  Dressings.renderDressings(
    capitalizedDressingChoice,
    capitalizedDressingOptions
  );
};

// stuff can be substitutes, extras
const processStuff = (stuffType, stuff) => {
  if (!stuff) return;

  StuffOptions.renderStuff(stuffType, stuff);
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

  processSize(currentItem.sizeInfo);

  processPrice(currentItem);

  // process dressings
  processDressings(currentItem.dressingInfo);

  // process substitutes
  processStuff("substitute", currentItem.substitutes);

  // process extra
  processStuff("extra", currentItem.extras);
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
  Dressings.closeOptions();
  StuffOptions.closeOptions("substitute");
  StuffOptions.closeOptions("extra");

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

  processQuantity(currentItem);
  processPrice(currentItem);
};

const updateStuff = (e, stuff) => {
  if (!e.target.matches(`.${stuff}__input__checkbox`)) return;

  const currentItem = getCurrentItem(e);
  const propertyName = `${stuff}s`;
  const currentStuffs = currentItem[propertyName];

  currentStuffs.forEach((stf) => {
    if (stf.name.split(" ").join("") == e.target.id) {
      stf.isChecked = e.target.checked;
    }
  });

  processStuff(stuff, currentItem[propertyName]);
  processPrice(currentItem);
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
  currentItem.sizeInfo.chozenSize = e.target.id;

  processSize(currentItem.sizeInfo);
  processPrice(currentItem);
});

// choose substitute
substituteOptionsContainer.addEventListener("click", (e) => {
  updateStuff(e, "substitute");
});

// choose extra
extraOptionsContainer.addEventListener("click", (e) => {
  updateStuff(e, "extra");
});

// pick dressing
dressingSelectionElement.addEventListener("click", (e) => {
  const currentItem = getCurrentItem(e);
  if (e.target.value === currentItem.dressingInfo.chozenDressing) return;

  currentItem.dressingInfo.chozenDressing = e.target.value;
  processDressings(currentItem.dressingInfo);
});

// add to cart
addToCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("Add__to__cart_inactive")) return;
  console.log("Add data to cart");
});
