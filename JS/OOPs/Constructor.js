// A constructor is a special method in a class that is automatically called when an object is created from the class. 
// It's used to initialize object properties.

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

const user1 = new User("Alice", 25); // constructor is called
user1.greet(); // Hi, I'm Alice and I'm 25 years old.

// constructor(name, age) is called when you use new User(...)
// this.name and this.age bind the passed values to the new object