export default class Toppings {
  static activate() {
    const formControl = document.querySelector(".order__form__control");

    const element = `
                    <div class="order__item__container order__toppings__container" style="display: none;">
                      <p> Choose your toppping(s) : </p>
                      <div class="order__item__options order__topping__options">
                      </div>
                    </div>
                    `;

    formControl.insertAdjacentHTML("beforebegin", element);
  }

  static renderToppings(toppings) {
    const container = document.querySelector(".order__toppings__container");
    container.style.display = null;

    const options = document.querySelector(`.order__topping__options`);
    while (options.firstChild) options.removeChild(options.firstChild);

    toppings.forEach((topping) => {
      const itemToBeAttached = this.getItem(
        topping.toppingName,
        topping.quantity
      );
      options.insertAdjacentHTML("beforeend", itemToBeAttached);
    });
  }

  static getItem(name, quantity) {
    const capitlizeFirst = (str) => {
      // checks for null, undefined and empty string
      if (!str) return;
      return str.match("^[a-z]")
        ? str.charAt(0).toUpperCase() + str.substring(1)
        : str;
    };

    return `  
            <div class="topping__item" >
              <span class="topping__name"> ${capitlizeFirst(name)} </span>
              <span 
                class="topping__qty__btn 
                       topping__qty__btn_left 
                       ${!quantity && "qty__btn_inactive"}"
              >
                <ion-icon name="remove-circle-outline"></ion-icon>
              </span>
              <span class="topping__qty"> ${quantity} </span>
              <span class="topping__qty__btn topping__qty__btn_right">
                <ion-icon name="add-circle-outline"></ion-icon>
              </span>
            </div>
          `;
  }

  static closeOptions() {
    const container = document.querySelector(".order__toppings__container");
    container.style.display = "none";

    const options = document.querySelector(`.order__topping__options`);
    while (options.firstChild) options.removeChild(options.firstChild);
  }
}
