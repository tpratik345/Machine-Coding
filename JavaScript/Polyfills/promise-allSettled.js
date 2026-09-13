const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("promise1 resolved"), 3000);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => reject("promise2 rejected"), 1000);
});
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("promise3 resolved"), 2000);
});

Promise.allSettled([promise1, promise2, promise3])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

Promise.allSettledPolyfill = function (promises) {
    return new Promise((resolve, reject) => {
        let result = [];

        if (!promises.length) {
            resolve(result);
            return;
        }

        let pending = promises.length;

        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(
                (res) => {
                    result[index] = res;
                    pending--;

                    if (pending === 0) {
                        resolve(result);
                    }
                },
                (reason) => {
                    result[index] = {
                        status: 'rejected',
                        reason
                    }

                    pending--;

                    if(pending===0) {
                        resolve(result)
                    }
                },
            );
        });
    });
};

Promise.allSettledPolyfill([promise1, promise2, promise3])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
