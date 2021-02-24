console.log("Opened page")

const url = "https://toshare.inceptioncloud.net"

let username = document.getElementById("tf-username") as HTMLInputElement
let password = document.getElementById("tf-password") as HTMLInputElement
let register = document.getElementById("button") as HTMLInputElement

if(new URLSearchParams(window.location.search).get("test") == "true") {
    console.log("Fetching...")

    window.fetch(`${url}/callback`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            "Access-Control-Allow-Origin": "https://inceptioncloud.net/toshare/",
            "Access-Control-Allow-Credentials": "true"
        }
    }).then(res => { }).catch(error => {
        console.log(error)
    })

}

register.addEventListener("click", () => {
    let error = document.getElementById("error") as HTMLParagraphElement

    if(username.value == "" || password.value == "") {
        error.textContent = "Invalid username or password!"

        console.log("Redirecting...")
        console.log(`${url}/register`)
        window.location.assign(`${url}/register`)
    }else {
        error.textContent = ""
    }
})