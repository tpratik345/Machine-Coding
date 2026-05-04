// infinite curring

function sum(a) {
    return function(b) {
        if(b === undefined) return a;

        return sum(a+b);
    }
}

const result = sum(2)(3)(4)(5)(6)(10)()
console.log(result)