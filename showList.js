import { ToDo, toDoItemsList, setToDoItemsList } from "./ToDo.js";
import { saveListToStorage } from "./localStorageHelpers.js";
import { openModal } from "./modal.js";

const sortList = (list) => {
    return list.sort((a, b) => {
        return a.dueDate.getTime() - b.dueDate.getTime();
    });
}

const showList = (list) => {
    let toDoList = document.getElementById("toDoList");

    toDoList.innerHTML = "";

    sortList(list).forEach(element => {
        const newLi = createListItem(element);
        toDoList.appendChild(newLi);
        
    });

}

const removeItemFromList = (id) => {
    setToDoItemsList(toDoItemsList.filter(item => item.id !== id));
    showList(toDoItemsList);
    saveListToStorage(toDoItemsList);
}

const createListItem = (element) => {
    const newLi = document.createElement("li"); 
    newLi.className = "box-item";
    const newDivTitle = document.createElement("div"); 
    newDivTitle.className = "box-title";
    const newDivDescription = document.createElement("div"); 
    newDivDescription.className = "box-description";
    const textContainer = document.createElement("div"); 
    const dateContainer = document.createElement("div");
    textContainer.className = "text-container";
    dateContainer.className = "date-container";
    const newDivDateAdded = document.createElement("div"); 
    newDivDateAdded.className = "box-date-added";
    const newDivDueDate = document.createElement("div"); 
    newDivDueDate.className = "box-due-date";
    const spanX = document.createElement("span"); 
    spanX.className = "close";
    spanX.innerHTML = '&times';
    const spanEdit = document.createElement("span"); 
    spanEdit.className = "edit";
    spanEdit.innerHTML = '&#x270f;';
    const iconContainer = document.createElement("div"); 
    iconContainer.className = "icon-container";
    spanX.addEventListener('click', () => {
        var result = confirm("Want to delete?");
        if (result) {
            removeItemFromList(element.id);
        }
    });
    spanEdit.addEventListener('click', () => {
        openModal(element);
    });
    newDivTitle.innerHTML = element.title;
    newDivDescription.innerHTML = element.description;
    newDivDateAdded.innerHTML = element.dateAdded.toLocaleString();
    newDivDueDate.innerHTML = "DUE DATE: " + element.dueDate.toLocaleDateString();
    textContainer.appendChild(newDivTitle);
    textContainer.appendChild(newDivDescription);

    dateContainer.appendChild(newDivDateAdded);
    dateContainer.appendChild(newDivDueDate);

    iconContainer.appendChild(spanX);
    iconContainer.appendChild(spanEdit);
    
    newLi.appendChild(textContainer);
    newLi.appendChild(dateContainer);
    newLi.appendChild(iconContainer);
   

    return newLi;
}

showList(toDoItemsList)

export {showList}