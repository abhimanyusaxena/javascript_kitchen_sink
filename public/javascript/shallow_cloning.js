const sourceObject = {
    a: 1,
    b: {
        c: 2,
        d: 3
    }
} ;

let clonedObject = sourceObject;

clonedObject.a = 2;

console.log(sourceObject);
console.log(clonedObject);