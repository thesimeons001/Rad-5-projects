// class phone{

// }
// class Phone {
//   constructor(brand, battery) {
//     this.brand = brand;
//     this.battery = battery;
//   }

//   usePhone(hours) {
//     this.battery = 3 * 10;

//     if (this.battery < 0) {
//       this.battery = 0;
//     }
//   }

//   charge() {
//     this.battery = 100;
//   }

//   status() {
//     console.log(`${this.brand} battery: ${this.battery}`);
//   }
// }

// const myPhone = new Phone("Samsung", 100);

// myPhone.usePhone(3);
// myPhone.status(); // Samsung battery: 70

// myPhone.charge();
// myPhone.status(); // Samsung battery: 100







let FruitGroupType = [
    { name: "Mango",Type : "Ripe" },
    { name: "Apple", Type: "Unripe" },
    { name: "Banana", Type: "Ripe" },
    { name: "Orange", Type: "Unripe" }
];

FruitGroupType.join(", ")
 let ripeFruits = []
 let unripeFruits = []
  
 for ( let a = 0;  a < FruitGroupType.length; a++){
  Fruits = FruitGroupType[a];
if(Fruits.Type === "Ripe"){
  ripeFruits.push(Fruits.name)
}
else{
  unripeFruits.push(Fruits.name)
}
 }
 console.log ("Unripe(" + unripeFruits.length + "): " +unripeFruits.join(", "))
console.log("ripeFruit(" + ripeFruits.length + "): "+ripeFruits.join(", "))

