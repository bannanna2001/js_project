const API_URL = '';

const HTTPService = {
    sendRequest(url) {
        return new Promise((resolve) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send();

            xhr.onload = () => {
                if (xhr.status !== 200) {
                    console.log(xhr.status + ": " + xhr.statusText);
                } else {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
            };
        });
    },
};

export default HTTPService;