var Dog = function(config){
    this.name = config.name;
};
Dog.prototype.breed = "Indian";
Dog.prototype.sayHello = function(){
    console.log(this.name + " says " + "woof");
}
var jimmy = new Dog({
    name: "Jimmy"
});


var GermanShephard = function(config){
    this.breed = "German Shephard"
    this.name = config.name;
}
GermanShephard.prototype = new Dog({});

var my_german_dog = new GermanShephard({
    name: "Buttercup"
});