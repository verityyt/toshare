console.log("Opened page")

let username = document.getElementById("tf-username") as HTMLInputElement
let password = document.getElementById("tf-password") as HTMLInputElement
let register = document.getElementById("button") as HTMLInputElement

register.addEventListener("click", () => {
    let error = document.getElementById("error") as HTMLParagraphElement

    if(username.value == "" || password.value == "") {
        error.textContent = "Invalid username or password!"
    }else {
        error.textContent = ""
    }
})