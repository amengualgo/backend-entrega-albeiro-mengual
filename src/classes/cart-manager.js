const Cart = require('./cart')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class CartManager{
    //#region constructor
    constructor(path) {
        this.carts = [];
        this.path = path;
    }
    //#endregion

    //#region methods
    createCart = async ()  => {
        try{
            let _cart = new Cart();
            await this.getJSONFromFile(this.path);
            this.carts.push(_cart);
            console.log(`Elemento agregado correctamente, Id: ${_cart.id}`);
            await this.saveJSONToFile(this.path, this);
            return {status:true, message:'Elemento creado correctamente',id : _cart.id};
        }catch (e) {
            throw(`Ocurrió un error en la operación: ${e}`);
        }
    }
    findByCode = async (code)=>{
        await this.getJSONFromFile(this.path);
        return this.products.find((element) => element.product.code == code ) ? true :  false;
    }
    findById = async (id)=>{
        await this.getJSONFromFile(this.path);
        const itemFound = this.carts.find((element) => element.id == id );
        if (itemFound){
            return itemFound;
        }else
        {
            console.log(`Elemento con id: ${id} no encontrado`);
            return false;
        }
    }
    /*
    getProducts = async () =>{
        await this.getJSONFromFile(this.path);
        return this.products
    }
    updateProduct = async (id, obj)=>{
        await this.getJSONFromFile(this.path);
        let element = this.products.find(product => product.id === id);
        const key = Object.keys(obj);
        if (element){
        key.map((k)=>{
            ( k in element.product) ? element.product[k] = obj[k] : console.error('NO existe la clave ', k)
        });
        await this.saveJSONToFile(this.path, this);
            }
        return element ? element : {}
    }
    deleteProduct =async(id)=>{
        await this.getJSONFromFile(this.path);
        const _Response = await this.findById(id);
        if(_Response){
            this.products = this.products.filter(value => value.id != id);
            await this.saveJSONToFile(this.path, this);
            return true
        }else{
            return false
        }

    }
    */
    getJSONFromFile = async (path) => {
        try {
            await fs.promises.access(path, );
        } catch (error) {
            return this;
        }
        const content = await fs.promises.readFile(path, 'utf-8');
        try {
            const jsonData = JSON.parse(content);
            this.carts = jsonData.carts;
            return this;
        } catch (error) {
            throw new Error(`El archivo ${path} no tiene un formato JSON válido, por favor borrelo y ejecute el programa de nuevo.`);
        }
    }
    saveJSONToFile = async (path, data) => {
        const content = JSON.stringify(data, null, '\t');
        try {
            await fs.promises.writeFile(path, content, 'utf-8');
        } catch (error) {
            throw new Error(`El archivo ${path} no pudo ser escrito.`);
        }
    }

    //#endregion
}

module.exports = CartManager;