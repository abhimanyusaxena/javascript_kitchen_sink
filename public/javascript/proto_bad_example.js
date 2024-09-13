var my_dog = {
    name: "Jimmy",
    breed: "Labrador",
    color: "Brown"
};

var my_puppy ={
    name: "Penny"
};

var pennys_daughter = {
    name: "James",
    color: "Black"
};

pennys_daughter.__proto__ = my_puppy;;

my_puppy.__proto__ = my_dog;
console.log(my_dog);
console.log(my_puppy);
console.log(pennys_daughter);