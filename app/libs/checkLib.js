/*---
Library to check the empty value/data
---*/

// removing whitespace 
let trim = (x) => {
    let value = String(x);
    return value.replace(" ", "");
};

//checking for empty values
let isEmpty = (value) => {
    if (value === null || trim(value) === "" || value === undefined || value.length === 0) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    isEmpty : isEmpty
}