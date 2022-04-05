export default class cartItems {
  static activate() {
    const cartContentArea = document.querySelector(".cart__content__area");
    const cartBillHTML = ` <div class="cart__bill">
                              <ul class="cart__bill__items">
                                <li>
                                  <span>Subtotal</span>
                                  <span>$97.50</span>
                                </li>
                                <li>
                                  <span>Tax & Fees</span>
                                  <span>$97.50</span>
                                </li>
                                <li>
                                  <span>Tip</span>
                                  <span>$14.62</span>
                                </li>
                                <li>
                                  <span>Pickup</span>
                                  <span>Free</span>
                                </li>
                              </ul>
                              <div class="cart__bill__total">
                                <span>Total</span>
                                <span class="cart__final__amount">$ 123.21</span>
                              </div>
                           </div>
                        `;
    cartContentArea.insertAdjacentHTML("beforeend", cartBillHTML);
  }
}
