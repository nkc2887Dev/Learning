// Encapsulation hides internal details of a class and exposes only what's necessary.
// Bundling data and methods that operate on the data within a single unit (object).
// It helps hide internal implementation and only expose necessary parts via a public interface.
// In modern JS (ES2022+), you can use # to create truly private fields.

class BankAccount {
  #balance;
  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  deposite(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const res = new BankAccount("Dev", 1000);
res.deposite(5000);
console.log(res.getBalance());
// console.log(res.#balance)

class PremAccount extends BankAccount {
  constructor(owner, balance, perks) {
    super(owner, balance);
    this.perks = perks;
  }
  getDetails() {
    console.log(this.owner, this.perks);
    console.log(`Balance: ${this.getBalance()}`);
  }
}

const res2 = new PremAccount("NK", 500, "Cashback")
console.log(res2.getBalance());
res2.getDetails()