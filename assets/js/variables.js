let productsRef = [
  {
    id: cuid(),
    name: "First Product",
    unitPrice: 15,
    count: 50,
  },
  {
    id: cuid(),
    name: "Second Product",
    unitPrice: 12,
    count: 5,
  },
  {
    id: cuid(),
    name: "Third Product",
    unitPrice: 6,
    count: 10,
  },
];
let salesRef = [];
const products = new rxjs.BehaviorSubject(productsRef);
const sales = new rxjs.BehaviorSubject(salesRef);

// Search Term Observable
const search = rxjs.fromEvent(searchElement, "input");
