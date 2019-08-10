import Component from "../../component.js";
import PhonePage from '../phones-page.js'

export default class PhoneViewer extends Component{
    constructor({element}) {
        super({ element });

        this._element.addEventListener("click", (event) => {

             if (event.target === this._element.querySelector('.back-button'))
                 this.hide();

             if (event.target.getAttribute('data-image')) {
                 this._element.querySelector('.phone').setAttribute("src", event.target.getAttribute('src'));
             };
          });
    }

    _render(phone) {
        this._element.innerHTML = `
            <img class="phone" src  ="${ phone.images[0] }">

            <button class = "back-button">Back</button>
            <button>Add to basket</button>
        
            <h1>${ phone.name }</h1>
        
            <p>${ phone.description } </p>
        
            <ul class="phone-thumbs">
            ${ phone.images.map( (images, i) => `
              <li>
                <img data-image = "id" src= "${ images }">
              </li>`).join("")}              
            </ul>
        `;
    }

    show(phoneDetails) {
        let phone = phoneDetails;
        this._render(phone);
    }

    hide() {
        new PhonePage( {element: document.querySelector('[data-page-container]')} );
    }

    tmp() {

    }
}


