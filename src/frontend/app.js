const list = document.getElementById("list");
for (const listItem of list.children) {
    const title = listItem.getElementsByClassName("todo-title").item(0);
    const button = listItem.getElementsByClassName("todo-button").item(0);
    button.addEventListener("click", () => {
        if (button.value == "Done") {
            title.classList.add("done");
            button.value = "Remove";
        }
        else if (button.value == "Remove") {
            list.removeChild(listItem);
        }
    });
}
