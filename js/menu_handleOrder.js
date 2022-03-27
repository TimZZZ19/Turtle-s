import OrderBox from "./components/menu_order_UI/OrderBox.js";
import OrderBasicForm from "./components/menu_order_UI/OrderBasicForm.js";
import SizeOptions from "./components/menu_order_UI/options/SizeOptions.js";
import SubstituteOptions from "./components/menu_order_UI/options/substituteOptions.js";
import AddExtra from "./components/menu_order_UI/options/AddExtra.js";

// activate form and form components
OrderBox.activate();
OrderBasicForm.activate();
SizeOptions.activate();
SubstituteOptions.activate();
AddExtra.activate();

// ************************************************************
// Collecting data
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

  // stuff can be substitute, extra
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

  // call above methods to add data
  addFoodName();
  addDescription();
  addQuantity();
  addPrice();
  addStuff("substitute");
  addStuff("extra");
});

console.log(items);

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
  const currentExtras = currentItem.extras;

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

const renderSizeOptions = (currentItem) => {
  const currentSize = currentItem.size;
  if (currentSize) {
    const mediumPrice = currentItem.sizePrices.medium;
    SizeOptions.displaySizeOptions(currentSize, mediumPrice);
  }
};

// stuff can be substitutes, extras
const renderStuff = (propertyName, stuff) => {
  if (propertyName === "substitutes") {
    if (stuff) {
      SubstituteOptions.displaySubstituteOptions(stuff);
    }
  }

  if (propertyName === "extras") {
    if (stuff) {
      AddExtra.displayExtraOptions(stuff);
    }
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

  // render substitutes
  renderStuff("substitutes", currentItem.substitutes);

  // render extra
  renderStuff("extras", currentItem.extras);
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
  SubstituteOptions.closeSubstitueOptions();
  AddExtra.closeExtraOptions();

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

  renderStuff(propertyName, currentItem[propertyName]);
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
const extraOptionsContainer = document.querySelector(
  ".order__extras__container"
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
  updateStuff(e, "substitute");
});

// choose extra
extraOptionsContainer.addEventListener("click", (e) => {
  updateStuff(e, "extra");
});

// add to cart
addToCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("Add__to__cart_inactive")) return;
  console.log("Add data to cart");
});
