export default class OrderFormbox {
  static activate() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="formbox" id="formbox" style="display: none"> 
          <div class="formbox__content" >
            
          </div>
        </div>
      `
    );
  }
}
