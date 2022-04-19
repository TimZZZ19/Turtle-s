// ************************************************************
// INITIALIZING
// ************************************************************

// import components
import CartBtn from "./CartBtn.js";
import CartPage from "./CartPage.js";
import CartMain from "./CartMain.js";
import CartEmptyConfirmation from "./CartEmptyConfirmation.js";

import CartDeliveryMethods from "./cart_content/CartDeliveryMethods.js";
import CartItems from "./cart_content/CartItems.js";
import CartBill from "./cart_content/CartBill.js";

// import functions from OrderController.js for EDIT
import { openOrderBox } from "../menu_order_UI/OrderController.js";
import CartWarningMsg from "./CartWarningMsg.js";

// activate components
// main components of cart
CartBtn.activate();
CartPage.activate();
CartMain.activate();
CartEmptyConfirmation.activate();
CartWarningMsg.activate();

// sub components of cart
CartDeliveryMethods.activate();
CartItems.activate();
CartBill.activate();

// ************************************************************
// UTILITY FUNCTIONS - processing user inputs
// ************************************************************

// Some helper functions for updating the cart content
const getOrderFromLS = () => JSON.parse(localStorage.getItem("order"));

const updateOrderInLS = (order) =>
  localStorage.setItem("order", JSON.stringify(order));

const calculateSubtotal = (items) => {
  let subtotal = 0;
  items.forEach((item) => (subtotal += item.currentPrice));
  return subtotal;
};

const calculateTax = (order) => order.tax.rate * order.subtotal;

const calculateOrderTotal = (order) =>
  order.tip +
  order.subtotal +
  order.serviceFee +
  order.tax.amount +
  order.delivery.fee;

const updateDeliveryMethod = (order, deliveryMethod) => {
  order.delivery.method = deliveryMethod;
  CartDeliveryMethods.renderDeliveryMethods(order.delivery.method);
  if (order.delivery.method) CartMain.activateCheckOut();

  updateOrderInLS(order);
};

const updateCartItems = (order, itemsUpdateRequest) => {
  if (itemsUpdateRequest.updateOption === "remove") {
    order.items = order.items.filter(
      (item) => item !== itemsUpdateRequest.itemToBeRemoved
    );
  }

  if (itemsUpdateRequest.updateOption === "empty") {
    order.items = [];
  }

  if (itemsUpdateRequest.updateOption === "edit") {
    // edit the item
  }
  CartItems.renderCartItems(order.items);

  updateOrderInLS(order);
};

const updateBill = (order, billUpdateRequest) => {
  // First, do some updates
  if (billUpdateRequest.updateOption === "deliveryFee") {
    order.delivery.fee = billUpdateRequest.updateValue;
  }
  if (billUpdateRequest.updateOption === "tip") {
    order.tip = +billUpdateRequest.updateValue;
  }
  if (billUpdateRequest.updateOption === "remove") {
    order.subtotal = calculateSubtotal(order.items);
    order.tax.amount = calculateTax(order);

    if (order.items.length === 0) {
      order.tip = 0;
      order.delivery.method = null;
      order.delivery.fee = 0;
    }
  }
  order.total = calculateOrderTotal(order);

  // Then, render the newly-updated order
  CartBill.renderBillItems(order);

  // Lastly, update order in LS
  updateOrderInLS(order);
};

const displayCartContent = (order) => {
  CartDeliveryMethods.renderDeliveryMethods(order.delivery.method);

  CartItems.renderCartItems(order.items);

  CartBill.renderBillItems(order);

  if (!order.delivery.method) CartMain.deactivateCheckOut();
};

const closeBox = () => {
  CartMain.closeCartMain();
  CartPage.closeBox();
};

// Empty cart
const emptyCart = () => {
  const order = getOrderFromLS();
  updateDeliveryMethod(order, null);

  updateCartItems(order, { updateOption: "empty" });
  displayCartBtnNumber();

  updateBill(order, { updateOption: "remove" });
  CartMain.closeCartMain();
};

