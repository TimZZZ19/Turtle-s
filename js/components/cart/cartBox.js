export default class CartBox {
  static activate() {
    const cartBoxHTML = `
                    <div class="cart__page" >
                      <aside class="cart__box">

                        <div class="cart__close__btn">
                          <ion-icon name="close-outline"></ion-icon>
                        </div>

                        <p class="empty__cart__msg">Your cart is empty</p>
                        
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
