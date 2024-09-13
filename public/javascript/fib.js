// var fibonacci = function (n) {
//     return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
// };

var fibonacci = function ( ) {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();
for (var i = 0; i <= 100; i += 1) {
    document.writeln('// ' + i + ': ' + fibonacci(i));
}

var memoize = function(fn){

}
var fibonacci = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
var memoizedFib = memoize(fibonacci);
