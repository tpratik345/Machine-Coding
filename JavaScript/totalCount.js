let a = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

let result = a.reduce((acc, curr) => {
    if(!acc[curr]) acc[curr] = 0;

    acc[curr] += 1;

    return acc;
}, {})

console.log(result)