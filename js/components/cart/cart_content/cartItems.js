export default class CartItems {
  static activate() {
    const cartContentArea = document.querySelector(".cart__content__area");
    const cartItemsHTML = `<ul class="cart__items">
                              
                          </ul>
                          `;
    cartContentArea.insertAdjacentHTML("beforeend", cartItemsHTML);
  }

  static renderCartItems(items) {
    const list = document.querySelector(".cart__items");

    while (list.firstChild) list.removeChild(list.firstChild);

    // ********************************************************
    // First, create the cart element and add basic infromation
    // ********************************************************
    items.forEach((item) => {
      const { id, foodName, quantity, currentPrice } = item;
      const element = this.createElement(id, foodName, quantity, currentPrice);
      list.insertAdjacentHTML("beforeend", element);
    });

    // ***************************
    // Then, add other information
    // ***************************
    items.forEach((item) => {
      const {
        sizeInfo,
        substitutes,
        extras,
        dressingInfo,
        pastaInfo,
        toppingInfo,
      } = item;

      // If current item has sizeInfo, render it
      if (sizeInfo) {
        addSize(sizeInfo.chozenSize);
      }

      // If substitutes exist, filter those out that are chozen and add them
      if (substitutes) {
        const checkedSubstitutes = substitutes.filter(
          (substitute) => substitute.isChecked
        );
        addSubItem("substitute", checkedSubstitutes);
      }

      // If extras exist, filter those out that are chozen and add them
      if (extras) {
        const checkedExtras = extras.filter((extra) => extra.isChecked);
        addSubItem("extra", checkedExtras);
      }

      // Add dressingInfo or pastaInfo exists, just add them
      if (dressingInfo) {
        addConstitute("Dressing", dressingInfo.chozenDressing);
      }
      if (pastaInfo) {
        addConstitute("Pasta", pastaInfo.chozenPasta);
      }

      // Add current cart item has topping information, add those toppings
      // whose quantity is not equal to zero
      if (toppingInfo) {
        addToppings(toppingInfo.toppings);
      }

      // *******************
      // Utility functions
      // *******************

      function addSize(chozenSize) {
        const sizeHTML = `<li class="item__size"> Size : ${chozenSize} </li>`;
        document
          .getElementById(`${item.id}`)
          .querySelector(".item__composition")
          .insertAdjacentHTML("beforeend", sizeHTML);
      }

      function addSubItem(subItemType, subItems) {
        let verb;
        if (subItemType === "substitute") verb = "With";
        if (subItemType === "extra") verb = "Add";

        subItems.forEach((subItem) => {
          const subItemHTML = `<li class="item__subItem"> ${verb} ${subItem.name} </li>`;
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

      function addToppings(toppings) {
        toppings.forEach((topping) => {
          if (!topping.quantity) return;
          const toppingHTML = `<li class="item__topping"> 
                                <span>${capitalizeFirst(
                                  topping.toppingName
                                )}</span> 
                                <span>${topping.quantity}x</span> 
                              </li>`;
          document
            .getElementById(`${item.id}`)
            .querySelector(".item__composition")
            .insertAdjacentHTML("beforeend", toppingHTML);
        });
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
                    <span class="item__control__btn item__edit">EDIT</span> 
                    <span class="item__control__btn item__remove">REMOVE</span>
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
