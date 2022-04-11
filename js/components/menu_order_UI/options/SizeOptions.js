export default class SizeOptions {
  static activate() {
    const formControl = document.querySelector(".order__form__control");

    const element = `<div class="order__size__options" >
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

  static renderSize(currentSize, mediumPrice) {
    const mediumOption = document.querySelector("#medium");

    if (!mediumPrice) {
      mediumOption.parentNode.style.display = "none";
    }

    if (currentSize === "small") {
      document.querySelector("#small").checked = true;
    }

    if (mediumPrice && currentSize === "medium") {
      mediumOption.checked = true;
    }

    if (currentSize === "large") {
      document.querySelector("#large").checked = true;
    }
  }
}
