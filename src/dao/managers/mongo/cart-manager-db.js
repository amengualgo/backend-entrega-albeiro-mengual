const Cart = require('../../../classes/cart')
const fs = require('fs');
const ProductManagerDB = require("./product-manager-db");
const productManagerDB = new ProductManagerDB();

const cartModel = require("../../models/cart.model");


class CartManagerDB{
    //#region constructor
    constructor() {
        this.carts = [];
    }
    //#endregion

    //#region methods
    createCart = async ()  => {
        try{
            let _cart = new Cart();
            const  response = await cartModel.create(_cart);
            console.log(`Elemento agregado correctamente, Id: ${response.id}`);
            return {status:true, message:'Elemento creado correctamente',id : response.id};
        }catch (e) {
            throw(`Ocurrió un error en la operación: ${e}`);
        }
    }

    findById = async (id)=>{
        const itemFound = await cartModel.findById({_id: id});
        if (itemFound){
            return itemFound;
        }else
        {
            console.log(`Elemento con id: ${id} no encontrado`);
            return false;
        }
    }
    addProductInCart = async (cid, pid, quantity) =>{
        const _carts = cid ? await this.findById(cid) : undefined;
        if(_carts){
            const _product = await  productManagerDB.findById(pid);
            if(_product){
                const idx = _carts.products.findIndex(value => (value.product._id.toString()) === (pid));
                if(idx>=0){
                    _carts.products[idx].quantity = parseInt(_carts.products[idx].quantity) + parseInt(quantity);
                    await cartModel.updateOne({id:cid, products:_carts.products});
                    return 200;
                }else{
                    _carts.products.push({product:pid, quantity:parseInt(quantity)});
                    await cartModel.updateOne({id:cid, products:_carts.products});
                    return 201
                }
            }else{
                return 404
            }
        }else{
            return 404
        }

    }

    //#endregion
}

module.exports = CartManagerDB;