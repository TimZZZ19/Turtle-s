export default class PaymentBNG {
  static activate() {
    const paymentBNGHTML = `<div class="formbox__container payment__bng" style="display: none">
                              <div class="formbox payment__box">
                              </div>
                            </div>`;
    document.body.insertAdjacentHTML("beforeend", paymentBNGHTML);
  }

  static openPaymentPage() {
    document.querySelector("html").style.overflowY = "hidden";
    const paymentBNG = document.querySelector(".payment__bng");
    paymentBNG.style.display = null;
  }

  static closePaymentPage() {
    document.querySelector("html").style.overflowY = null;
    const paymentBNG = document.querySelector(".payment__bng");
    paymentBNG.style.display = "none";
  }
}
