let arr = [1, 2, 3, 4, 5, 6, 7];

let res = arr.reduce((acc, cur) => {
    if (cur % 2 == 0) {
        acc.push(cur);
    }
    return acc;
}, []);

Array.prototype.myReduce = function (cb, initialValue) {
    let accumulator;
    let startIndex;

    if(arguments.length >=2) {
        accumulator = arguments[1];
        startIndex = 0;
    } else {
        accumulator = this[0];
        startIndex = 1;
    }

    for(let i=startIndex; i<this.length; i++) {
        accumulator = cb(accumulator, this[i], i, this);
    }

    return accumulator;
};

let newRes = arr.reduce((acc, cur) => {
    if (cur % 2 == 0) {
        acc.push(cur);
    }
    return acc;
}, []);

console.log(res);
console.log(newRes);
