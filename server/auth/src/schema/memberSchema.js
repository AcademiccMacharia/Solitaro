const joi =require ('joi');


const new_Member_Schema=joi.object({
    full_name: joi.string()
            .min(3)
            .required(),
    username:joi.string()
             .required()
             .min(3)
             .max(10),
    dob:joi.date()
            .required(),
    email:joi.string()
            .required(),
    gender: joi.string()
            .required(),
    country: joi.string()
            .required(),
  password: joi.string()
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
                .min(6)
                .max(30)
                .required()
})
//  confirm_password:joi.ref('Password')            
// }).with('password','confirm_password')

module.exports={new_Member_Schema}