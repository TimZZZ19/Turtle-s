export default class PaymentInformation {
  static activate() {
    const paymentInformationHTML = `
                        <div class="payment__section " >

                          <p class="section__title"> 
                            Payment Information
                          </p>

                          <div class="section__inputs__area">
                            <div class="section__input">
                              <label for="card__number">Card Number</label>
                              <input type="tel" id="card__number" 
                                    name="card__number" pattern="\d*" maxlength="19">
                            </div>

                            <div class="section__input">
                              <label for="expiration__date">Expiration Date</label>
                              <input type="date" id="expiration__date" 
                                    name="expiration__date">
                            </div>
                            
                            <div class="section__inline__inputs">
                              <div class="section__input">
                                <label for="card__cvc">CVC</label>
                                <input type="number" id="card__cvc" 
                                      name="card__cvc">
                              </div>

                              <div class="section__input">
                                <label for="card__zip">Zip Code</label>
                                <input type="number" id="card__zip" 
                                      name="card__zip">
                              </div>
                            </div>
                          </div>



                            

                          

                        </div>  
                      `;

    const paymentForm = document.querySelector(".payment__form");
    paymentForm.insertAdjacentHTML("beforeend", paymentInformationHTML);
  }
}
