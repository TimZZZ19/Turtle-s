export default class CartEmptyConfirmation {
  static activate() {
    const cartEmptyDialogue = ` <div class="empty__dialogue__bng" style="display:none">
                                  <div class="empty__dialogue__box">
                                    <div class="empty__dialogue__text">
                                      <p>Empty the cart?</p>
                                    </div>
                                    <div class="empty__dialogue__control">
                                      <span class="empty__dialogue__control_yes">YES</span>
                                      <span class="empty__dialogue__control_no">NO</span>
                                    </div>
                                  </div>
                                </div>`;

    document.body.insertAdjacentHTML("beforeend", cartEmptyDialogue);
  }

  static openEmptyDialogue() {
    document.querySelector(".empty__dialogue__bng").style.display = null;
    document.querySelector(".cart__box").style.filter = "blur(3px)";
  }

  static closeEmptyDialogue() {
    document.querySelector(".empty__dialogue__bng").style.display = "none";
    document.querySelector(".cart__box").style.filter = null;
  }
}
