import {ProductManager} from "./product-manager.js";
import {Product} from "./product.js";

let productManager = new ProductManager('./products.json');
console.log(await productManager.getProducts());
let p = new Product('producto de prueba', 'Este es un producto prueba',  200, 'sin imagen', 'abc123', '52');
console.log(await productManager.addProduct(p));
console.log(await productManager.getProducts());
console.log(await productManager.findById(1));
await productManager.updateProduct(1,{'description':'Nueva descripcion'});
console.log(await productManager.findById(1));
//await productManager.deleteProduct(1);
console.log(await productManager.findById(1));






