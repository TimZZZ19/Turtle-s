export default class SizeOptions {
  static activate() {
    const formControl = document.querySelector(".order__form__control");

    const element = `<div class="order__size__options" style="display: none;">
                        <p>Choose your size : </p>
                        <div class="size_options__container">
                          <div>
                            <input 
                              type="radio" 
                              id="small" 
                              name="size" 
                              value="small" 
                              checked
                            >
                            <label for="small"> Small </label>
                          </div>
                          <div>
                            <input 
                              type="radio" 
                              id="medium" 
                              name="size" 
                              value="medium" 
                              
                            >
                            <label for="medium"> Medium </label>
                          </div>
                          <div>
                            <input 
                              type="radio" 
                              id="large" 
                              name="size" 
                              value="large" 
                              
                            >
                            <label for="large"> Large </label>
                          </div>

                        </div>
                    </div>`;

    formControl.insertAdjacentHTML("beforebegin", element);
  }

  static displayOptions(mediumPrice) {
    document.querySelector(".order__size__options").style.display = null;
    if (!mediumPrice) {
      const mediumOption = document.querySelector("#medium").parentNode;
      mediumOption.style.display = "none";
    }
  }

  static closeOptions() {
    document.querySelector(".order__size__options").style.display = "none";
  }
}
