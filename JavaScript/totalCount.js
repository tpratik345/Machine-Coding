// get the max count element
let a = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple', 'banana', 'banana'];

let count = a.reduce((acc, curr) => {
    if(!acc[curr]) acc[curr] = 0;

    acc[curr] += 1;

    return acc;
}, {})

// { apple: 3, banana: 2, orange: 1 }
console.log(count)

let result = Object.keys(count).reduce((max, curr) => {
    return count[curr] > count[max] ? curr : max;
});

console.log(result); // apple