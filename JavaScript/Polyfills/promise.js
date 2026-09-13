
// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('resolved'), 1000);
// })

// async function getData() {
//     const res = await promise;
//     console.log(res);
// }

// getData();

function PromisePolyfill(executor) {
    let onResolve, onReject, value, isFullfilled = false, isCalled = false, isRejected = true;

    function resolve(val) {
        isFullfilled = true;
        value = val;
        if(onResolve) {
            onResolve(val);
            isCalled = true;
        } 
    }

    function reject(val) {
        isRejected = true;
        value = val;
        if(onReject) {
            onReject(val);
            isCalled = true;
        } 
    }


    this.then = function(cb) {
        onResolve = cb;

        if(isFullfilled && !isCalled) {
            isCalled = true;
            onResolve(value);
        }

        return this;
    }

    this.catch = function(cb) {
        onReject = cb;

        if(isRejected && !isCalled) {
            isCalled = true;
            onReject(value);
        }

        return this;
    }

    executor(resolve, reject);
}

const promise = new PromisePolyfill((resolve, reject) => {
    setTimeout(() => {
        resolve('Resolved')
    }, 1000);
})

promise
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })