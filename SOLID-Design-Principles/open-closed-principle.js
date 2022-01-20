let Color = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue'
});

let Size = Object.freeze({
  small: 'small',
  medium: 'medium',
  larger: 'larger'
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

// open of extension, close for modification

class ProductFilter {
  filterByColor(products, color) {
    return products.filter(p => p.color === color);
  }

  // add filterBySize ???

  // state space explosion
  // 3 criteria = 7 methods
}

// specifications
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

/**
 * @param {Object[]}
 */
class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every(x => x.isSatisfied(item));
  }
}

let apple = new Product('apple', Color.green, Size.small);
let tree = new Product('tree', Color.green, Size.larger);
let house = new Product('house', Color.blue, Size.larger);

let products = [apple, tree, house];

let pf = new ProductFilter();
console.log('Green Product (old): ');
for (let p of pf.filterByColor(products, Color.green)) {
  console.log(` * ${p.name} is green`);
}

class BetterFilter {
  filter(items, spec) {
    return items.filter(x => spec.isSatisfied(x));
  }
}

let bf = new BetterFilter();

console.log('Green Product (new): ');
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(` * ${p.name} is green`);
}

console.log(`Larger and green products: `);
const spec = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.larger)
);

for (const n of bf.filter(products, spec)) {
  console.log(` * ${n.name} is larger and green`);
}
