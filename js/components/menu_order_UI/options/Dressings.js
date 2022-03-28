export default class Dressing {
  static activate() {
    const formControl = document.querySelector(".order__form__control");

    const element = `<div class="dressings__container" style="display: none;">
                        <label for="dressings"> Pick your dressing: </label>

                        <select  id="dressings" name="dressings" class="dressing__options">
                        </select>
                          
                      </div>
                    `;

    formControl.insertAdjacentHTML("beforebegin", element);
  }

  static renderDressings(chozenDressing, dressingOptions) {
    const container = document.querySelector(".dressings__container");
    container.style.display = null;

    const options = document.querySelector(".dressing__options");
    while (options.firstChild) options.removeChild(options.firstChild);

    // get dressing item and attach it to options one by one
    dressingOptions.forEach((dressing) => {
      const itemToBeRendered = this.getDressingItem(dressing);
      options.insertAdjacentHTML("beforeend", itemToBeRendered);
    });

    options.value = chozenDressing ? chozenDressing : dressingOptions[0];
  }

  static getDressingItem(dressingToBeRendered) {
    return `<option class="dressing__item"  >
              ${dressingToBeRendered} 
            </option>
          `;
  }

  static closeOptions() {
    const container = document.querySelector(".dressings__container");
    container.style.display = "none";
    const options = document.querySelector(".dressing__options");
    while (options.firstChild) options.removeChild(options.firstChild);
  }
}
