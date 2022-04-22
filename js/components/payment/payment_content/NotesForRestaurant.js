export default class NotesForRestaurant {
  static activate() {
    const notesHTML = `
                        <div class="payment__section " >

                          <p class="section__title"> 
                            Notes for Restaurant
                          </p>

                          <div class="section__inputs__area">
                            <textarea name="notes__for__restaurant" id="notes__for__restaurant" rows="4" cols="50"
                             placeholder="Please enter your particular requests here"></textarea>
                          </div>

                        </div>  
                      `;

    const paymentForm = document.querySelector(".payment__form");
    paymentForm.insertAdjacentHTML("beforeend", notesHTML);
  }
}
