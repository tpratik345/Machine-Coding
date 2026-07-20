let arr = [10, 2, 5, 8, 13, 9, 23];
let target = 15;
// o/p: [2,4]
// from position (which is index + 1) which is longest subarray in the provided array whose sum is 15

// let largest = [];

function subArray(arr, ind=0, sum=0, ans=[], maxLength = 0) {
    if(ind === arr.length) {
        if(sum!==target) return ans;
    }
    if(sum===target) {
        console.log(ans)
        Math.max(maxLength, ans.length);
        return ans;
    }

    for(let i=ind; i<arr.length; i++) {
        ans.push(arr[i]);
        subArray(arr, i+1, sum+arr[i], ans, maxLength);
        ans.pop();
    }

    return ans;
}


console.log(subArray(arr));

