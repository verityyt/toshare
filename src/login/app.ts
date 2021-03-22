console.log("Opened page")

const url3 = "https://toshare.inceptioncloud.net"

let username2 = document.getElementById("username") as HTMLInputElement
let password2 = document.getElementById("password") as HTMLInputElement
let login = document.getElementById("login") as HTMLInputElement

login.addEventListener("click", () => {
    let error = document.getElementById("error") as HTMLParagraphElement

    console.log("Logging in...")

    if (username2.value == "" || password2.value == "") {
        error.textContent = "Invalid username or password!"
    } else {
        error.textContent = ""

        console.log("Sending request...")

        window.fetch(`${url3}/login`, {
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
                "username": username2.value,
                "password": password2.value
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