// Inheritance allows one class to reuse (inherit) properties and methods from another class.

class Animal{
    constructor(name){
        this.name = name;
    }

    speak(){
        console.log(this.name + " from Animal")
    }
}

class Dog extends Animal{
    speak(){
        console.log(this.name + " from Dog")
    }
}

class Cat extends Animal{
    speak(){
        console.log(this.name + " from Cat")
    }
}

const res0 = new Animal("AN")
const res1 = new Dog("Tommy")
const res2 = new Cat("Micky")

res0.speak()
res1.speak()
res2.speak()

// Dog and Cat inherit from Animal, but override speak() — this is polymorphism, too.

