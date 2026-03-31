// check for overlap and if yes then combine the arrays

// const input = [[1, 3], [2, 6], [8, 10], [15, 18]];
const input = [[1, 4], [2, 5], [3, 6]];

function checkOverlap(arr) {

    arr.sort((a, b) => a[0] - b[0]);

    let ans = [];

    let current = [...arr[0]];

    for (let i = 1; i < arr.length; i++) {
        if (current[1] >= arr[i][0]) {
            current[1] = Math.max(current[1], arr[i][1])
        } else {
            ans.push(current);
            current = arr[i];
        }
    }
    ans.push(current);
    console.log(arr)
    return ans;
}

const result = checkOverlap(input);
console.log(result);

