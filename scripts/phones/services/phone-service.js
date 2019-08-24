import HTTPService from "../../http-service.js";

const PhoneService = {
    getPhones() {
        return HTTPService.sendRequest('/api/phones.json');
    },

    getPhone(phoneId) {
        return HTTPService.sendRequest(`/api/phones/${phoneId}.json`);
    },

    getFilterPhones(value) {
        HTTPService.sendRequest('/api/phones.json', {});
    },
};

export default PhoneService;