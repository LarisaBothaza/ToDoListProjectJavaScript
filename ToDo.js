import { getListFromStorage } from './localStorageHelpers.js'

class ToDo {
    id;
    title;
    description;
    dateAdded;
    dueDate;
    constructor(title, description, dueDate) {
        const date = new Date();

        this.id = date.getTime();
        this.title = title;
        this.description = description;
        this.dateAdded = date;
        this.dueDate = new Date(dueDate);
    }

}

let toDoItemsList = getListFromStorage();

const setToDoItemsList = (list) => {
    toDoItemsList = list;
}

export {toDoItemsList, setToDoItemsList, ToDo}