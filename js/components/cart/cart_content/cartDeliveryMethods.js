export default class cartDeliveryMethods {
  static activate() {
    const cartContentArea = document.querySelector(".cart__content__area");
    const deliveryMethodsHTML = ` <div class="delivery__methods">
                                    <p>This is for : </p>
                                    <div>
                                      <span class="delivery__option">
                                        <input
                                          type="radio"
                                          class="delivery__input"
                                          id="delivery__choice_delivery"
                                          name="delivery__choice"
                                        />
                                        <label>Delivery</label>
                                      </span>
                                      <span class="delivery__option">
                                        <input
                                          type="radio"
                                          class="delivery__input"
                                          id="delivery__choice_pickup"
                                          name="delivery__choice"
                                        />
                                        <label>Pickup</label>
                                      </span>
                                    </div>
                                  </div> 
                                `;
    cartContentArea.insertAdjacentHTML("beforeend", deliveryMethodsHTML);
  }

  static displayDeliveryMethods(deliveryMethod) {
    if (deliveryMethod === "delivery") {
      document.querySelector("#delivery__choice_delivery").checked = true;
    } else if (deliveryMethod === "pickup") {
      document.querySelector("#delivery__choice_pickup").checked = true;
    } else {
      document.querySelector(".delivery__input").checked = false;
    }
  }
}
