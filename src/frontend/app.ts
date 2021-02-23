const list = document.getElementById("list") as HTMLUListElement

for (const listItem of list.children) {
    for (const child of listItem.children) {
        if(child.classList.contains("todo-title")) {
            console.log(`Test: ${child.textContent}`)
        }
    }
}