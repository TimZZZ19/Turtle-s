export default class OrderFormbox {
  static activate() {
    // const contentBox = document.getElementsByClassName("formbox__content");
    const contentBox = document.querySelector(".formbox");

    const form = `
        <div class="formbox__close_button">
          <ion-icon class="formbox__close_icon" name="close-outline"></ion-icon>
        </div>

        <form class="order__form" style="display: none"> 
          <div class="order__image" ></div>
          <div class="order__info" >
            <span class="order__name"></span>
            <p class="order__description"></p>
          </div>
          <div class="order__form__control">
            <div class="order__total" >
              <span class="order__quantity">
                <span>Qty</span>
                <span class="order__qty__btn" id="order__qty__btn_left"><ion-icon name="remove-circle-outline"></ion-icon></span>
                <span class="order__actual__qty"></span>
                <span class="order__qty__btn" id="order__qty__btn_right"><ion-icon name="add-circle-outline"></ion-icon></span>
              </span> 
              <span class="order__price"></span>
            </div>
            <button type="button" class="Add__to__cart">ADD TO CART</button>
          </div>
        </form> 
      `;

    contentBox.innerHTML = form;
  }

  static displayBasicForm(key) {
    const form = document.querySelector(".order__form");
    form.style.display = null;
    form.key = key; // store the current food's key here,
    // so we can have access to the global data object in evenlisteners.
  }

  static renderImage(imgElement) {
    const foodImgElement = document.querySelector(".order__image");
    if (foodImgElement.firstChild) {
      foodImgElement.removeChild(foodImgElement.firstChild);
    }
    foodImgElement.appendChild(imgElement);
  }

  static renderName(foodName) {
    const currentFoodNameElement = document.querySelector(".order__name");
    currentFoodNameElement.textContent = foodName;
  }

  static renderDescription(foodDescription) {
    document.querySelector(".order__description").textContent = foodDescription
      ? foodDescription
      : "";
  }

  static renderQuantity(quantity, addToCartBtn) {
    const orderRemoveButton = document.querySelector("#order__qty__btn_left");
    const displayedQuantity = document.querySelector(".order__actual__qty");

    const addToCart = document.querySelector(".Add__to__cart");

    if (quantity <= 0) {
      if (!orderRemoveButton.classList.contains("qty__btn_inactive"))
        orderRemoveButton.classList.add("qty__btn_inactive");

      if (!addToCart.classList.contains("Add__to__cart_inactive"))
        addToCart.classList.add("Add__to__cart_inactive");

      if (addToCartBtn && addToCartBtn.classList.contains("order__on__hold"))
        addToCartBtn.classList.remove("order__on__hold");
    }

    if (quantity > 0) {
      if (orderRemoveButton.classList.contains("qty__btn_inactive"))
        orderRemoveButton.classList.remove("qty__btn_inactive");

      if (addToCart.classList.contains("Add__to__cart_inactive"))
        addToCart.classList.remove("Add__to__cart_inactive");

      if (addToCartBtn && !addToCartBtn.classList.contains("order__on__hold"))
        addToCartBtn.classList.add("order__on__hold");
    }

    displayedQuantity.textContent = quantity;
  }

  static renderPrice(price) {
    const displayedPrice = document.querySelector(".order__price");
    displayedPrice.textContent = `$ ${Number(price).toFixed(2)}`;
  }

  static closeBasicForm() {
    const form = document.querySelector(".order__form");
    form.style.display = "none";
    form.key = null;
  }
}
