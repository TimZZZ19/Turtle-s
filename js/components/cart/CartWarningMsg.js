export default class CartWarningMsg {
  static activate() {
    const cartControl = document.querySelector(".cart__control");

    const warningMsgHTML = `
                          <div class="cart__warning" >
                          </div>
                        `;

    cartControl.insertAdjacentHTML("beforebegin", warningMsgHTML);
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
