export default class CartWarningMsg {
  static activate() {
    const cartControl = document.querySelector(".cart__bill_and_control");

    const warningMsgHTML = `
                          <div class="cart__warning" >
                          </div>
                        `;

    cartControl.insertAdjacentHTML("beforeend", warningMsgHTML);
  }

  static displayWarningMSG(message) {
    const warningBox = document.querySelector(".cart__warning");
    const warningMsg = `<p> ${message} </p>`;

    warningBox.innerHTML = warningMsg;
    warningBox.classList.toggle("cart__warning_show");
  }

  static closeWarningMSG() {
    const warningBox = document.querySelector(".cart__warning");
    warningBox.classList.toggle("cart__warning_show");
  }
}
