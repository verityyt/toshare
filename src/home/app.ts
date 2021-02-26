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
            const todo = listItem.getElementsByClassName("todo-title").item(0) as HTMLParagraphElement

            button.addEventListener("click", () => {

                if (button.value == "Done") {
                    title.classList.add("done")
                    button.value = "Remove"

                    fetch(`${url2}/done`, {
                        method: 'GET',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'include',
                        headers: {
                            "Access-Control-Allow-Origin": "https://inceptioncloud.net/toshare/",
                            "Access-Control-Allow-Credentials": "true",
                            id: listItem.id,
                            todo: todo.textContent as string
                        }
                    }).then(response => response.json()).then(data => {
                        console.log(data)
                    })

                } else if (button.value == "Remove") {
                    list.removeChild(listItem)
                }

            })
        }
    }
})

/*fetch(`${url2}/add`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
        "Access-Control-Allow-Origin": "https://inceptioncloud.net/toshare/",
        "Access-Control-Allow-Credentials": "true",
        "todo": "Help mom"
    }
}).then(response => response.json()).then(data => {

    if(data.redirect != null) {
        window.location.assign(data.redirect)
    }

})*/