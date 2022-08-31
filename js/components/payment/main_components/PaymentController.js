// ********************
// IMPORT STATEMENTS
// ********************
// Import CartPagea, CartMain and cartController for going back to cart later
import CartPage from "../../cart/CartPage.js";
import CartMain from "../../cart/CartMain.js";

import ContactInformation from "../payment_content/ContactInformation.js";
import DeliveryAddress from "../payment_content/DeliveryAddress.js";
import NotesForRestaurant from "../payment_content/NotesForRestaurant.js";
import OrderSummary from "../payment_content/OrderSummary.js";
import PaymentInformation from "../payment_content/PaymentInformation.js";
import PaymentBNG from "./PaymentBNG.js";
import PaymentButtons from "./PaymentButtons.js";
import PaymentForm from "./PaymentForm.js";
import PaymentSubmitted from "./PaymentSubmitted.js";
import PaymentCancelation from "./PaymentCancelation.js";

// ************************************************************
// COMMENT COMMENT COMMENT
// INITIALIZATION - components activation
// ************************************************************
PaymentBNG.activate();
PaymentForm.activate();
OrderSummary.activate();
ContactInformation.activate();
DeliveryAddress.activate();
NotesForRestaurant.activate();
PaymentInformation.activate();
PaymentButtons.activate();
PaymentSubmitted.activate();
PaymentCancelation.activate();

// ********************
// UTILITY FUNCTIONS
// ********************
function openPaymentPage() {
  // Get the order from LS
  const order = JSON.parse(localStorage.getItem("order"));
  // first, lay out the background and the box
  PaymentBNG.openPaymentPage();

  OrderSummary.renderTotalPrice(order.total.toFixed(2));

  // if the chozen delivery method is delivery,
  // then display delivery address
  if (order.delivery.method === "delivery") {
    DeliveryAddress.displayDeliveryAddress();
  }
}

const closePaymentPage = () => {
  // Close the payment page
  PaymentBNG.closePaymentPage();
  DeliveryAddress.closeDeliveryAddress();
};

const clearPaymentForm = () => {
  // First, contact information
  // name
  document.getElementById("fname").value = null;
  // phone number
  document.getElementById("phone__number").value = null;
  // notification - sms
  document.getElementById("notification__sms").checked = false;
  // notification - email
  document.getElementById("notification__email").checked = false;

  // Second, delivery address (if this section exists)
  // address line 1
  if (document.getElementById("address__line_1"))
    document.getElementById("address__line_1").value = null;
  // address line 2
  if (document.getElementById("address__line_2"))
    document.getElementById("address__line_2").value = null;

  // Third, Notes for Restaurant
  document.getElementById("notes__for__restaurant").value = null;

  // Fourth, Payment Information
  document.getElementById("card__number").value = null;
  document.getElementById("expiration__date").value = null;
  document.getElementById("card__cvc").value = null;
  document.getElementById("card__zip").value = null;
};

// ********************
// EVENT LISTENERS
// ********************
const closeBtn = document.querySelector(".payment__box__close__btn");
const paymentBng = document.querySelector(".payment__bng");
const goBackBtn = document.querySelector(".payment__control__go__back");
const confirmBtn = document.querySelector(
  ".payment__control__confirm__payment"
);
const cancelationCtrl = document.querySelector(
  ".payment__cancelation__control"
);

// Close the payment page and triger the cancelation dialogue
closeBtn.addEventListener("click", (e) => {
  PaymentCancelation.openCancelationDialogue();
});

paymentBng.addEventListener("click", (e) => {
  if (!e.target.matches(".payment__bng")) return;
  PaymentCancelation.openCancelationDialogue();
});

// Go back to cart
goBackBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closePaymentPage();

  // Turn to the cart
  CartPage.openBox();
  CartMain.displayCartMain();
});

// Place order
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closePaymentPage();

  setTimeout(() => {
    PaymentSubmitted.displaySubmitted();
  }, 500);
  setTimeout(() => {
    PaymentSubmitted.closeSubmitted();
  }, 3000);
});

// Payment cancelation
cancelationCtrl.addEventListener("click", (e) => {
  if (
    !e.target.matches(".payment__cancelation_yes") &&
    !e.target.matches(".payment__cancelation_no")
  )
    return;

  PaymentCancelation.closeCancelationDialogue();

  if (e.target.matches(".payment__cancelation_yes")) {
    // Empty user inputs on the paymnet page

    // First, clear the payment form
    clearPaymentForm();

    // Then, close the page
    closePaymentPage();
  }
});

// ********************
// EXPORT STATEMENT(S)
// ********************
export { openPaymentPage };
