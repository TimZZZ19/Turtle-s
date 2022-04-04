export default class cartItems {
  static activate() {
    const cartContentArea = document.querySelector(".cart__content__area");
    const cartItemsHTML = ` <ul class="cart__items">
                              <li class="cart__item">
                                <div class="item__information">
                                  <div class="item__quantity">2x</div>
                                  <div class="item__constitution_and_control">
                                    <ul class="item__constitution">
                                      <li class="item__name">Chicken Wings(12)</li>
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
                                <div class="item__price">$19.50</div>
                              </li>
                              <li class="cart__item">
                                <div class="item__information">
                                  <div class="item__quantity">3x</div>
                                  <div class="item__constitution_and_control">
                                    <ul class="item__constitution">
                                      <li class="item__name">Chicken Wings(12)</li>
                                      <li class="item__sauce">Sauce: Buffalo</li>
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
                                <div class="item__price">$29.25</div>
                              </li>
                            </ul>
                            `;
    cartContentArea.insertAdjacentHTML("beforeend", cartItemsHTML);
  }
}
