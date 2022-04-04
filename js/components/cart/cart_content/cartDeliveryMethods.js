export default class cartDeliveryMethods {
  static activate() {
    const cartContentArea = document.querySelector(".cart__content__area");
    const deliveryMethodsHTML = ` <div class="delivery__methods">
                                    <div>
                                      <input
                                        type="radio"
                                        class="delivery__input"
                                        id="delivery__choice_delivery"
                                        name="delivery__choice"
                                      />
                                      <label>Delivery</label>
                                    </div>
                                    <div>
                                      <input
                                        type="radio"
                                        class="delivery__input"
                                        id="delivery__choice_pickup"
                                        name="delivery__choice"
                                      />
                                      <label>Pickup</label>
                                    </div>
                                  </div> 
                                `;
    cartContentArea.insertAdjacentHTML("beforeend", deliveryMethodsHTML);
  }
}
