export function getEditedFields(originalObj, updatedObj) {
    const result = {};
    for (const key in originalObj) {
        if (updatedObj.hasOwnProperty(key) && typeof updatedObj[key] === 'object') {
            const nestedResult = getEditedFields(originalObj[key], updatedObj[key]);
            if (Object.keys(nestedResult).length > 0) {
                result[key] = nestedResult;
            }
        } else if (updatedObj.hasOwnProperty(key) && originalObj[key] !== updatedObj[key]) {
            result[key] = updatedObj[key];
        }
    }
    return result;
}