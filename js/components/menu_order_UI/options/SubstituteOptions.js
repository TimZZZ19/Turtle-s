export default class SubstituteOptions {
  static activate() {
    const formControl = document.querySelector(".order__form__control");

    const element = `
                    <div class="order__substitutes__container" style="display: none;">
                      <p>Substitute options : </p>
                      <div class="order__substitute__options">
                      </div>
                    </div>
                    `;

    formControl.insertAdjacentHTML("beforebegin", element);
  }

  static displayOptions(substitutes) {
    const substitutesContainer = document.querySelector(
      ".order__substitutes__container"
    );
    const substitutesOptions = document.querySelector(
      ".order__substitute__options"
    );

    substitutesContainer.style.display = null;
    while (substitutesOptions.firstChild)
      substitutesOptions.removeChild(substitutesOptions.firstChild);

    substitutes.forEach((substitute) => {
      const substituteItem = this.getSubstituteItem(
        substitute.name,
        substitute.price,
        substitute.isChecked
      );

      substitutesOptions.insertAdjacentHTML("beforeend", substituteItem);
    });
  }

  static getSubstituteItem(name, price, isChecked) {
    const nameNoSpace = name.split(" ").join("");
    return `<div class="substitute__item" >
              <span class="substitute__input" >
                <input 
                  type="checkbox" 
                  class='substitute__input__checkbox'
                  id=${nameNoSpace} 
                  name=${nameNoSpace} 
                  ${isChecked && "checked"}
                >
                <label> ${name}  </label>
              </span>
              <span class="substitute__price">
                + $&nbsp;${price}
              </span> 
            </div>
          `;
  }

  static closeOptions() {
    const substitutesContainer = document.querySelector(
      ".order__substitutes__container"
    );
    const substitutesOptions = document.querySelector(
      ".order__substitute__options"
    );

    substitutesContainer.style.display = "none";

    while (substitutesOptions.firstChild)
      substitutesOptions.removeChild(substitutesOptions.firstChild);
  }
}
