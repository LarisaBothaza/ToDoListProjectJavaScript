const getDateStringFromDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth()+1; //January is 0 so need to add 1 to make it 1!
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    
    if (mm < 10) {
      mm = '0' + mm;
    } 
    
    return `${yyyy}-${mm}-${dd}`;
  }

  export { getDateStringFromDate };