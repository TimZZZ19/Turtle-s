const cartBtnElement = document.querySelector(".cart__li");

const cartBtnHTML = `
                  <a class="main-nav-link" id="cart__btn" href="#">
                    Cart |
                    <span>10</span>
                  </a>
                  `;
cartBtnElement.innerHTML = cartBtnHTML;

const cartBoxHTML = `
                    <div class="cart__page">
                      <aside class="cart__box">
                        <div class="cart__close__btn">
                          <ion-icon name="close-outline"></ion-icon>
                        </div>
                        <div class="cart__content__area">
                          <p>Cart</p>
                          <div class="delivery__methods">
                            <div>
                              <input
                                type="radio"
                                class="delivery__input"
                                id="delivery__choice_delivery"
                                name="delivery__choice"
                              />
                              <label>Delivery</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                class="delivery__input"
                                id="delivery__choice_pickup"
                                name="delivery__choice"
                              />
                              <label>Pickup</label>
                            </div>
                          </div>
                          <ul class="cart__items">
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
                          <div class="cart__bill">
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
                        </div>
                        <div class="cart__control">
                          <button class="cart__empty__btn">EMPTY CART</button>
                          <button class="cart__checkout__btn">CHECK OUT</button>
                        </div>
                      </aside>
                    </div>
                    `;

document.body.insertAdjacentHTML("beforeend", cartBoxHTML);

const cartCloseBtn = document.querySelector(".cart__close__btn");

const cartPage = document.querySelector(".cart__page");

cartBtnElement.addEventListener("click", (e) => {
  cartPage.classList.toggle("cart__page_open");
});

cartCloseBtn.addEventListener("click", (e) => {
  cartPage.classList.toggle("cart__page_open");
});

cartPage.addEventListener("click", (e) => {
  if (!e.target.matches(".cart__page")) return;
  cartPage.classList.toggle("cart__page_open");
});
