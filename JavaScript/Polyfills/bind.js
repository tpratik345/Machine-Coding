let obj = {
    name: 'Pratik',
    greet: function(lastName, symbol) {
        console.log('Hi ', this.name, lastName, symbol);
    }
}

obj.greet('Tarkasband', '!')
let temp = obj.greet;
temp('Tarkasband', '!')
temp.bind(obj, 'Tarkasband')('!');

Function.prototype.myBind = function(ctx={}, ...args) {
    if(typeof this !== 'function') {
        throw new Error(this, 'is not callable');
    }
    
    ctx.fn = this;
    return (...newArgs) => ctx.fn(...args, ...newArgs)
}

temp.myBind(obj, 'Tarkasband New')('!');

