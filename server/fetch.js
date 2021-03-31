const fetch = require("node-fetch");
module.exports = {
    post: (url, body, callback) => {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/JSON"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(d => callback(d))
            .catch(error => {
                console.error(error);
            });
    },
    get: (url, callback) => {
        fetch(url)
            .then(res => res.json())
            .then((d) => { callback(d) })
            .catch(error => {
                console.error(error);
            });
    }
}