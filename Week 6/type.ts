class Phone {
  brand: string;
  battery: number;

  constructor(brand: string, battery: number) {
    this.brand = brand;
    this.battery = battery;
  }

  usePhone(hours: number) {
    this.battery -= hours * 10;

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







const FruitGroupType: { name: string; Type: "Ripe" | "Unripe" }[] = [
    { name: "Mango",Type : "Ripe" },
    { name: "Apple", Type: "Unripe" },
    { name: "Banana", Type: "Ripe" },
    { name: "Orange", Type: "Unripe" }
];

let ripeFruits: string = [];
let unripeFruits: string= [];
  
for (let a = 0; a < FruitGroupType.length; a++) {
  const fruit = FruitGroupType[a];
  if (fruit.Type === "Ripe") {
    ripeFruits.push(fruit.name);
  } else {
    unripeFruits.push(fruit.name);
  }
}
console.log("Unripe(" + unripeFruits.length + "): " + unripeFruits.join(", "));
console.log("ripeFruit(" + ripeFruits.length + "): " + ripeFruits.join(", "));
