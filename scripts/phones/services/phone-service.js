import HTTPService from "../../http-service.js";

const PhoneService = {
  getPhones(callback) {
      HTTPService.sendRequest('/api/phones.json', {
          successCallback: callback,
      });
  },

    getPhone(phoneId, callback) {
        HTTPService.sendRequest(`/api/phones/${phoneId}.json`, {
            successCallback: callback,
        });
    },

    getFilterPhones(value) {
        HTTPService.sendRequest('/api/phones.json', {
        });
    },
};

export default PhoneService;