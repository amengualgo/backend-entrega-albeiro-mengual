const Product = require('./product')
const fs = require('fs');

class ProductManager{
    //#region constructor
    constructor(path) {
        this.products = [];
        this.id = 0;
        this.path = path;
    }
    //#endregion

    //#region methods
    addProduct = async (product)  => {
        try{
            let p = new Product(product.title, product.description, product.price, product.thumbnail,
                product.code, product.stock, product.category);
            if(p.validate().status){
                await this.getJSONFromFile(this.path);
                if(!await this.findByCode(p.code)){
                    this.id++
                    this.products.push({id: this.id, product : p});
                    console.log(`Elemento agregado correctamente, Id: ${this.id}`);
                    await this.saveJSONToFile(this.path, this);
                    return {status:true, message:`Elemento creado correctamente id: ${this.id}`};
                }else{
                    console.log(`Producto con código: ${p.code} ya existe`);
                    return {status:false, errors:`Producto con código: ${p.code} ya existe`};
                }
            }else {
                const _errors = p.validate().errors;
                console.log(`Todos los campos son obligatorios: ${JSON.stringify(_errors)}`);
                return {status:false, errors:_errors};
            }

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
        const itemFound = this.products.find((element) => element.id == id );
        if (itemFound){
            return itemFound
        }else
        {
            console.log(`Elemento con id: ${id} no encontrado`);
            return false;
        }
    }
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
    getJSONFromFile = async (path) => {
        try {
            await fs.promises.access(path, );
        } catch (error) {
            return this;
        }
        const content = await fs.promises.readFile(path, 'utf-8');
        try {
            const jsonData = JSON.parse(content);
            this.id = jsonData.id;
            this.products = jsonData.products;
            return this.products;
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

module.exports = ProductManager;