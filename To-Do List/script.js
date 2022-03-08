const listContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')


const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))||[]
let selectedListID = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY)

listContainer.addEventListener('click', e=>{
    if (e.target.tagName.toLowerCase() === 'li'){
        selectedListID = e.target.dataset.listId
        saveAndRender()
    }
})

deleteListButton.addEventListener('click', e=>{
    lists = lists.filter(list => list.id !== selectedListID)
    selectedListID = null
    saveAndRender()
})

newListForm.addEventListener('submit', e=>{
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
})

function createList(name){
    return {id: Date.now().toString(), name: name, tasks : []}
}

function saveAndRender(){
    save()
    render()
}

function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, selectedListID)

}

function render(){
    clearElement(listContainer)
    lists.forEach(list =>{
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add("list-name")
        listElement.innerText = list.name
        if (list.id === selectedListID) {
            listElement.classList.add('active-list')
        } 
        listContainer.appendChild(listElement)
    })
}

function clearElement(element){
    while (element.firstChild){
        element.removeChild(element.firstChild)
    }
}

render()