// compare the two objects are same or not
// without circular dependency

const a = { x: { y: 1, z: {q: 2} } };
const b = { x: { y: 1, z: {q: 2} } };

console.log(deepEqual(a, b));

function deepEqual(obj1, obj2) {
    if(obj1 === obj2) return true;

    if(
        typeof obj1 !== 'object' ||
        typeof obj2 !== 'object' ||
        obj1 === null ||
        obj2 === null
    ) {
        return false;
    }

    let keys1 = Object.keys(obj1)
    let keys2 = Object.keys(obj2)

    if(keys1.length !== keys2.length) {
        return false;
    }

    for(let key of keys1) {
        if(!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}