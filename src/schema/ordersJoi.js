import joi from "joi"


export const ordersJoi = joi.object({

    clientId: joi.number().integer().required(),
    cakeId: joi.number().integer().required(),
    quantity: joi.number().integer().min(0).max(5).required(),
    totalPrice: joi.number().required(),




})