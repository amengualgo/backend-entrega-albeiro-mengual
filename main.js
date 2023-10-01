import {ProductManager} from "./product-manager.js";
import {Product} from "./product.js";

let productManager = new ProductManager();
productManager.getProducts();
let p = new Product('123', 'producto de prueba',  100, 'sin imagen', 's123abc', '1');
console.log(p);

productManager.addProduct(p);

productManager.addProduct(p);

p = new Product('098', 'producto de prueba 2',  100, 'sin imagen', '098rbc', '1');

productManager.addProduct(p);

let _found = productManager.findById(1);

 _found = productManager.findById(2);

productManager.getProducts();

 _found = productManager.findById(3);


