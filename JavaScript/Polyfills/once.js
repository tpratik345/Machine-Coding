function greet(name) {
    console.log('Hello', name);
}

function once(func, ctx) {
    let ran;

    return function(...args) {
        if(func) {
            ran = func.apply(ctx, args);
            func = null;
        }
        return ran;
    }
}


const callOnce = once(greet);

callOnce('Pratik');
callOnce('Pratik');
callOnce('Pratik');
callOnce('Pratik');