export default class PaymentForm {
  static activate() {
    const paymentBox = document.querySelector(".payment__box");
    const paymentFormHTML = ` <div class="formbox__close_button 
                                          payment__box__close__btn">

                                <ion-icon class="formbox__close_icon 
                                                 payment__box__close_icon" 
                                                 name="close-outline">
                                </ion-icon>
                              </div>

                              <form class="payment__form" > 
                                
                              </form>  
                            `;
    paymentBox.innerHTML = paymentFormHTML;
  }
}
