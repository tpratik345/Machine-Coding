const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("promise1 resolved"), 3000);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => reject("promise2 rejected"), 100);
});
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("promise3 resolved"), 200);
});

Promise.any([promise1, promise2, promise3])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

Promise.anyPolyfill = function (promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            reject(new AggregateError([], "All promises were rejected!"));
            return;
        }

        let errors = [];

        let pending = promises.length;

        promises.forEach((promise, i) => {
            Promise.resolve(promise).then(
                (res) => {
                    resolve(res);
                },
                (reason) => {
                    errors[i] = reason;
                    pending--;

                    if (pending === 0) {
                        reject(
                            new AggregateError(
                                errors,
                                "All Promises were rejected!",
                            ),
                        );
                    }
                },
            );
        });
    });
};

Promise.anyPolyfill([promise1, promise2, promise3])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
