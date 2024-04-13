const Joi = require("joi");

const bodySchema = Joi.object({
    webhookUrl: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string()
})

const sendMessageToDiscord = async(data)=>{
    try {
        
    } catch (err) {
        
    }
}

module.exports = {
    bodySchema, sendMessageToDiscord
}