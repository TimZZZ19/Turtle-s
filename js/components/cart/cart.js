// ************************************************************
// INITIALIZING
// ************************************************************

// import components
import cartBtn from "./cartBtn.js";
import cartBox from "./cartBox.js";
import cartDeliveryMethods from "./cart_content/cartDeliveryMethods.js";
import cartItems from "./cart_content/cartItems.js";
import cartBill from "./cart_content/cartBill.js";

// activate components
cartBtn.activate();
cartBox.activate();
cartDeliveryMethods.activate();
cartItems.activate();
cartBill.activate();

// ************************************************************
// UTILITY FUNCTIONS - processing user inputs
// ************************************************************
const processDelivery = (order, userDeliveryChoice = null) => {
  if (userDeliveryChoice && userDeliveryChoice.includes("delivery")) {
    order.deliveryMethod = "delivery";
  }
  if (userDeliveryChoice && userDeliveryChoice.includes("pickup")) {
    order.deliveryMethod = "pickup";
  }
  cartDeliveryMethods.displayDeliveryMethods(order.deliveryMethod);
};

const processCartItems = (order) => {
  cartItems.renderCartItems(order.items);
};

const displayContent = (order) => {
  processDelivery(order);
  processCartItems(order);
};

const openBox = () => {
  cartBox.openBox();
};

const closeBox = () => {
  cartBox.closeBox();
};

// ************************************************************
// COLLECTING DATA - pulling data from local storage
// ************************************************************
const order = {
  deliveryMethod: null, // either "delivery" or "pickup"
  items: [],
  tip: 0,
};
const pullDataFromLocalStorage = () => {
  order.items = JSON.parse(localStorage.getItem("cartItems"));
};

// ************************************************************
// EVENT LISTENERS - taking user inputs
// ************************************************************

const cartPageElement = document.querySelector(".cart__page");
const cartCloseBtn = document.querySelector(".cart__close__btn");
const deliveryInputRadio = document.querySelector("#delivery__choice_delivery");
const pickupInputRadio = document.querySelector("#delivery__choice_pickup");
const cartBtnElement = document.querySelector(".cart__li");

// Open cart box and collect data from local storage
cartBtnElement.addEventListener("click", (e) => {
  e.preventDefault(); // since this button is an <a> tag
  openBox();

  pullDataFromLocalStorage();

  displayContent(order);
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
  processDelivery(order, e.target.id);
});
pickupInputRadio.addEventListener("click", (e) => {
  processDelivery(order, e.target.id);
});

// ************************************************************
//
// ************************************************************
