const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("promise1 resolved"), 3000);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => reject("promise2 rejected"), 100);
});
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("promise3 resolved"), 200);
});

Promise.race([promise1, promise2, promise3])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

Promise.racePolyfill = function (promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            return;
        }

        promises.forEach((promise) => {
            Promise.resolve(promise).then(resolve, reject);
        });
    });
};

Promise.racePolyfill([promise1, promise2, promise3])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
