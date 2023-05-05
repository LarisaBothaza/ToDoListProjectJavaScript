const getListFromStorage = () => {
    return JSON.parse(localStorage.getItem('toDoList') || '[]').map(item => ({ 
        ...item,
        dateAdded: new Date(item.dateAdded),
        dueDate: new Date(item.dueDate),
     }));
}

const saveListToStorage = (list) => {
    localStorage.setItem('toDoList', JSON.stringify(list));
}

export { getListFromStorage, saveListToStorage };