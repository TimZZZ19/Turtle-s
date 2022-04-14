export default class CartBill {
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

  static renderBillItems({ subtotal, tip, tax, serviceFee, delivery, total }) {
    // Subtotal
    this.displaySubtotal(subtotal);

    // Tip
    this.displayTip(tip);

    // Tax and fees
    this.displayTaxFees(tax.amount, serviceFee);

    // Delivery
    this.displayDeliveryFee(delivery);

    // Total
    this.displayTotal(total);
  }

  static displaySubtotal(subtotal) {
    const subtotalSpan = document.querySelector(".cart__bill__subtotal");
    subtotalSpan.textContent = `$ ${subtotal.toFixed(2)}`;
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
    popupTax.textContent = `Tax:  $${taxAmount.toFixed(2)}`;
    popupFee.textContent = `Service fee:  $${serviceFee.toFixed(2)}`;

    openPopup();

    function openPopup() {
      const cartTfBtn = document.querySelector(".cart__tf__btn");
      // Cart tax and fees popup
      cartTfBtn.addEventListener("mouseover", (e) => {
        document.querySelector(".cart__tf__popup").style.display = null;
      });

      cartTfBtn.addEventListener("mouseout", (e) => {
        document.querySelector(".cart__tf__popup").style.display = "none";
      });
    }
  }

  static displayDeliveryFee({ method, fee }) {
    if (!method) return;

    const deliveryMethodSpan = document.querySelector(".cart__deliveryMethod");
    const deliveryFeeSpan = document.querySelector(".cart__deliveryFee");

    deliveryMethodSpan.textContent = `Delivery fee`;
    deliveryFeeSpan.textContent = `$ ${fee.toFixed(2)}`;
  }

  static displayTotal(total) {
    const orderTotalAmountSpan = document.querySelector(".cart__total__amount");
    orderTotalAmountSpan.textContent = `$ ${total.toFixed(2)}`;
  }
}
