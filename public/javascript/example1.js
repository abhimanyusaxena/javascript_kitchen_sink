var penny = {
    name: "Penny",
    breed: "Labreador",
    color: "Brown"
}




var beget = function(source_object){
    var F = function(){};
    F.prototype = source_object;
    return new F();
};

var buttercup = beget(penny);
var buttercup = penny.beget();



Object.prototype.beget = function(){
    var F = function(){};
    F.prototype = this;
    return new F();
}


buttercup.name = "Butter Cup"






var grandfather_object = {
    height: "6ft",
    speaks: "Tamil"
}
var father_object = {
    height: "5-7"
}
father_object.__proto__ = grandfather_object;



var Human = function(config){
        this.height = config.height;
        this.language = config.language;
        return this;
};

Human.prototype.eat = function(food){
    this.last_meal = food;
}

var grand_father = new Human({
    height: "6",
    language: "Tamil"
});

grand_father.eat();


var GenZHuman = function(){
    this.height = "5.6";
}


GenZHuman.prototype = grand_father;

for(var key in grand_father){
    GenZHuman.prototype[key] = grand_father[key];
}



