export default class AddExtra {
  static activate() {
    const formControl = document.querySelector(".order__form__control");

    const element = `
                    <div class="order__item__container order__extras__container" style="display: none;">
                      <p>Add extra : </p>
                      <div class="order__item__options order__extra__options">
                      </div>
                    </div>
                    `;

    formControl.insertAdjacentHTML("beforebegin", element);
  }

  static displayExtraOptions(extras) {
    const extrasContainer = document.querySelector(".order__extras__container");
    const extraOptions = document.querySelector(".order__extra__options");

    extrasContainer.style.display = null;
    while (extraOptions.firstChild)
      extraOptions.removeChild(extraOptions.firstChild);

    extras.forEach((extra) => {
      const extraItem = this.getExtraItem(
        extra.name,
        extra.price,
        extra.isChecked
      );

      extraOptions.insertAdjacentHTML("beforeend", extraItem);
    });
  }

  static getExtraItem(name, price, isChecked) {
    const nameNoSpace = name.split(" ").join("");
    return `<div class="order__item extra" >
              <span class="order__input extra__input" >
                <input 
                  type="checkbox" 
                  class='extra__input__checkbox'
                  id=${nameNoSpace} 
                  name=${nameNoSpace} 
                  ${isChecked && "checked"}
                >
                <label> ${name}  </label>
              </span>
              <span class="extra__price">
                + $&nbsp;${price}
              </span> 
            </div>
          `;
  }

  static closeExtraOptions() {
    const extrasContainer = document.querySelector(".order__extras__container");
    const extraOptions = document.querySelector(".order__extra__options");

    extrasContainer.style.display = "none";

    while (extraOptions.firstChild)
      extraOptions.removeChild(extraOptions.firstChild);
  }
}
