export default class CartDeliveryMethods {
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

  static renderDeliveryMethods(deliveryMethod) {
    const deliveryInputElment = document.querySelector(
      "#delivery__choice_delivery"
    );
    const pickupInputElement = document.querySelector(
      "#delivery__choice_pickup"
    );
    if (deliveryMethod === "delivery") {
      deliveryInputElment.checked = true;
    } else if (deliveryMethod === "pickup") {
      pickupInputElement.checked = true;
    } else {
      deliveryInputElment.checked = false;
      pickupInputElement.checked = false;
    }
  }
}
