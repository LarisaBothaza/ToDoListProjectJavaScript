import { toDoItemsList } from "./ToDo.js";
import { showList } from "./showList.js";

const input = document.getElementById('searchInput');

input.addEventListener('input', () => {
    const value = input.value;

    showList(toDoItemsList.filter(item => item.title.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase())));
});