export default class cartBox {
  static activate() {
    const cartBoxHTML = `
                    <div class="cart__page" >
                      <aside class="cart__box">

                        <div class="cart__close__btn">
                          <ion-icon name="close-outline"></ion-icon>
                        </div>

                        <div class="cart_main">
                        
                          <div class="cart__content__area">
                            <p>Cart</p>

                          </div>
                          
                          <div class="cart__control">
                            <button class="cart__empty__btn">EMPTY CART</button>
                            <button class="cart__checkout__btn">CHECK OUT</button>
                          </div>
                          
                        </div>

                      </aside>
                    </div>
                    `;

    document.body.insertAdjacentHTML("beforeend", cartBoxHTML);
  }

  static openBox() {
    const freezeBackground = () => {
      document.querySelector("html").style.overflowY = "hidden";
    };
    const cartPageElement = document.querySelector(".cart__page");

    freezeBackground();
    cartPageElement.classList.toggle("cart__page_open");
  }

  static closeBox() {
    const unfreezeBackground = () => {
      document.querySelector("html").style.overflowY = null;
    };
    const cartPageElement = document.querySelector(".cart__page");

    cartPageElement.classList.toggle("cart__page_open");
    unfreezeBackground();
  }
}
