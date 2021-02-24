console.log("Opened page")

const url = "https://toshare.inceptioncloud.net"

let username = document.getElementById("tf-username") as HTMLInputElement
let password = document.getElementById("tf-password") as HTMLInputElement
let register = document.getElementById("button") as HTMLInputElement

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
                "Access-Control-Allow-Origin": "https://inceptioncloud.net/toshare/",
                "Access-Control-Allow-Credentials": "true",
                "username": username.value,
                "password": password.value

            },
            body: JSON.stringify({

            })
        }).then(response => response.json()).then(data => {
            window.location.assign(data.redirect)
        })
    }
})