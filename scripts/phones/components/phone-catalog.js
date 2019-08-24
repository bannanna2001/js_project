import Component from "../../component.js";
import PhoneService from "../services/phone-service.js";

export default class PhoneCatalog extends Component{
    constructor({ element }) {
        super({ element });

        this._on("click", '[data-element = "add-button"]', (event) => {
            let phoneElement = event.target.closest('[data-element = "phone"]');
            this.emit('add', phoneElement.dataset.phoneId);
        }, );

        this._on("click", '[data-element = "phone-details-link"]',(event) => {
            let phoneElement = event.target.closest('[data-element = "phone"]');
            this.emit('phoneSelected', phoneElement.dataset.phoneId);
        }, );
    }
    
    _render(){
        this._element.innerHTML = `
           <ul class="phones">
           ${ this._phones.map(phone => `
               <li class="thumbnail" data-element = "phone" data-phone-id = "${ phone.id }">
                    <a data-element = "phone-details-link" href="#!/phones/${ phone.id }" class="thumb">
                      <img alt="${ phone.name }" src="${ phone.imageUrl }">
                    </a>
        
                    <div class="phones__btn-buy-wrapper">
                      <a class="btn btn-success" data-element="add-button">
                        Add
                      </a>
                    </div>
        
                    <a data-element = "phone-details-link" href="#!/phones/${ phone.id }">${ phone.name  }</a>
                    <p>${ phone.snippet }</p>
               </li>  
           `).join('') }                          
            </ul>
        `;
    }

    show(phones) {
        this._phones = phones;
        this._render();

        super.show();
    }
}