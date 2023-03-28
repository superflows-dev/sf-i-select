const validateName = (name) => {
    if ((name + "").length > 2) {
        return true;
    }
    return false;
};
async function callApi(url, data, authorization) {
    return new Promise((resolve) => {
        const jsonData = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr != null) {
                if (xhr.readyState === 4) {
                    resolve(xhr);
                }
            }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        if (authorization != null) {
            xhr.setRequestHeader('Authorization', 'Basic ' + authorization);
        }
        xhr.send(jsonData);
        return xhr;
    });
}
const exportFunctions = {
    callApi, validateName
};
export default exportFunctions;
//# sourceMappingURL=util.js.map