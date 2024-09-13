// Example of inheritance in JavaScript using prototype

// Parent constructor
function Animal(name) {
    this.name = name;
}

// Parent method
Animal.prototype.sayHello = function() {
    console.log(this.name + " says hello!");
};

// Child constructor
function Dog(name, breed) {
    Animal.call(this, name); // Call parent constructor
    this.breed = breed;
}

// Inherit from Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Child method
Dog.prototype.bark = function() {
    console.log(this.name + " barks!");
};

// Usage
var animal = new Animal("Generic Animal");
animal.sayHello(); // Output: Generic Animal says hello!

var dog = new Dog("Buddy", "Golden Retriever");
dog.sayHello(); // Output: Buddy says hello!
dog.bark(); // Output: Buddy barks!

console.log(dog instanceof Animal); // true
console.log(dog instanceof Dog); // true
e 