

let arr = [1,2,3,4,5];

// let res = arr.map((v, i, self) => v*2);

Array.prototype.myMap = function(func) {
    let ls = [];
    for(let i=0; i<this.length; i++) {
        ls.push(func(this[i], i, this))
    }
    return ls;
}

let newRes = arr.myMap((v) => v*2);

console.log(newRes)

