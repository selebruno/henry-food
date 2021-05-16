export function sortAsc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) {
            return 1;
        }
        if (b[field]> a[field]) {
            return -1;
        }
        return 0;
    })
 }

//  export function orderByName(payload) {            //accion que me ordena alfabeticamente las recetas
//     let recipes = [...orderedRecipes]

//     recipes.sort((a, b) => {

//         let nameA = a.name.toUpperCase();
//         let nameB = b.name.toUpperCase();

//         if(order === ascending){
//             if (nameA < nameB){
//                 return -1;
//             }
//             if (nameA > nameB){
//                 return 1
//             } 
//             return 0;
//         };

//         if(order === descending){
//             if(nameA < nameB){
//                 return 1;
//             }
//             if (nameA > nameB){
//                 return -1
//             }
//             return 0;
//         };
//     })
//     return function(dispatch){
//         dispatch({
//             type: ORDER_BY_NAME, 
//             payload: recipes})
//     }
// }

 
	
export function sortDesc(arr, field) {
   return arr.sort(function (a, b) {
       if (a[field] > b[field]) {
           return -1;
       }
       if (b[field]> a[field]) {
           return 1;
       }
       return 0;
   })
}

export function filterBy(arr, field) {
    let filteredArr=[]
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].diets.length;j++){
            if(arr[i].diets[j].name.includes(field)){filteredArr.push(arr[i])}
        }
    }
    return filteredArr;
};