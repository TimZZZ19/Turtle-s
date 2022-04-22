export default class OrderSummary {
  static activate() {
    const orderSummaryHTML = ` 
                        
                        <div class="payment__section checkout__section ">
                          <p class="section__title checkout__title"> 
                            Check-Out
                          </p>
                          <p class="summary__text"></p>
                        </div> 
                        `;
    const paymentForm = document.querySelector(".payment__form");
    paymentForm.insertAdjacentHTML("beforeend", orderSummaryHTML);
  }

  static renderTotalPrice(total) {
    document.querySelector(
      ".summary__text"
    ).textContent = `Your total will be $ ${total}. Please enter the following information.`;
  }
}
