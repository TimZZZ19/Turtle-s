export default class Constitutes {
  static activate(constituteType) {
    const formControl = document.querySelector(".order__form__control");

    const element = `<div class="constitutes__container ${constituteType}s__container" style="display: none;">
                        <label for="${constituteType}s"> Pick your ${constituteType}: </label>

                        <select  id="${constituteType}s" name="${constituteType}s" class="constitute__options ${constituteType}__options">
                        </select>
                          
                      </div>
                    `;

    formControl.insertAdjacentHTML("beforebegin", element);
  }

  static renderConstitutes(constituteType, constituteInfo) {
    if (!constituteInfo) return;
    const chozenConstitute =
      constituteInfo[`chozen${capitalizeFirst(constituteType)}`];
    const constituteOptions = constituteInfo[`${constituteType}Options`];

    const container = document.querySelector(`.${constituteType}s__container`);
    container.style.display = null;

    const options = document.querySelector(`.${constituteType}__options`);
    while (options.firstChild) options.removeChild(options.firstChild);

    // get dressing item and attach it to options one by one
    constituteOptions.forEach((constitute) => {
      const itemToBeRendered = this.getConsituteItem(constitute);
      options.insertAdjacentHTML("beforeend", itemToBeRendered);
    });

    // options.value = chozenConstitute ? chozenConstitute : constituteOptions[0];
    options.value = chozenConstitute;

    function capitalizeFirst(str) {
      // checks for null, undefined and empty string
      if (!str) return;
      return str.match("^[a-z]")
        ? str.charAt(0).toUpperCase() + str.substring(1)
        : str;
    }
  }

  static getConsituteItem(constituteToBeRendered) {
    return `<option class=".constitute__item"  >
              ${constituteToBeRendered} 
            </option>
          `;
  }

  static closeConstituteOptions(constituteType) {
    const container = document.querySelector(`.${constituteType}s__container`);
    container.style.display = "none";

    const options = document.querySelector(`.${constituteType}__options`);
    while (options.firstChild) options.removeChild(options.firstChild);
  }
}
