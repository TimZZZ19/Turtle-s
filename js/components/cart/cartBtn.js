export default class CartBtn {
  static activate() {
    const cartBtnElement = document.querySelector(".cart__li");

    const cartBtnHTML = `
                          <a class="main-nav-link" id="cart__btn" href="#">
                            <span> Cart </span> 
                            | 
                            <span class="number__of__items">10</span>
                          </a>
                         `;
    cartBtnElement.innerHTML = cartBtnHTML;
  }
}
