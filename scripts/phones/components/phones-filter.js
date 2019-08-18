import Component from "../../component.js";
import PhoneService from "../services/phone-service.js";

export default class PhonesFilter extends Component {
    constructor ({ element }) {
        super({element});

        this._render();

        this._on("input", '[data-element="filter"]', (event) => {
            PhoneService.getPhones((phones) => {
                let n = phones.filter( (p) => {
                    if (p.name.toUpperCase().indexOf(event.target.value.toUpperCase()) !== -1)
                        return p;
                });

                if (n.length     > 0)
                    this.emit("filter", n);
                else
                    this.emit("filter", []);
            });
        });

        this._on("change", '[data-element="sort"]', (event) => {
            let sortCriteria = event.target.value;

            if (sortCriteria === 'age') {
                PhoneService.getPhones((phones) => {
                    let n = phones.sort((a, b) => {
                        return b.age - a.age;
                    });
                    this.emit("filter", n);
                });
            }

            if (sortCriteria === 'name') {
                PhoneService.getPhones((phones) => {
                    let n = phones.sort((a, b) => {
                        if (a.name.toUpperCase() > b.name.toUpperCase())
                            return 1;

                        if (a.name.toUpperCase() < b.name.toUpperCase())
                            return -1;

                        return 0;
                    });
                    this.emit("filter", n);
                });
            }
        });
    }

    _render() {
        this._element.innerHTML = `
            <p>Search:
                <input data-element = "filter" type="text">
            </p>
            
            <p>Sort by:
                <select data-element="sort">
                    <option value="name">Alphabetical</option>
                    <option value="age">Newest</option>
                </select>
            </p>`;
    }
}