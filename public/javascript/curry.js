var curry = function(fn, fixedParam){
    var slice = Array.prototype.slice,
    args = slice.apply(arguments),
    that = fn;
    return function ( ) {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
}

var add = function(a, b){
    return a + b;
}

var add1 = curry(add, 1);


var add_all = function(){
    var sum = 0;
    for(var i=0;i<arguments.length;i++){
        sum+=arguments[i];
    }
    return sum;
}

add_all_and_one = curry(add_all, 1);
console.log(add_all(1,2))
console.log(add_all_and_one(1,2))
// console.log(add1(2));