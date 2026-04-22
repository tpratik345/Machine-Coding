// get the subarray fromm the list whose sum is 9 the list is [1,2,3,4,5]

function findSubarrayWithSum(arr, targetSum) {
    let currentSum = 0;
    let start = 0;

    for (let end = 0; end < arr.length; end++) {
        currentSum += arr[end];

        // Shrink the window as long as the current sum exceeds the target
        while (currentSum > targetSum) {
            currentSum -= arr[start];
            start++;
        }

        // Check if the current sum matches the target
        if (currentSum === targetSum) {
            return arr.slice(start, end + 1);
        }
    }

    // If no such subarray is found
    return [];
}

const list = [1, 2, 3, 4, 5];
const target = 9;

const result = findSubarrayWithSum(list, target);
console.log(result); // Output: [2, 3, 4]