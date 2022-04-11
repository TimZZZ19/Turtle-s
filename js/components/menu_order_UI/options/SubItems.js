export default class SubItems {
  static activate(subitem) {
    const formControl = document.querySelector(".order__form__control");

    let title = "No Title (by default)";

    if (subitem === "substitute") title = "Choose your substitutes";

    if (subitem === "extra") title = "Add extra";

    const element = `
                    <div class="order__item__container order__${subitem}s__container" >
                      <p>${title} : </p>
                      <div class="order__item__options order__${subitem}__options">
                      </div>
                    </div>
                    `;

    formControl.insertAdjacentHTML("beforebegin", element);
  }

  static renderSubItems(subItemType, subItems) {
    const options = document.querySelector(`.order__${subItemType}__options`);
    while (options.firstChild) options.removeChild(options.firstChild);

    subItems.forEach((item) => {
      const itemToBeRendered = this.getItem(
        item.name,
        item.price,
        item.isChecked,
        subItemType
      );

      options.insertAdjacentHTML("beforeend", itemToBeRendered);
    });
  }

  static getItem(name, price, isChecked, subItemType) {
    const nameNoSpace = name.split(" ").join("");

    const capitlizeFirst = (str) => {
      // checks for null, undefined and empty string
      if (!str) return;
      return str.match("^[a-z]")
        ? str.charAt(0).toUpperCase() + str.substring(1)
        : str;
    };

    return `<div class="order__item ${subItemType}" >
              <span class="order__input ${subItemType}__input" >
                <input 
                  type="checkbox" 
                  class='${subItemType}__input__checkbox'
                  id=${nameNoSpace} 
                  name=${nameNoSpace} 
                  ${isChecked && "checked"}
                >
                <label> ${capitlizeFirst(name)}  </label>
              </span>
              <span class="${subItemType}__price">
                + $&nbsp;${price.toFixed(2)}
              </span> 
            </div>
          `;
  }
}
