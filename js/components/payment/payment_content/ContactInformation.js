export default class ContactInformation {
  static activate() {
    const contactHTML = ` <div class="payment__section contact__information">

                            <p class="section__title"> 
                              Contact Information 
                            </p>

                            <div class="section__inputs__area contact__information__inputs__area">
                              
                              <div class="section__input">
                                <label for="fname">Name</label>
                                <input type="text" id="fname" 
                                      name="fname" placeholder="First name">
                              </div class="section__input">

                              <div class="section__input">
                                <label for="phone__number">Phone number</label>
                                <input type="tel" id="phone__number" 
                                      name="phone__number">
                              </div>
                              
                              <div class="section__input"> 
                                <div class="notification__options"> 
                                  <span class="notification__option">
                                    <input type="checkbox" id="notification__sms" name="notification__sms">
                                    <label>Text Message</label>
                                  </span>
                                  <span class="notification__option">
                                    <input type="checkbox" id="notification__email" name="notification__email">
                                    <label>Email</label>
                                  </span>
                                </div> 

                                <p class="notification__text">
                                  Message & data rates may apply. 
                                  To opt out at any time, 
                                  you can txt STOP or HELP for support.
                                </p>
                              </div>
                            </div>

                          </div>   
                        `;
    const paymentForm = document.querySelector(".payment__form");
    paymentForm.insertAdjacentHTML("beforeend", contactHTML);
  }
}
