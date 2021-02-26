const list = document.getElementById("list") as HTMLUListElement

const url2 = "https://toshare.inceptioncloud.net"

fetch(`${url2}/read`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
        "Access-Control-Allow-Origin": "https://inceptioncloud.net/toshare/",
        "Access-Control-Allow-Credentials": "true"
    }
}).then(response => response.json()).then(data => {

    if(data.redirect != null) {
        window.location.assign(data.redirect)
    }

})

for (const listItem of list.children) {
    const title = listItem.getElementsByClassName("todo-title").item(0) as HTMLParagraphElement
    const button = listItem.getElementsByClassName("todo-button").item(0) as HTMLInputElement

    button.addEventListener("click", () => {

        if (button.value == "Done") {
            title.classList.add("done")
            button.value = "Remove"
        } else if (button.value == "Remove") {
            list.removeChild(listItem)
        }

    })

}