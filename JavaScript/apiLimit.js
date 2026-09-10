// write a func that takes an array of URL string and maximum concurrency limit
// It should fetch all the urls concurrently but insure that at no point there are
// more than limit active network request running simultaniously.
const dummyApiUrls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/todos/3",
    "https://jsonplaceholder.typicode.com/posts/4",
    "https://jsonplaceholder.typicode.com/posts/5",
    "https://jsonplaceholder.typicode.com/users/6",
    "https://jsonplaceholder.typicode.com/users/7",
    "https://jsonplaceholder.typicode.com/comments/8",
    "https://jsonplaceholder.typicode.com/comments/9",
];

function fetchWithConcurrency(urls, limit) {
    async function callApi(i=0) {
        if(i>=urls.length) return;

        let newArr = urls.slice(i, i+limit);
        const res = await Promise.all(
            newArr.map((url) => fetch(url))
        )
        console.log('------------------', i)
        console.log(res);
        console.log('------------------', i)

        await callApi(i+limit);
    }
    return callApi();
}
fetchWithConcurrency(dummyApiUrls, 3);
