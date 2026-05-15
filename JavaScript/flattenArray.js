// With the given nestead array provide the Flatten array

let arr = [1,2,[3,[4,5,[6,[7,8,[9]]]]]];

function flatArray(arr) {
    let result = arr.reduce((acc, cur) => {
        if(Array.isArray(cur)) {
            return [...acc, ...flatArray(cur)]
        } else{
            return [...acc, cur];
        }
    }, [])

    return result;
}

console.log(flatArray(arr));