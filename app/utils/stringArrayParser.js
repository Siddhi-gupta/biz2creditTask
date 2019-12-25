
/*----
Split the data converted to string fron buffer and then
parse it to JSON format
------*/


let getParsedJsonarray = (stringData) => {
    let stringArray = stringData.split("\n");
    let parsedArray = [];
    for (stringObj of stringArray) {
        parsedArray.push(JSON.parse(stringObj));
    }
    return parsedArray;
};

module.exports = {
    getParsedJsonarray: getParsedJsonarray  
}