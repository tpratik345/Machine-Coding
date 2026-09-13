let obj = {
    name: 'Pratik',
    greet: function(lastName) {
        console.log('Hi ', this.name, lastName);
        return;
    }
}

obj.greet('Tarkasband')
let temp = obj.greet;
temp('Tarkasband')
temp.call(obj, 'Tarkasband');

Function.prototype.myCall = function(ctx={}, ...args) {
    if(typeof this !== 'function') {
        throw new Error(this, 'is not callable');
    }
    
    ctx.fn = this;
    ctx.fn(...args)
}

temp.myCall(obj, 'Tarkasband New');

