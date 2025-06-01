// Polymorphism means "many forms". 
// It allows you to call the same method on different objects and get different behaviors.

class Shape {
  draw() {
    console.log("Drawing a shape");
  }
}

class Circle extends Shape {
  draw() {
    console.log("Drawing a circle");
  }
}

class Square extends Shape {
  draw() {
    console.log("Drawing a square");
  }
}

// Polymorphism via same method interface
function renderShape(shape) {
  shape.draw();
}

const shapes = [new Circle(), new Square(), new Shape()];
shapes.forEach(renderShape);

// The same draw() method behaves differently depending on the object instance — this is polymorphism.