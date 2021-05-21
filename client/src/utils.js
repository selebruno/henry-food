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
        for(let j=0;j<arr[i].types.length;j++){
            if(arr[i].types[j].title.includes(field)){filteredArr.push(arr[i])}
        }
    }
    return filteredArr;
    };