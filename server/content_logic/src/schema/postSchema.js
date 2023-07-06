const joi = require('joi');

//schema for a new post

const newPostSchema = joi.object({
    title: joi.string()
        .min(3)
        .required(),
    content: joi.string()
        .required(),
        tags: joi.array().items([joi.string()]) 
})

request body with optional fields to allow partial updates
const updatePostSchema = joi.object({
    title: joi.string()
        .min(3),
    content: joi.string(),
    tags: joi.array().items([joi.string()])
})

module.exports = {
    newPostSchema,
    updatePostSchema
}