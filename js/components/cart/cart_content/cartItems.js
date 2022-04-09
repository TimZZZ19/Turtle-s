export default class cartItems {
  static activate() {
    const cartContentArea = document.querySelector(".cart__content__area");
    const cartItemsHTML = `<ul class="cart__items">
                              
                          </ul>
                          `;
    cartContentArea.insertAdjacentHTML("beforeend", cartItemsHTML);
  }

  static displayCartItems(items) {
    const list = document.querySelector(".cart__items");

    while (list.firstChild) list.removeChild(list.firstChild);

    // add basic infromation
    items.forEach((item) => {
      const { id, foodName, quantity, currentPrice } = item;
      const element = this.createElement(id, foodName, quantity, currentPrice);
      list.insertAdjacentHTML("beforeend", element);
    });

    // add extra information
    items.forEach((item) => {
      const { substitutes, extras, chozenDressing, chozenPasta, toppings } =
        item;

      // Add substitutes or extras
      if (substitutes) addSubItem("substitute", substitutes);
      if (extras) addSubItem("extra", extras);

      // Add dressing or pasta
      if (chozenDressing) addConstitute("Dressing", chozenDressing);
      if (chozenPasta) addConstitute("Pasta", chozenPasta);

      // Add topping information
      if (toppings) {
        toppings.forEach((topping) => {
          const toppingHTML = `<li class="item__topping"> 
                                <span>${capitalizeFirst(topping.name)}</span> 
                                <span>${topping.quantity}x</span> 
                              </li>`;
          document
            .getElementById(`${item.id}`)
            .querySelector(".item__composition")
            .insertAdjacentHTML("beforeend", toppingHTML);
        });
      }

      // Utility functions
      function addSubItem(subItemType, subItems) {
        let verb;
        if (subItemType === "substitute") verb = "With";
        if (subItemType === "extra") verb = "Add";

        subItems.forEach((subItem) => {
          const subItemHTML = `<li class="item__subItem"> ${verb} ${subItem} </li>`;
          document
            .getElementById(`${item.id}`)
            .querySelector(".item__composition")
            .insertAdjacentHTML("beforeend", subItemHTML);
        });
      }

      function addConstitute(constituteType, chozenConstitue) {
        const constituteHTML = `<li class="item__constitute"> ${constituteType} : ${chozenConstitue} </li>`;
        document
          .getElementById(`${item.id}`)
          .querySelector(".item__composition")
          .insertAdjacentHTML("beforeend", constituteHTML);
      }

      function capitalizeFirst(str) {
        // checks for null, undefined and empty string
        if (!str) return;
        return str.match("^[a-z]")
          ? str.charAt(0).toUpperCase() + str.substring(1)
          : str;
      }
    });
  }

  static createElement(id, name, qty, price) {
    return `<li class="cart__item cart__item_${name}" id="${id}">
              <div class="item__information">
                <div class="item__quantity">${qty}x</div>
                <div class="item__composition_and_control">
                  <p class="item__name">${name}</p>
                  <ul class="item__composition">
                  </ul>
                  <div class="item__control">
                    <span class="item__edit">EDIT</span> 
                    <span class="item__remove">REMOVE</span>
                  </div>
                </div>
              </div>
              <div class="item__price">
                <span>$ ${price.toFixed(2)}</span>
              </div>
            </li> 
          `;
  }
}
