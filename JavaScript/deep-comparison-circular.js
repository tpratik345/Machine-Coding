// compare the two objects are same or not
// with circular dependency

function deepEqual(a, b, visited = new WeakMap()) {
    if(a === b) return true;

    if(
        typeof a !== 'object' ||
        typeof b !== 'object' ||
        a === null ||
        b === null
    ) {
        return false;
    }

    // for circular object
    if(visited.has(a)) return visited.get(a) === b;
    visited.set(a, b);

    // for checking if key is present or not
    let keysA = Object.keys(a);
    let keysB = Object.keys(b);

    if(keysA.length !== keysB.length) return false;

    for(let key of keysA) {
        if(!keysB.includes(key) || !deepEqual(a[key],b[key])) {
            return false;
        }
    }

    return true;
}

const a = { x: { y: 1 } };
a.z = a;
const b = { x: { y: 1 } };
b.z = a;

console.log(deepEqual(a, b));