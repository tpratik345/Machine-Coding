
let arr = [1,2,3,4,5,6];

let res = arr.filter((v) => v%2===0);

Array.prototype.myFilter = function(cb) {
    let ls = [];
    for(let i=0; i<this.length; i++) {
        let value = cb(this[i], i, this);
        if(value) {
            ls.push(this[i]);;
        }
    }
    return ls
}

let newRes = arr.myFilter((v) => v%2===0);

console.log(res);
console.log(newRes);