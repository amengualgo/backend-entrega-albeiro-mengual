const {v4: uuidv4} = require("uuid");

class Cart{
    constructor() {
        this.id = uuidv4();
        this.products = [];
    }
}

module.exports = Cart;