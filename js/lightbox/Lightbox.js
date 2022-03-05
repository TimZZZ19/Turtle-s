export default class Lightbox {
  static activate() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="lightbox" id="lightbox" style="display: none;"> 
          <div class="lightbox__buttons" id="lightbox__close">
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
          <div class="lightbox__buttons" id="lightbox__left">
            <ion-icon name="chevron-back-circle-outline"></ion-icon>
          </div>
          <div class="lightbox__content"></div>
          <div class="lightbox__buttons" id="lightbox__right">
            <ion-icon name="chevron-forward-circle-outline"></ion-icon>
          </div>
        </div>
      `
    );
  }

  static show(htmlOrElement) {
    const content = document.querySelector("#lightbox .lightbox__content");
    document.querySelector("#lightbox").style.display = null;

    // in case of swiping, there's already one element under content.
    if (content.firstChild) {
      content.removeChild(content.firstChild);
    }

    if (typeof htmlOrElement === "string") {
      content.innerHTML = htmlOrElement;
    } else {
      content.appendChild(htmlOrElement);
    }
  }
}
