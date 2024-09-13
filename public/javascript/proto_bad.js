var my_dog = {
    name: "Jimmy",
    breed: "Labrador",
    color: "Black"
};

var my_puppy = {
    name: "Penny",
    color: "Brown"
};

var penny_son = {
    name: "Barfi"
}

//DON"T DO THIS IN CODE
my_puppy.__proto__ = my_dog;
penny_son.__proto__ = my_puppy;
console.log(my_puppy);
console.log(penny_son);


