var Dog = function(config){
    this.name = config.name;
    this.sayHello = function(){
        console.log(this.name + " says " + "woof");
    }
};

var jimmy = new Dog({
    name: "Jimmy"
});