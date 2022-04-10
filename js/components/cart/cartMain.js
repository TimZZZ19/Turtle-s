export default class CartBtn {
  static activate() {
    const cartMainHTML = `
                          <div class="cart__main" style="display:none">
                                              
                            <div class="cart__content__area">
                              <p class="cart__title">Cart</p>

                            </div>
                            
                            <div class="cart__bill_and_control">

                              <div class="cart__control">
                                <button class="cart__control__button cart__empty__btn">EMPTY CART</button>
                                <button class="cart__control__button cart__checkout__btn">CHECK OUT</button>
                              </div>

                            </div>
                          
                          </div>
                         `;

    document
      .querySelector(".cart__box")
      .insertAdjacentHTML("beforeend", cartMainHTML);
  }

  static displayCartMain() {
    document.querySelector(".cart__main").style.display = null;
  }

  static closeCartMain() {
    document.querySelector(".cart__main").style.display = "none";
  }
}
