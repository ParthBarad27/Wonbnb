const Joi = require("joi");



// Server side validation 
// This help from ajax attack request attaacts from hopstochh
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(), 
        price: Joi.number().required().min(0).messages({
            'number.base': 'Price must be a valid number',
            'number.min': 'Price must be at least 0'
        }),
        image: Joi.object({
            url: Joi.string().allow("", null),
            filename: Joi.string().allow("", null)
        }).required(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
        
    }).required()
});


