class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Calculator {
  constructor(item) {
    this.item = item;
  }

  getDailyDelta() {
    if (this.item.sellIn < 0) {
      return -2;
    }
    return -1;
  }

  calculateNewQuality() {
    if (this.item.quality <= 0) {
      return 0;
    }
    return this.item.quality + this.getDailyDelta();
  }

  calculateNewSellIn() {
    return this.item.sellIn - 1;
  }
}

class Conjured extends Calculator {
  constructor(item) {
    super(item);
  }

  getDailyDelta() {
    return super.getDailyDelta() * 2;
  }
}
Conjured.supports = "Conjured";

class AgedBrie extends Calculator {
  constructor(item) {
    super(item);    
  }

  getDailyDelta() {
    return 1;
  }

  calculateNewQuality() {
    if (this.item.quality >= 50) {
      return 50;
    }
    return super.calculateNewQuality();
  }
}

AgedBrie.supports = "Aged Brie";

class Sulfuras extends Calculator {
  constructor(item) {
    super(item);    
    this.supports = "Sulfuras";
  }

  getDailyDelta() {
    return 0;
  }

  calculateNewSellIn() {
    return this.item.sellIn;
  }
}

Sulfuras.supports = "Sulfuras";

class BackstagePasses extends Calculator {
  constructor(item) {
    super(item);    
  }  

  getDailyDelta() {
    if (this.item.sellIn <= 5) {
      return 3;
    }
    if (this.item.sellIn <= 10) {
      return 2;
    }
    return 1;
  }

  calculateNewQuality() {
    if (this.item.sellIn < 0) {
      return 0;
    }
    return this.item.quality + this.getDailyDelta();
  }
}

BackstagePasses.supports = "Backstage passes";

const classes = [
  AgedBrie, Calculator, Sulfuras, BackstagePasses, Conjured
];

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      let calculator = new Calculator(item);      
      const calcClass = classes.find(c => c.supports === item.name);
      if (calcClass) {
        calculator = new calcClass(item);
      }
      // if (item.name === 'Aged Brie') {
      //   calculator = new AgedBrie(item);
      // } else if (item.name === 'Sulfuras') {
      //   calculator = new Sulfuras(item);
      // } else if (item.name === 'Backstage passes') {
      //   calculator = new BackstagePasses(item);
      // } else if (item.name === "Conjured") {
      //   calculator = new Conjured(item);
      // }
      item.quality = calculator.calculateNewQuality();
      item.sellIn = calculator.calculateNewSellIn();
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
