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
temp.apply(obj, ['Tarkasband']);

Function.prototype.myApply = function(ctx={}, args) {
    if(typeof this !== 'function') {
        throw new Error(this, 'is not callable');
    }

    if(!Array.isArray(args)) {
        throw new TypeError('Error')
    }
    
    ctx.fn = this;
    ctx.fn(...args)
}

temp.myApply(obj, ['Tarkasband New']);

