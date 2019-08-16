import Component from "../../component.js";
import PhoneService from "../services/phone-service.js";

export default class PhonesFilter extends Component {
    constructor ({ element }) {
        super({element});

        this._render();

        this._on("input", '[data-element="filter"]', (event) => {
            PhoneService.getPhones((phones) => {
                let n = phones.filter( (p) => {
                    if (p.id.indexOf(event.target.value) !== -1)
                        return p;
                });

                if (n.length     > 0)
                    this.emit("filter", n);
                else
                    this.emit("filter", []);
            });
        });
    }

    _render() {
        this._element.innerHTML = `
            <p>Search:
                <input data-element = "filter" type="text">
            </p>
            
            <p>Sort by:
                <select>
                    <option value="name">Alphabetical</option>
                    <option value="age">Newest</option>
                </select>
            </p>`;
    }

}