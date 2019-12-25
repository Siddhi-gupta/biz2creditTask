/*----
sort the given array of objects on the basis of object property 
in either ascending or descending order
------*/

  let getSortedData = (data, prop, isAsc) => {
    return data.sort((a, b) => {
        return (a[prop] < b[prop] ? -1 : 1) * (isAsc ? 1 : -1)
    });
}

module.exports = {
    getSortedData: getSortedData
}