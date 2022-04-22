export default class DeliveryAddress {
  static activate() {
    const paymentForm = document.querySelector(".payment__form");
    const deliveryAddressHTML = `<div class="payment__section delivery__address" 
                                      style="display:none">

                                    <p class="section__title"> 
                                      Delivery Address 
                                    </p>

                                    <div class="section__inputs__area payment__section__inputs__area">
                                      <div class="section__input">
                                        <label for="address__line_1">Address</label>
                                        <input type="text" id="address__line_1" name="address__line_1" 
                                              placeholder="Stree address or P.O. Box">
                                        <input type="text" id="address__line_2" name="address__line_2" 
                                              placeholder="Apt, suite, unit, building, floor, etc.">
                                      </div>
                                    </div>

                                 </div>   
                                `;
    paymentForm.insertAdjacentHTML("beforeend", deliveryAddressHTML);
  }

  static displayDeliveryAddress() {
    document.querySelector(".delivery__address").style.display = null;
  }

  static closeDeliveryAddress() {
    document.querySelector(".delivery__address").style.display = "none";
  }
}
