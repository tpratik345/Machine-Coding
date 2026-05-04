// implement how the deep clone actually works internally

function deepCloneObj(obj, seen = new WeakMap()) {
    // handling premitive data types
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }

    // handle for circular object / array
    if (seen.has(obj)) {
        return seen.get(obj)
    }

    // handle for date
    if (obj instanceof Date) {
        return new Date(obj.getTime())
    }

    // handle for regular expression
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags)
    }

    // handle for array
    if (Array.isArray(obj)) {
        let clonedArr = [];
        seen.set(obj, clonedArr);

        for (let i = 0; i < obj.length; i++) {
            clonedArr[i] = deepCloneObj(obj[i], seen);
        }

        return clonedArr;
    }

    // handle object
    let clonedObj = {}
    seen.set(obj, clonedObj);

    for (let key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key))
        clonedObj[key] = deepCloneObj(obj[key], seen)
    }

    return clonedObj;
}

const original = {
    name: "Pratik",
    age: 27,
    hobbies: ["badminton", "gaming"],
    createdAt: new Date(),
    pattern: /hello/gi
};

// Circular reference
original.self = original;

const copy = deepCloneObj(original);

console.log(copy);
console.log(copy !== original); // true
console.log(copy.hobbies !== original.hobbies); // true
console.log(copy.createdAt instanceof Date); // true
console.log(copy.pattern instanceof RegExp); // true
console.log(copy.self === copy); // true