//

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
const emptyBtn = document.querySelector(".cart__empty__btn");
const emptyControl = document.querySelector(".empty__dialogue__control");
const cartCheckOutBtn = document.querySelector(".cart__checkout__btn");

// Open cart box and collect data from local storage
cartBtnElement.addEventListener("click", (e) => {
  e.preventDefault(); // since this button is an <a> tag

  // When the button is clicked,
  // we always need to open the cart box with the "Empty" message.
  CartPage.openBox();

  const order = JSON.parse(localStorage.getItem("order"));

  // If LS doesn't have the order object, then just return;
  // or if the number of items is equal to 0, also return
  if (!order || !order.items.length) return;

  // If LS has the order object, and the length of items is not 0,
  // then we wanna render it on the cart.
  // first, lay out the 'canvas'
  CartMain.displayCartMain();

  // then, display the data on the cart
  displayCartContent(order);
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
  const order = getOrderFromLS();
  updateDeliveryMethod(order, "delivery");
  updateBill(order, { updateOption: "deliveryFee", updateValue: 2 });
});

pickupInputRadio.addEventListener("click", (e) => {
  const order = getOrderFromLS();
  updateDeliveryMethod(order, "pickup");
  updateBill(order, { updateOption: "deliveryFee", updateValue: 0 });
});

tipInputBox.addEventListener("change", (e) => {
  const order = getOrderFromLS();

  updateBill(order, {
    updateOption: "tip",
    updateValue: e.target.value,
  });
});

// Edit or Remove items
cartItemsArea.addEventListener("click", (e) => {
  if (!e.target.matches(".item__control__btn")) return;

  const order = getOrderFromLS();
  const clickedId = e.target.closest(".cart__item").id;
  const clickedItem = order.items.find((item) => item.id == clickedId);

  // *************
  // REMOVE ITEM
  // *************
  if (e.target.matches(".item__remove")) {
    // If the number of item is now equal to 1, then this
    // removal is equivalent to emptying the cart
    if (order.items.length === 1) {
      emptyCart();
      return;
    }

    updateCartItems(order, {
      updateOption: "remove",
      itemToBeRemoved: clickedItem,
    });

    // Since one item has been removed, update the cart number.
    displayCartBtnNumber();

    updateBill(order, { updateOption: "remove" });
  }

  // *************
  // EDIT ITEM
  // *************
  if (e.target.matches(".item__edit")) {
    // close cart box and cart page
    closeBox();

    // store a deep copy of the clicked item in LS
    // so later if the user decides to discard changes, this copy
    // will used to replace the changed one.
    const copyOfClickedItem = JSON.parse(JSON.stringify(clickedItem));
    localStorage.setItem("copyOfEditedItem", JSON.stringify(copyOfClickedItem));
    // open order page and box
    openOrderBox(clickedItem);
  }
});

// Empty the cart
emptyBtn.addEventListener("click", (e) => {
  CartEmptyConfirmation.openEmptyDialogue();
});

// Empty confirmation
emptyControl.addEventListener("click", (e) => {
  if (
    !e.target.matches(".empty__dialogue__control_yes") &&
    !e.target.matches(".empty__dialogue__control_no")
  )
    return;

  CartEmptyConfirmation.closeEmptyDialogue();

  if (e.target.matches(".empty__dialogue__control_yes")) emptyCart();
});

// Check out
cartCheckOutBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart__checkout__btn_inactive")) {
    setTimeout(() => {
      CartWarningMsg.displayWarningMSG("please enter a delivery choice");
    }, 100);

    setTimeout(() => {
      CartWarningMsg.closeWarningMSG();
    }, 2000);

    return;
  }

  console.log("Go to payment");
});

// ************************************************************
//
// ************************************************************

// Display the most recent number of cart items
function displayCartBtnNumber() {
  const numberOfItems = localStorage.getItem("order")
    ? JSON.parse(localStorage.getItem("order")).items.length
    : 0;
  const numberOfItemsSpan = document.querySelector(".number__of__items");
  numberOfItemsSpan.textContent = numberOfItems;
}

displayCartBtnNumber();
