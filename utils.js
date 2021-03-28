//set this to false if you want to use remote server
const LOCAL = false;
//if your using local server, set this to your computer's ip address
const ip = "100.81.175.8";

const localhost = `http://${ip}:8080`;
const remotehost = "https://werambleserver.azurewebsites.net";
const host = LOCAL ? localhost : remotehost;

module.exports = {
    //Global Variables
    port: "8080",
    host: `${host}`,

    //Useful functions
    quote: (string) => {
        return `'${string}'`
    },
    request: (route, callback) => fetch(route)
        .then(res => res.json())
        .then(data => {
            if (data) {
                callback(data)
            }
        })
        .catch(error => {
            console.error(error)
        }),
    post(url, body, callback) {
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
    get(url, callback) {
        fetch(url)
            .then(res => res.json())
            .then((d) => { callback(d) })
            .catch(error => {
                console.error(error);
            });
    }
}