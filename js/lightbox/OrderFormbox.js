export default class OrderFormbox {
  static activate() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="formbox" id="formbox" style="display: none"> 
          
          <div class="formbox__content" >
            <div class="formbox__close_button">
              <ion-icon class="formbox__close_icon" name="close-outline"></ion-icon>
            </div>
          </div>
        </div>
      `
    );
  }
}
