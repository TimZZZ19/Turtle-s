export default class ATC {
  static activate() {
    const orderFormControl = document.querySelector(".order__form__control");
    const ATCHTML = `<button type="button" class="Add__to__cart">ADD TO CART</button>`;
    orderFormControl.insertAdjacentHTML("beforeend", ATCHTML);
  }

  static decideATCStatus(ATCStatusConditions) {
    const ATCStatusON =
      Object.keys(ATCStatusConditions).find(
        (key) => ATCStatusConditions[key] === false
      ) === undefined;

    if (ATCStatusON) {
      this.changeATCStatus("on");
    } else {
      this.changeATCStatus("off");
    }
  }

  static changeATCStatus(instruction) {
    const addToCart = document.querySelector(".Add__to__cart");

    if (
      instruction === "on" &&
      addToCart.classList.contains("Add__to__cart_inactive")
    ) {
      addToCart.classList.remove("Add__to__cart_inactive");
    }

    if (
      instruction === "off" &&
      !addToCart.classList.contains("Add__to__cart_inactive")
    ) {
      addToCart.classList.add("Add__to__cart_inactive");
    }
  }
}
