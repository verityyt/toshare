const list = document.getElementById("list") as HTMLUListElement
const error = document.getElementById("error") as HTMLParagraphElement
const addBtn = document.getElementById("add-button") as HTMLInputElement
const lgBtn = document.getElementById("logout-button") as HTMLInputElement

const usrn = document.getElementById("username") as HTMLParagraphElement

const url2 = "https://toshare.inceptioncloud.net"

fetch(`${url2}/profile`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
        "Access-Control-Allow-Origin": "https://inceptioncloud.net/toshare/",
        "Access-Control-Allow-Credentials": "true"
    }
}).then(response => response.json()).then(data => {

    if (data.redirect != null) {
        window.location.assign(data.redirect)
    } else {
        const username = data.username

        if(username != null) {
            usrn.textContent = username
        }else {
            error.textContent = data
        }
    }

})

fetch(`${url2}/read`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
        "Access-Control-Allow-Origin": "https://inceptioncloud.net/toshare/",
        "Access-Control-Allow-Credentials": "true"
    }
}).then(response => response.json()).then(data => {
    if (data.redirect != null) {
        window.location.assign(data.redirect)
    } else {
        for (const todo of data) {
            const item = document.createElement("li")
            item.id = todo._id

            const paragraph = document.createElement("p")
            paragraph.classList.add("todo-title")
            paragraph.textContent = todo.todo

            const button = document.createElement("input")
            button.classList.add("todo-button")
            button.type = "button"
            if (todo.status == "open") {
                button.value = "Done"
            } else if (todo.status == "done") {
                button.value = "Remove"
                paragraph.classList.add("done")
            }

            item.appendChild(paragraph)
            item.appendChild(button)

            list.appendChild(item)
        }

        for (const listItem of list.children) {
            const title = listItem.getElementsByClassName("todo-title").item(0) as HTMLParagraphElement
            const button = listItem.getElementsByClassName("todo-button").item(0) as HTMLInputElement

            button.addEventListener("click", () => {

                if (button.value == "Done") {
                    title.classList.add("done")
                    button.value = "Remove"

                    fetch(`${url2}/done`, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "https://inceptioncloud.net/toshare/",
                            "Access-Control-Allow-Credentials": "true",
                        },
                        body: JSON.stringify({
                            id: listItem.id
                        })
                    }).then(response => response.json()).then(data => {
                    })

                } else if (button.value == "Remove") {
                    list.removeChild(listItem)

                    fetch(`${url2}/remove`, {
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
                            id: listItem.id
                        })
                    }).then(response => response.json()).then(data => {
                    })

                }

            })
        }
    }
})


addBtn.addEventListener("click", () => {

    const addTextField = document.getElementById("add-textfield") as HTMLInputElement

    if (addTextField.value != "") {
        if(addTextField.value.length <= 16) {
            error.textContent = ""

            fetch(`${url2}/add`, {
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
                    "todo": `${addTextField.value}`
                })
            }).then(response => response.json()).then(data => {

                if (data.redirect != null) {
                    window.location.assign(data.redirect)
                } else {
                    window.location.reload()
                }

            })
        }else {
            error.textContent = "Todo name must only be 16 characters long!"
        }
    } else {
        error.textContent = "Please give your new todo a name!"
    }

})

lgBtn.addEventListener("click", () => {

    fetch(`${url2}/logout`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://inceptioncloud.net/toshare/",
            "Access-Control-Allow-Credentials": "true"
        }
    }).then(response => response.json()).then(data => {

        if (data.redirect != null) {
            window.location.assign(data.redirect)
        } else {
            window.location.reload()
        }

    })

})