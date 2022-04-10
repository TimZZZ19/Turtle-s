export default class OrderBox {
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

  static OpenOrderBox() {
    document.querySelector("html").style.overflowY = "hidden";
    document.querySelector(".formbox__container").style.display = null;
  }

  static closeOrderBox() {
    document.querySelector("html").style.overflowY = null;
    document.querySelector(".formbox__container").style.display = "none";
  }
}
