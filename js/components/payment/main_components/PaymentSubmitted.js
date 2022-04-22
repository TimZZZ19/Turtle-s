export default class PaymentSubmitted {
  static activate() {
    const paymentSubmittedHTML = ` <div class="payment__submitted__notification" >
                                      <p>Thank you! <br> Your payment has been submitted.</p>
                                   </div>
                                  `;
    document.body.insertAdjacentHTML("beforeend", paymentSubmittedHTML);
  }

  static displaySubmitted() {
    const notification = document.querySelector(
      ".payment__submitted__notification"
    );
    if (!notification.classList.contains("notification__show")) {
      notification.classList.add("notification__show");
    }
  }
  static closeSubmitted() {
    const notification = document.querySelector(
      ".payment__submitted__notification"
    );
    if (notification.classList.contains("notification__show")) {
      notification.classList.remove("notification__show");
    }
  }
}
