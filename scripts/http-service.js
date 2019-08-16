const API_URL = '';

const HTTPService = {
    sendRequest(url, {
        method = "GET",
        successCallback = () => {},
        errorCallback = (error) => { console.error(error) },
    }) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status !== 200) {
                errorCallback(xhr.status + ": " + xhr.statusText);
            } else {
                successCallback(JSON.parse(xhr.responseText));
            }
        };
    },
};

export default HTTPService;