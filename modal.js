import {setToDoItemsList, ToDo, toDoItemsList} from "./ToDo.js";
import { showList } from "./showList.js";
import { saveListToStorage } from "./localStorageHelpers.js";
import { getDateStringFromDate } from "./dateHelpers.js";

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("addItemButton");

// Get the button elements that closes the modal
let cancelBtn = document.getElementById("cancel-button");
let addBtn = document.getElementById("add-button");
let title = document.getElementById("add-title");
let description = document.getElementById("add-description");
let dueDate = document.getElementById("add-due-date");
let editId = null;

// When the user clicks the button, open the modal 
btn.addEventListener('click', () => {
  openModal();
})

// When the user clicks on Cancel, close the modal
cancelBtn.addEventListener('click', () => {
  closeModal();
})

const validateForm = () => {
  if (!title.value || !dueDate.value) {
    addBtn.setAttribute('disabled', 'true')
  } else {
    addBtn.removeAttribute('disabled')
  }
}

title.addEventListener('input', validateForm)
description.addEventListener('input', validateForm)
dueDate.addEventListener('change', validateForm)

addBtn.addEventListener('click', () => {
    let result;
    
    if (editId) {
      setToDoItemsList(toDoItemsList.map(item => {
        if (item.id === editId) {
          return {
            ...item,
            title: title.value,
            description: description.value,
            dueDate: new Date(dueDate.value),
          };
        } else {
          return item;
        }
      }));
    } else {
      result = new ToDo(title.value, description.value, dueDate.value);
      toDoItemsList.push(result);
    }

    showList(toDoItemsList);
    saveListToStorage(toDoItemsList);

    //clear the form
    title.value = "";
    description.value = "";
    dueDate.value = "";
    addBtn.setAttribute('disabled', 'true')

    //close modal
    closeModal();
});

const openModal = (toDoItem) => {
  if (toDoItem) {
    editId = toDoItem.id;
    title.value = toDoItem.title;
    description.value = toDoItem.description;
    dueDate.value = getDateStringFromDate(toDoItem.dueDate);
    addBtn.innerHTML = 'Save';
  }
  modal.style.display = "block";
}

const closeModal = () => {
  editId = null;
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    closeModal();
  }
})

//Set min attribute for input date, the current date value
const setMinLimitInputDate = () => {
  const today = getDateStringFromDate(new Date());
  document.getElementById("add-due-date").setAttribute("min", today);
}

setMinLimitInputDate();

export { openModal };