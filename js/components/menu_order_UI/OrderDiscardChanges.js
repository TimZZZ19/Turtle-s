export default class OrderDiscardChanges {
  static activate() {
    const formboxContainer = document.querySelector(".formbox__container");
    const discardChangesDiv = ` <div class="discard__changes__box" style="display:none">
                                  <div class="discard__changes__text">      
                                    <p>Discard changes?</p>
                                  </div>
                                  <div class="discard__control">
                                    <span class="keep__editing">KEEP EDITING</span>
                                    <span class="discard__changes">DISCARD</span>
                                  </div>
                                 </div>
                                `;
    formboxContainer.insertAdjacentHTML("beforeend", discardChangesDiv);
  }

  static openDiscardBox() {
    document.querySelector(".formbox").style.display = "none";
    document.querySelector(".discard__changes__box").style.display = null;
  }

  static closeDiscardBox() {
    document.querySelector(".formbox").style.display = null;
    document.querySelector(".discard__changes__box").style.display = "none";
  }
}
