import PhoneCatalog from './components/phone-catalog.js';
import PhoneService from './services/phone-service.js';
import PhoneViewer from './components/phone-viewer.js';
import PhonesFilter from './components/phones-filter.js';
import ShoppingCart from './components/shopping-cart.js';

export default class PhonePage {
    constructor({element}) {
        this._element = element;
        this._render();

        this._initCatalog();
        this._initViewer();
        this._initFilters();
        this._initShoppingCart();
    }

    _initCatalog() {
        this._catalog = new PhoneCatalog({
            element: document.querySelector('[data-component = "phone-catalog"]'),
        });

        this._loadPhonesFromServer();

        this._catalog.subscribe("phoneSelected", phoneId => {
            PhoneService.getPhone(phoneId)
                .then((phoneDetails) => {
                    this._catalog.hide();
                    this._viewer.show(phoneDetails);
                });
            });

        this._catalog.subscribe("add", phoneId => {
            this._shoppingCart.addItem(phoneId);
        });
    }

    _initViewer() {
        this._viewer = new PhoneViewer({
           element:  this._element.querySelector('[data-component = "phone-viewer"]'),
        });

        this._viewer.subscribe("add", (phoneId) => {
            this._shoppingCart.addItem(phoneId);
        });

        this._viewer.subscribe("back", (phoneId) => {
            this._viewer.hide();
            this._loadPhonesFromServer();
        });
    };

    _loadPhonesFromServer() {
        PhoneService.getPhones().then((phones) => {
                this._catalog.show(phones);
            });
    }

    _initShoppingCart() {
        this._shoppingCart = new ShoppingCart({
            element:  this._element.querySelector('[data-component = "shopping-cart"]'),
        });
    };

    _initFilters() {
        this._filter = new PhonesFilter({
            element:  this._element.querySelector('[data-component = "phones-filter"]'),
        });

        this._filter.subscribe("filter", (phones) => {
            this._catalog.show(phones);
        });
    };

    _render(){
        this._element.innerHTML = `
            <div class="row">

              <!--Sidebar-->
              <div class="col-md-2">
                <section>
                    <div data-component="phones-filter"></div>
                </section>
        
                <section>
                  <div data-component="shopping-cart"></div>
                </section>
              </div>
        
              <!--Main content-->
              <div class="col-md-10">
                <div data-component = "phone-catalog" class="js-hidden"> </div>
                <div data-component = "phone-viewer" class="js-hidden"> </div>
              </div>                
            </div>
        `;
    }
}