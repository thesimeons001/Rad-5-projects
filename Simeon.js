class phone{

}
class Phone {
  constructor(brand, battery) {
    this.brand = brand;
    this.battery = battery;
  }

  usePhone(hours) {
    this.battery = 3 * 10;

    if (this.battery < 0) {
      this.battery = 0;
    }
  }

  charge() {
    this.battery = 100;
  }

  status() {
    console.log(`${this.brand} battery: ${this.battery}`);
  }
}

const myPhone = new Phone("Samsung", 100);

myPhone.usePhone(3);
myPhone.status(); // Samsung battery: 70

myPhone.charge();
myPhone.status(); // Samsung battery: 100