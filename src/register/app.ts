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