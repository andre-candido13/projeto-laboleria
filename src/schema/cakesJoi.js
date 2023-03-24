import joi from "joi"



export const cakesJoi = joi.object({

name: joi.string().min(2).empty().required(),
price: joi.number().positive().required(),
image: joi.string().empty().required().uri(),
description: joi.string().empty().required()

})
