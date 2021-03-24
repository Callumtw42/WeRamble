//set this to false if you want to use remote server
const LOCAL = true;
//if your using local server, set this to your computer's ip address
const ip = "172.29.32.1";

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
        })
}