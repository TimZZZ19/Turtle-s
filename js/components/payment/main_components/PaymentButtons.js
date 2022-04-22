export default class PaymentButtons {
  static activate() {
    const paymentBtnsHTML = `
                        <div class="payment__section " >

                          <div class="payment__control">
                            <button class="payment__control__go__back"> GO BACK  </button>
                            <button class="payment__control__confirm__payment"> CONFIRM </button>
                          </div>

                        </div>  
                      `;

    const paymentForm = document.querySelector(".payment__form");
    paymentForm.insertAdjacentHTML("beforeend", paymentBtnsHTML);
  }
}
