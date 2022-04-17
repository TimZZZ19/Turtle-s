export default class OrderPageBNG {
  static activate() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="formbox__container" id="formbox__container" style="display: none"> 
          <div class="formbox" >
            
          </div>             
        </div>

        <div class="order__added__msg">
          <p class="order__added__msg_text"> </p>
        </div> 
      `
    );
  }

  static OpenOrderPageBNG() {
    document.querySelector("html").style.overflowY = "hidden";
    document.querySelector(".formbox__container").style.display = null;
  }

  static closeOrderPageBNG() {
    document.querySelector("html").style.overflowY = null;
    document.querySelector(".formbox__container").style.display = "none";
  }
}
