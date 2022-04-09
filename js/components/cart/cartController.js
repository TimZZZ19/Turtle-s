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

const calculateOrderTotal = (order) => {
  return +(
    order.subtotal +
    order.taxAmount +
    order.serviceFee +
    order.tip +
    order.deliveryInformation.deliveryFee
  ).toFixed(2);
};

const processDelivery = (order, userDeliveryChoice = null) => {
  if (userDeliveryChoice) {
    order.deliveryInformation.deliveryMethod = userDeliveryChoice;
  }

  cartDeliveryMethods.displayDeliveryMethods(
    order.deliveryInformation.deliveryMethod
  );
};

const processCartItems = (order) => {
  cartItems.displayCartItems(order.items);
};

const processBill = (order, orderUpdateInfo) => {
  if (orderUpdateInfo) {
    if (orderUpdateInfo.updateOption === "deliveryFee") {
      order.deliveryInformation.deliveryFee =
        +orderUpdateInfo.updateValue.toFixed(2);
    }
    if (orderUpdateInfo.updateOption === "tip") {
      order.tip = +(+orderUpdateInfo.updateValue).toFixed(2);
    }
    order.orderTotal = calculateOrderTotal(order);
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
// COLLECTING DATA - pulling data from local storage
// ************************************************************
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
const pullDataFromLocalStorage = () => {
  order.items = JSON.parse(localStorage.getItem("cartItems"));

  // add subtotal
  let subtotal = 0;
  order.items.forEach((item) => (subtotal += +item.currentPrice));
  subtotal = subtotal.toFixed(2);
  order["subtotal"] = +subtotal;

  // add tax amount
  order["taxAmount"] = +(subtotal * order.taxRate).toFixed(2);

  // add unique id to each item
  let val;
  const set = new Set();
  order.items.forEach((item) => {
    do {
      val = Math.floor(1000 + Math.random() * 9000);
    } while (set.has(val));
    set.add(val);

    item["id"] = val;
  });

  // add total amount
  order["orderTotal"] = calculateOrderTotal(order);
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

// Open cart box and collect data from local storage
cartBtnElement.addEventListener("click", (e) => {
  e.preventDefault(); // since this button is an <a> tag
  openBox(); // when the button is clicked, we always need to open cart box and page

  if (!localStorage.getItem("cartItems")) return; // if LS is empty then just return

  pullDataFromLocalStorage(); // if not empty, pull data from LS and create order
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
  processDelivery(order, "delivery");
  processBill(order, { updateOption: "deliveryFee", updateValue: 2 });
});
pickupInputRadio.addEventListener("click", (e) => {
  processDelivery(order, "pickup");
  processBill(order, { updateOption: "deliveryFee", updateValue: 0 });
});

tipInputBox.addEventListener("change", (e) => {
  processBill(order, {
    updateOption: "tip",
    updateValue: e.target.value,
  });
});

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
