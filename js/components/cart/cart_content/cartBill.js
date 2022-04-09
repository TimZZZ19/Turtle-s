export default class cartItems {
  static activate() {
    const cartContentArea = document.querySelector(".cart__bill_and_control");
    const cartBillHTML = ` 
                      
                          <ul class="cart__bill__items">
                            <li class="cart__bill__item">
                              <span>Subtotal</span>
                              <span class="cart__bill__subtotal"></span>
                            </li>
                            <li class="cart__bill__item cart__bill__item-tip">
                              <span>Tip</span>
                              <div class="cart__bill__tip__input">
                                <label for="tip__value">$&nbsp;</label>
                                <input type="text" id="tip__value" >
                              </div>
                            </li>
                            <li class="cart__bill__item cart__tax__fees">
                              <span>
                                Tax & Fees
                                <button class="cart__tf__btn">
                                  <ion-icon name="help-circle-outline"></ion-icon> 
                                </button>
                              </span>
                              <span class="subtotal__tax__fee">
                              </span>
                              <div class="cart__tf__popup" style="display:none">
                                <span class="cart__tf__popup-tax"></span>
                                <span class="cart__tf__popup-fee"></span>
                              </div>
                            </li>
                            <li class="cart__bill__item cart__bill__delivery">
                            <span class="cart__deliveryMethod"> </span>
                            <span class="cart__deliveryFee"> </span>
                            </li>                          
                            <li class="cart__bill__item cart__final__balance">
                              <span >Total</span>
                              <span class="cart__total__amount"></span>
                            </li>
                          </ul>
                          `;
    cartContentArea.insertAdjacentHTML("afterBegin", cartBillHTML);
  }

  static displayBillItems(
    subtotal,
    tip,
    taxAmount,
    serviceFee,
    deliveryInformation,
    total
  ) {
    // Subtotal
    this.displaySubtotal(subtotal);

    // Tip
    this.displayTip(tip);

    // Tax and fees
    this.displayTaxFees(taxAmount, serviceFee);

    // Delivery
    this.displayDeliveryFee(deliveryInformation);

    // Total
    this.displayTotal(total);
  }

  static displaySubtotal(subtotal) {
    const subtotalSpan = document.querySelector(".cart__bill__subtotal");
    subtotalSpan.textContent = `$ ${subtotal}`;
  }

  static displayTip(tip) {
    const tipInputElement = document.querySelector("#tip__value");
    tipInputElement.value = tip.toFixed(2);
  }

  static displayTaxFees(taxAmount, serviceFee) {
    const subTotalTaxFee = document.querySelector(".subtotal__tax__fee");

    subTotalTaxFee.textContent = `$ ${(taxAmount + serviceFee).toFixed(2)}`;

    const popupTax = document.querySelector(".cart__tf__popup-tax");
    const popupFee = document.querySelector(".cart__tf__popup-fee");
    popupTax.textContent = `Tax:  $${taxAmount}`;
    popupFee.textContent = `Service fee:  $${serviceFee}`;

    this.openPopup();
  }

  static openPopup() {
    const cartTfBtn = document.querySelector(".cart__tf__btn");
    // Cart tax and fees popup
    cartTfBtn.addEventListener("mouseover", (e) => {
      document.querySelector(".cart__tf__popup").style.display = null;
    });

    cartTfBtn.addEventListener("mouseout", (e) => {
      document.querySelector(".cart__tf__popup").style.display = "none";
    });
  }

  static displayDeliveryFee({ deliveryMethod, deliveryFee }) {
    if (!deliveryMethod) return;

    deliveryFee = `$ ${deliveryFee.toFixed(2)}`;

    const deliveryMethodSpan = document.querySelector(".cart__deliveryMethod");
    const deliveryFeeSpan = document.querySelector(".cart__deliveryFee");

    deliveryMethodSpan.textContent = `${capitalizeFirst(deliveryMethod)}`;
    deliveryFeeSpan.textContent = `${deliveryFee}`;

    function capitalizeFirst(str) {
      // checks for null, undefined and empty string
      if (!str) return;
      return str.match("^[a-z]")
        ? str.charAt(0).toUpperCase() + str.substring(1)
        : str;
    }
  }

  static displayTotal(total) {
    const orderTotalAmountSpan = document.querySelector(".cart__total__amount");
    orderTotalAmountSpan.textContent = `$ ${total}`;
  }
}
