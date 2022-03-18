export default class OrderFormbox {
  static activate() {
    // const contentBox = document.getElementsByClassName("formbox__content");
    const contentBox = document.querySelector(".formbox__content");

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
          <div class="order__extra__info"></div>
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
}
