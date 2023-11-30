const Message = require('../../../classes/message')
const messageModel = require("../../models/message.model");


class MessageManagerDB{
    //#region constructor
    constructor() {}
    //#endregion

    //#region methods
    addMessage= async (message)  => {
        try{
            const _message = await messageModel.create(message);
        }catch (e) {
            throw(`Ocurrió un error en la operación: ${e}`);
        }
    }


    getMessages= async () =>{
        try{
            return await messageModel.find({});
        }catch (e) {
            throw(`Ocurrió un error en la operación: ${e}`);
        }
    }


    //#endregion
}

module.exports = MessageManagerDB;