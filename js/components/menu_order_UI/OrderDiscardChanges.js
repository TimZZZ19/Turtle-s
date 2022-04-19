export default class OrderDiscardChanges {
  static activate() {
    const discardChangesDiv = ` <div class="discard__changes__bng" style="display:none">
                                  <div class="discard__changes__box" >
                                    <div class="discard__changes__text">      
                                      <p>Discard changes?</p>
                                    </div>
                                    <div class="discard__control">
                                      <span class="keep__editing">KEEP EDITING</span>
                                      <span class="discard__changes">DISCARD</span>
                                    </div>
                                  </div>
                                </div>
                                `;
    document.body.insertAdjacentHTML("beforeend", discardChangesDiv);
  }

  static openDiscardBox() {
    const orderForm = document.querySelector(".order__form");
    if (orderForm.classList.contains("order__form_blur")) return;

    orderForm.classList.toggle("order__form_blur");
    document.querySelector(".discard__changes__bng").style.display = null;
  }

  static closeDiscardBox() {
    const orderForm = document.querySelector(".order__form");
    if (!orderForm.classList.contains("order__form_blur")) return;

    orderForm.classList.toggle("order__form_blur");
    document.querySelector(".discard__changes__bng").style.display = "none";
  }
}
