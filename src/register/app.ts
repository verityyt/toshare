console.log("Opened page")

const url = "https://toshare.inceptioncloud.net"

let username = document.getElementById("username") as HTMLInputElement
let password = document.getElementById("password") as HTMLInputElement
let register = document.getElementById("register") as HTMLInputElement

register.addEventListener("click", () => {
    let error = document.getElementById("error") as HTMLParagraphElement

    if (username.value == "" || password.value == "") {
        error.textContent = "Invalid username or password!"
    } else {
        error.textContent = ""

        if(username.value.length <= 12) {

        }else {
            error.textContent = "Username must be only 12 characters long"
        }

        window.fetch(`${url}/register`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://inceptioncloud.net/toshare/",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify({
                "username": username.value,
                "password": password.value
            })
        }).then(response => response.json()).then(data => {

            if(data.redirect != null) {
                window.location.assign(data.redirect)
            }else if(data.error != null) {
                error.textContent = data.error
            }

        })
    }
})

if ("serviceWorker" in navigator) {
    // register service worker
    navigator.serviceWorker.register("../service-worker.js");
}