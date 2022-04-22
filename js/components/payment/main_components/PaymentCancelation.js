export default class PaymentCancelation {
  static activate() {
    const cartEmptyDialogue = ` <div class="payment__cancelation__bng" style="display:none">
                                  <div class="payment__cancelation__box">
                                    <div class="payment__cancelation__text">
                                      <p>Cancel payment?</p>
                                    </div>
                                    <div class="payment__cancelation__control">
                                      <span class="payment__cancelation_yes">YES</span>
                                      <span class="payment__cancelation_no">NO</span>
                                    </div>
                                  </div>
                                </div>`;

    document.body.insertAdjacentHTML("beforeend", cartEmptyDialogue);
  }

  static openCancelationDialogue() {
    document.querySelector(".payment__cancelation__bng").style.display = null;
    document.querySelector(".payment__box").style.filter = "blur(3px)";
  }

  static closeCancelationDialogue() {
    document.querySelector(".payment__cancelation__bng").style.display = "none";
    document.querySelector(".payment__box").style.filter = null;
  }
}
