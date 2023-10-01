import {Product} from  "./product.js"

export class ProductManager{
    //#region constructor
    constructor() {
        this.products = [];
        this.id = 0;
    }
    //#endregion

    //#region methods
    addProduct = (p = new Product()) => {
        try{
            if(p.validate().status){
                if(!this.findByCode(p.code)){
                    this.id++
                    this.products.push({id: this.id, product : p});
                    console.log(`Elemento agregado correctamente, Id: ${this.id}`);
                    return this.id;
                }else{
                    console.log(`Producto con código: ${p.code} ya existe`);
                    return false;
                }
            }else {
                console.log(`Todos los campos son obligatorios: ${p.validate().errors}`);
                return false;
            }

        }catch (e) {
            console.log(`Ocurrió un error en la operación: ${e}`);
        }
    }

    findByCode =(code)=>{
        return this.products.find((element) => element.product.code == code ) ? true :  false;
    }

    findById =(id)=>{
        const itemFound = this.products.find((element) => element.id == id );
        if (itemFound){
            return itemFound
        }else
        {

            throw(`Elemento con id: ${id} no encontrado`)
        }
    }
    getProducts = () =>{
        console.log(this.products);
        return this.products;
    }
    //#endregion
}