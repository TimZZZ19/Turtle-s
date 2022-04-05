export default class cartItems {
  static activate() {
    const cartContentArea = document.querySelector(".cart__content__area");
    const cartItemsHTML = `<ul class="cart__items">
                              
                          </ul>
                          `;
    cartContentArea.insertAdjacentHTML("beforeend", cartItemsHTML);
  }

  static renderCartItems(items) {
    const list = document.querySelector(".cart__items");
    items.forEach((item) => {
      const { foodName, quantity, currentPrice } = item;
      const element = this.createElement(foodName, quantity, currentPrice);
      list.insertAdjacentHTML("beforeend", element);
    });
  }

  static createElement(name, qty, price) {
    return `<li class="cart__item">
              <div class="item__information">
                <div class="item__quantity">${qty}</div>
                <div class="item__constitution_and_control">
                  <ul class="item__constitution">
                    <li class="item__name">${name}</li>
                    <li class="item__sauce">Sauce: BBQ</li>
                    <li class="item__substitutes"></li>
                    <li class="item__extras"></li>
                    <li class="item__dressing"></li>
                    <li class="item__pasta"></li>
                    <li class="item__toppings"></li>
                  </ul>
                  <div class="item__control">
                    <button class="item__edit">EDIT</button>
                    <button class="item__remove">REMOVE</button>
                  </div>
                </div>
              </div>
              <div class="item__price">$ ${price.toFixed(2)}</div>
            </li> 
          `;
  }
}
