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


/// get the list of subarrays
function findSubarraysWithSumRecursive(arr, target, start = 0, current = [], result = []) {
    // Base case: if the target becomes 0, store the current subarray
    if (target === 0) {
        result.push([...current]); // Push a copy of the current array
        return;
    }

    // If we've reached the end of the array or target is negative, return
    if (start >= arr.length || target < 0) {
        return;
    }

    // Include the current element
    current.push(arr[start]);
    findSubarraysWithSumRecursive(arr, target - arr[start], start + 1, current, result);

    // Exclude the current element and backtrack
    current.pop();
    findSubarraysWithSumRecursive(arr, target, start + 1, current, result);

    return result;
}

const list = [1, 2, 3, 4, 5];
const target = 9;

const result = findSubarraysWithSumRecursive(list, target);
console.log(result); // Output: [[2, 3, 4], [4, 5]]