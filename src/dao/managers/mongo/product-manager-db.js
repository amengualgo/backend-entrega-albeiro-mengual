const Product = require('../../../classes/product')
const fs = require('fs');
const productModel = require("../../models/product.model");

class ProductManagerDB{
    //#region constructor
    constructor() {

    }
    //#endregion

    //#region methods
    addProduct = async (product)  => {
        try{
            let p = new Product(product.title, product.description, product.price, product.thumbnail,
                product.code, product.stock, product.category);
            if(p.validate().status) {
                if (!await this.findByCode(p.code)) {
                    const _product = await productModel.create(p);
                    console.log(`Elemento agregado correctamente, Id: ${_product.id}`);
                    return {status: true, message: `Elemento creado correctamente id: ${_product.id}`};
                } else {
                    console.log(`Producto con código: ${p.code} ya existe`);
                    return {status: false, errors: `Producto con código: ${p.code} ya existe`};
                }
            }else{
                const _errors = p.validate().errors;
                console.log(`Todos los campos son obligatorios: ${JSON.stringify(_errors)}`);
                return {status:false, errors:_errors};
            }

        }catch (e) {
            throw(`Ocurrió un error en la operación: ${e}`);
        }
    }
    findByCode = async (code)=>{
        return await productModel.findOne({code:code}) ? true :  false;
    }
    findById = async (id)=>{

        const itemFound = await productModel.findById(id);
        if (itemFound){
            return itemFound
        }else
        {
            console.log(`Elemento con id: ${id} no encontrado`);
            return false;
        }
    }
    getProducts = async () =>{
        try{
            return await productModel.find({});
        }catch (e) {
            throw(`Ocurrió un error en la operación: ${e}`);
        }
    }
    updateProduct = async (id, obj)=>{

        let element = await productModel.findById(id);
        const key = Object.keys(obj);
        if (element){
            key.map((k)=>{
                ( k in element) ? element[k] = obj[k] && k != '_id': console.error('NO existe la clave ', k)
            });
            await productModel.updateOne(element);
        }
        return element ? element._doc : {}
    }
    deleteProduct =async(id)=>{
        const _Response = await productModel.findById(id);
        if(_Response){
            await productModel.deleteOne(_Response);
            return true
        }else{
            return false
        }

    }

    //#endregion
}

module.exports = ProductManagerDB;