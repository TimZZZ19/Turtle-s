export default class OrderWarningMsg {
  static activate() {
    const orderForm = document.querySelector(".order__form");

    const warningMsgHTML = `
                          <div class="order__warning " >
                          </div>
                        `;

    orderForm.insertAdjacentHTML("beforeend", warningMsgHTML);
  }

  static displayWarningMSG(message) {
    const warningBox = document.querySelector(".order__warning");

    const warningMsg = `<p> ${message} </p>`;
    warningBox.innerHTML = warningMsg;

    warningBox.classList.toggle("order__warning_show");
  }

  static closeWarningMSG() {
    const warningBox = document.querySelector(".order__warning");
    warningBox.classList.toggle("order__warning_show");
  }
}
