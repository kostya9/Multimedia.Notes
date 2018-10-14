
const clearObject = (object) => {
    for (var member in object) 
        delete object[member];
}

export default clearObject;
