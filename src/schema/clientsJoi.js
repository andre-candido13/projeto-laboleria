import joi from "joi"

export const clientsJoi = joi.object({ 

name: joi.string().empty().required(),
address: joi.string().empty().required(),
phone: joi.string().min(10).max(11).required(),

})