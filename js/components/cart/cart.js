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
// COLLECTING DATA - getting data from local storage
// ************************************************************

// ************************************************************
// UTILITY FUNCTIONS - processing user inputs
// ************************************************************
const openBox = () => {
  cartBox.openBox();
};

const closeBox = () => {
  cartBox.closeBox();
};

// ************************************************************
// EVENT LISTENERS - taking user inputs
// ************************************************************

const cartBtnElement = document.querySelector(".cart__li");
const cartPageElement = document.querySelector(".cart__page");
const cartCloseBtn = document.querySelector(".cart__close__btn");

cartBtnElement.addEventListener("click", (e) => {
  e.preventDefault(); // since this button is an <a> tag
  openBox();
});

cartCloseBtn.addEventListener("click", (e) => {
  closeBox();
});

cartPageElement.addEventListener("click", (e) => {
  if (!e.target.matches(".cart__page")) return;
  closeBox();
});

// ************************************************************
//
// ************************************************************
