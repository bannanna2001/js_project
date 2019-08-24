import Component from "../../component.js";
import PhonePage from '../phones-page.js'

export default class PhoneViewer extends Component{
    constructor({element}) {
        super({ element });

        this._on("click", '[data-element="back-button"]', () => {
            this.emit("back");
        });

        this._on("click", '[data-element="add-button"]', () => {
            this.emit("add", this._phone.id);
        });

        this._on("click", '[data-image = "id"]', (event) => {
            let mainPicture = document.querySelector(".phone");
            mainPicture.setAttribute("src", event.target.getAttribute("src"));
        });
    }

    _render() {
        this._element.innerHTML = `
            <img class="phone" src  ="${ this._phone.images[0] }">

            <button data-element="back-button">Back</button>
            <button data-element="add-button">Add to basket</button>
        
            <h1>${ this._phone.name }</h1>
        
            <p>${ this._phone.description } </p>
        
            <ul class="phone-thumbs">
            ${ this._phone.images.map( (images, i) => `
              <li>
                <img data-image = "id" src= "${ images }">
              </li>`).join("")}              
            </ul>
        `;
    }

    show(phoneDetails) {
        this._phone = phoneDetails;
        this._render();

        super.show();
    }

}


