const jwt  = require("jsonwebtoken")
const userSchema  = require("../Schema/User");
const Joi  = require("joi")
const rateLimit  = require("express-rate-limit")
const bcrypt = require("bcrypt");

const {createNewColumn, checkRecordsExists, insertRecord} = require('../utils/sqlSchemaFunction')


const limiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 7

})
const generateAcccessToken = (use) => {
    return jwt.sign({userID : use }, process.env.JWT, {expiresIn: "1d"});


}

const SignUpSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {
        allow: ['com', 'net']
    }}),
    username: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().min(8).required()
})
const loginSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {
        allow: ['com', 'net']
    }}),
   
    password: Joi.string().min(8).required()
})
const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        res.status(400).json("please supply the email or Password")
   
   return; 
}
   const {error, value} = SignUpSchema.validate(req.body, {abortEarly: false});
   if(error) {
       res.status(400).json(error.details)
       return;
   }
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt)
const user = {
    username:  req.body.username,
    email: email,
    password: hashedPassword
}
try {
    const userAlreadyExists = await checkRecordsExists("users", "email", email);
    if(userAlreadyExists) {
        res.status(400).json("email must be unique");

    }
    await insertRecord("users", user)
    res.status(200).json(
        "User created Successfully"
    )
} catch (err) {
res.status(500).json({err: err.message})
}
}


const login = async(req, res)  => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res
          .status(400)
          .json({ error: "Email or Password fields cannot be empty!" });
        return;
      }
      const {error, value} = loginSchema.validate(req.body, {abortEarly: false});
   if(error) {
       res.status(400).json(error.details)
       return;
   }
try {
    const confirmUser = await checkRecordsExists("users", "email", email) ;
        if (!confirmUser) {
            res.status(400).json("Invalid credentials")
        }
        if(!confirmUser.password){
            res.status(400).json("Invalid credentials")
        }
        const passwordMatch = await bcrypt.compare(
            password, confirmUser.password
        )
        if (passwordMatch) {
            res.status(200).json({
                userId : confirmUser.user_id,
                email : confirmUser.email,
                access_token: generateAcccessToken(confirmUser.user_id) 
            })
        }
} catch(err)  {
    res.status(400).json({err: err.message})
}   

}


module.exports = {login, register};