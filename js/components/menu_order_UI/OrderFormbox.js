export default class OrderFormbox {
  static activate() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="formbox__container" id="formbox__container" style="display: none"> 
          <div class="formbox" >
            
          </div>
        </div>
      `
    );
  }

  static displayOrderFormbox() {
    document.querySelector(".formbox__container").style.display = null;
  }

  static closeOrderFormbox() {
    document.querySelector(".formbox__container").style.display = "none";
  }
}
