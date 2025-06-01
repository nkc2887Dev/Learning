// Abstraction means hiding the implementation details and only showing the essential features.
// In JavaScript, there is no built-in abstract keyword like Java, 
// but we can simulate abstraction using base classes and method overriding.

class Vehicle {
  startEngine() {
    throw new Error("startEngine() must be implemented");
  }
}

class Car extends Vehicle {
  startEngine() {
    console.log("Car engine started");
  }
}

class Bike extends Vehicle {
  startEngine() {
    console.log("Bike engine started");
  }
}

const car = new Car();
car.startEngine(); // Car engine started

const bike = new Bike();
bike.startEngine(); // Bike engine started
