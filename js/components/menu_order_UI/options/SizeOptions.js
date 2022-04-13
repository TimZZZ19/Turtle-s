export default class SizeOptions {
  static activate() {
    const formControl = document.querySelector(".order__form__control");

    const element = `<div class="order__size__options" style="display: none;">
                        <p>Choose your size : </p>
                        <div class="size_options__container">
                          <div>
                            <input 
                              class="size__option__input"
                              type="radio" 
                              id="small" 
                              name="size" 
                            >
                            <label> Small </label>
                          </div>
                          <div>
                            <input 
                              class="size__option__input"
                              type="radio" 
                              id="medium" 
                              name="size" 
                            >
                            <label> Medium </label>
                          </div>
                          <div>
                            <input 
                              class="size__option__input"
                              type="radio" 
                              id="large" 
                              name="size" 
                            >
                            <label> Large </label>
                          </div>

                        </div>
                    </div>`;

    formControl.insertAdjacentHTML("beforebegin", element);
  }

  static renderSize(sizeInfo) {
    if (!sizeInfo) return;
    const { chozenSize, sizePricePairs } = sizeInfo;

    document.querySelector(".order__size__options").style.display = null;
    const mediumOption = document.querySelector("#medium");

    // some items might not have have the medium option,
    // if the current item doesn't, then don't display it
    if (!sizePricePairs["medium"]) {
      mediumOption.parentNode.style.display = "none";
    }

    if (chozenSize === "small") {
      document.querySelector("#small").checked = true;
    }

    if (sizePricePairs["medium"] && chozenSize === "medium") {
      mediumOption.checked = true;
    }

    if (chozenSize === "large") {
      document.querySelector("#large").checked = true;
    }
  }

  static closeSizeOptions() {
    document.querySelector(".order__size__options").style.display = "none";

    const mediumOption = document.querySelector("#medium");

    document.querySelector("#small").checked = false;

    // if current item has medium size,
    // then the related element's dipslay property must be null
    if (mediumOption.parentNode.style.display === null)
      mediumOption.checked = false;
    document.querySelector("#large").checked = false;
  }
}
