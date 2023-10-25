class Product {

    //#region constructor
    constructor(title, description, price, thumbnail, code, stock, category ) {
        this.title = title ? title : "";
        this.description = description ? description : "";
        this.price = price ? price : 0;
        this.thumbnail = thumbnail ? thumbnail : "";
        this.code = code ? code : "";
        this.stock = stock ? stock : 0;
        this.status = true;
        this.category = category ? category : "";
    }
    //#endregion
    //#region methods

    validate = () => {
        try{
            let errors = [];
            if(!this.title.toString().trim() != ""){
                errors.push({title:"Error, campo requerido"});
            }
            if(!this.description.toString().trim() != ""){
                errors.push({description:"Error, campo requerido"});
            }
            if(!this.price.toString().trim() != ""){
                errors.push({price:"Error, campo requerido"});
            }
            if(!Number.parseFloat(this.price)){
                errors.push({price:"Error, escriba un número"});
            }
            if(!this.thumbnail.toString().trim() != ""){
                errors.push({thumbnail:"Error, campo requerido"});
            }
            if(!this.code.toString().trim() != ""){
                errors.push({code:"Error, campo requerido"});
            }
            if(!this.stock.toString().trim() != ""){
                errors.push({stock:"Error, campo requerido"});
            }
            if(!Number.parseFloat(this.stock)){
                errors.push({price:"Error, escriba un número"});
            }

            if(!this.category.toString().trim() != ""){
                errors.push({category:"Error, campo requerido"});
            }

            return { status: errors.length <= 0 , errors : errors  }

        }catch (e) {
            console.log('A ocurrido un error: ', e.message);
            throw(`A ocurrido un error:  ${e.message}`)
        }


    }
    //#endregion
}

module.exports = Product;