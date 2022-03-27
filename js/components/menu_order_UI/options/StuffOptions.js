export default class StuffOptions {
  static activate(stuff) {
    const formControl = document.querySelector(".order__form__control");

    let title = "No Title (by default)";

    if (stuff === "substitute") title = "Choose your substitutes";

    if (stuff === "extra") title = "Add extra";

    const element = `
                    <div class="order__item__container order__${stuff}s__container" style="display: none;">
                      <p>${title} : </p>
                      <div class="order__item__options order__${stuff}__options">
                      </div>
                    </div>
                    `;

    formControl.insertAdjacentHTML("beforebegin", element);
  }

  static displayOptions(stuffType, stuff) {
    const container = document.querySelector(
      `.order__${stuffType}s__container`
    );
    const options = document.querySelector(`.order__${stuffType}__options`);

    container.style.display = null;
    while (options.firstChild) options.removeChild(options.firstChild);

    stuff.forEach((item) => {
      const object = this.getItem(
        item.name,
        item.price,
        item.isChecked,
        stuffType
      );

      options.insertAdjacentHTML("beforeend", object);
    });
  }

  static getItem(name, price, isChecked, stuffType) {
    const nameNoSpace = name.split(" ").join("");

    return `<div class="order__item ${stuffType}" >
              <span class="order__input ${stuffType}__input" >
                <input 
                  type="checkbox" 
                  class='${stuffType}__input__checkbox'
                  id=${nameNoSpace} 
                  name=${nameNoSpace} 
                  ${isChecked && "checked"}
                >
                <label> ${name}  </label>
              </span>
              <span class="${stuffType}__price">
                + $&nbsp;${price}
              </span> 
            </div>
          `;
  }

  static closeOptions(stuffType) {
    const container = document.querySelector(
      `.order__${stuffType}s__container`
    );
    const options = document.querySelector(`.order__${stuffType}__options`);

    container.style.display = "none";

    while (options.firstChild) options.removeChild(options.firstChild);
  }
}
