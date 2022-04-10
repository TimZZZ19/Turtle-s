// ************************************************************
// INITIALIZING
// ************************************************************

// import components
import cartBtn from "./cartBtn.js";
import cartBox from "./cartBox.js";
import cartMain from "./cartMain.js";

import cartDeliveryMethods from "./cart_content/cartDeliveryMethods.js";
import cartItems from "./cart_content/cartItems.js";
import cartBill from "./cart_content/cartBill.js";

// These are functions needed for editing items in the cart
// import {
//   items,
//   openBox as openOrderBox,
// } from "../../components/menu_order_UI/menu_handleOrder.js";

// activate components
// main components of cart
cartBtn.activate();
cartBox.activate();
cartMain.activate();

// sub components of cart
cartDeliveryMethods.activate();
cartItems.activate();
cartBill.activate();

// ************************************************************
// UTILITY FUNCTIONS - processing user inputs
// ************************************************************

const processDelivery = (order, deliveryUpdateRequest = null) => {
  if (deliveryUpdateRequest) {
    order.deliveryInformation.deliveryMethod =
      deliveryUpdateRequest.updateOption;
  }

  cartDeliveryMethods.displayDeliveryMethods(
    order.deliveryInformation.deliveryMethod
  );
};

const processCartItems = (order, itemsUpdateRequest = null) => {
  if (itemsUpdateRequest) {
    if (itemsUpdateRequest.updateOption === "remove") {
      order.items = order.items.filter(
        (item) => item !== itemsUpdateRequest.itemToBeRemoved
      );
    }
  }
  cartItems.displayCartItems(order.items);
};

const processBill = (order, billUpdateRequest = null) => {
  if (billUpdateRequest) {
    if (billUpdateRequest.updateOption === "deliveryFee") {
      order.deliveryInformation.deliveryFee =
        +billUpdateRequest.updateValue.toFixed(2);
    }
    if (billUpdateRequest.updateOption === "tip") {
      order.tip = +(+billUpdateRequest.updateValue).toFixed(2);
    }
    if (billUpdateRequest.updateOption === "remove") {
      calculateSubtotal(order);
      calculateTax(order);
    }
    calculateOrderTotal(order);
  }

  cartBill.displayBillItems(
    order.subtotal,
    order.tip,
    order.taxAmount,
    order.serviceFee,
    order.deliveryInformation,
    order.orderTotal
  );
};

const handleOrder = (order) => {
  processDelivery(order);
  processCartItems(order);
  processBill(order);
};

const openBox = () => {
  cartBox.openBox();
};

const closeBox = () => {
  cartBox.closeBox();
  cartMain.closeCartMain();
};

// ************************************************************
// ORDER CREATION AND UPDATE
// ************************************************************

// COLLECTING DATA - pulling data from local storage

const buildOrder = (order) => {
  const addItems = () => {
    order.items = JSON.parse(localStorage.getItem("cartItems"));
  };
  const addUniqueId = () => {
    let val;
    const set = new Set();
    order.items.forEach((item) => {
      do {
        val = Math.floor(1000 + Math.random() * 9000);
      } while (set.has(val));
      set.add(val);

      item["id"] = val;
    });
  };

  // Properties only need to be added once

  // take items from LS and add them to order as a property
  addItems();

  // add unique id to each item
  addUniqueId();

  // Properties need to be constantly updated per user's inputs
  // add subtotal
  calculateSubtotal(order);

  // add tax amount
  calculateTax(order);

  // add total amount
  calculateOrderTotal(order);
};

function calculateSubtotal(order) {
  let subtotal = 0;
  order.items.forEach((item) => (subtotal += +item.currentPrice));
  subtotal = subtotal.toFixed(2);
  order["subtotal"] = +subtotal;
}

function calculateTax(order) {
  order["taxAmount"] = +(order.subtotal * order.taxRate).toFixed(2);
}

function calculateOrderTotal(order) {
  order["orderTotal"] = +(
    order.subtotal +
    order.taxAmount +
    order.serviceFee +
    order.tip +
    order.deliveryInformation.deliveryFee
  ).toFixed(2);
}

// Initialize order
const order = {
  deliveryInformation: {
    deliveryMethod: null, // either "delivery" or "pickup"
    deliveryFee: 0, // either 0 or 2
  },
  items: [],
  tip: 0,
  taxRate: 0.1025,
  serviceFee: 0.99,
};

// ************************************************************
// EVENT LISTENERS - taking user inputs
// ************************************************************

const cartPageElement = document.querySelector(".cart__page");
const cartCloseBtn = document.querySelector(".cart__close__btn");
const deliveryInputRadio = document.querySelector("#delivery__choice_delivery");
const pickupInputRadio = document.querySelector("#delivery__choice_pickup");
const cartBtnElement = document.querySelector(".cart__li");
const tipInputBox = document.querySelector("#tip__value");
const cartItemsArea = document.querySelector(".cart__items");

// Open cart box and collect data from local storage
cartBtnElement.addEventListener("click", (e) => {
  e.preventDefault(); // since this button is an <a> tag
  openBox(); // when the button is clicked, we always need to open cart box and page

  if (!localStorage.getItem("cartItems")) return; // if LS is empty then just return

  buildOrder(order); // if not empty, pull data from LS and create order
  cartMain.displayCartMain(); // lay out the 'canvas'
  handleOrder(order); // then handle the order data. Hanlde means to process and display the data
});

// Close cart box
cartCloseBtn.addEventListener("click", (e) => {
  closeBox();
});
cartPageElement.addEventListener("click", (e) => {
  if (!e.target.matches(".cart__page")) return;
  closeBox();
});

// Choose delivery method
deliveryInputRadio.addEventListener("click", (e) => {
  processDelivery(order, { updateOption: "delivery" });
  processBill(order, { updateOption: "deliveryFee", updateValue: 2 });
});
pickupInputRadio.addEventListener("click", (e) => {
  processDelivery(order, { updateOption: "pickup" });
  processBill(order, { updateOption: "deliveryFee", updateValue: 0 });
});

tipInputBox.addEventListener("change", (e) => {
  processBill(order, {
    updateOption: "tip",
    updateValue: e.target.value,
  });
});

cartItemsArea.addEventListener("click", (e) => {
  if (!e.target.matches(".item__control__btn")) return;

  const clickedId = e.target.closest(".cart__item").id;
  const clickedItem = order.items.find((item) => item.id == clickedId);

  if (e.target.matches(".item__remove")) {
    processCartItems(order, {
      updateOption: "remove",
      itemToBeRemoved: clickedItem,
    });
    processBill(order, { updateOption: "remove" });
  }

  if (e.target.matches(".item__edit")) {
    console.log(clickedItem);
    // close cart box and cart page
    closeBox();

    // open order box and render clickedItem on it
    // const key = clickedItem.foodName.split(" ").join("");
    // const renderItem = items[key];
    // openOrderBox(renderItem);
    // edit item and click update and create a new item
    // replace the old item with this new item using processCartItems
    // update bill with the updated items
  }
});

// Display the most recent number of cart items
const displayCartBtnNumber = () => {
  const numberOfItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")).length
    : 0;
  const numberOfItemsSpan = document.querySelector(".number__of__items");
  numberOfItemsSpan.textContent = numberOfItems;
};

displayCartBtnNumber();

// ************************************************************
//
// ************************************************************
