// Valida si un elemento existe en el array (basado en id de objeto)
export function checkAvailabilityId(arr, id) {
    return arr.some(function(arrVal) {
        return id === arrVal.id;
    });
}

// Obtener elemento de un array (basado en id de objeto)
export function getObjectId(arr,id) {
  var position;

  for(let a of arr){
    if(a.id == id){
      position = arr.indexOf(a);
    }      
  }

  return position  
}

// Crea un nuevo array (basado en id de objeto)
export function getIdArray(arr) {
  var result = [];

  for(let a of arr){
    result.push(a.id);
  }

  return result;
}