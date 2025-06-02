// https://chatgpt.com/share/683be138-3b2c-8012-b59f-497208f8f75e

// Static Methods
// Belong to the class, not instance.

class MathUtils {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtils.add(2, 3)); // 5


class Person {
  constructor(name) {
    this._name = name;
  }

  getName() {
    return this._name;
  }

  setName(newName) {
    this._name = newName;
  }
}

const nk = new Person("dev");
console.log(nk.getName());
nk.setName("nk");
console.log(nk.getName());


// older

// function User(name){
//     this.name = name
// }

// User.prototype.sayHello = function(){
//     console.log(this.name)
// }

// const user1 = new User("rk");
// user1.sayHello()

// new
class User{
    constructor(name){
        this.name = name;
    }
    sayHello() {
        console.log(this.name)
    }
}

const user2 = new User("rk2")
user2.sayHello()