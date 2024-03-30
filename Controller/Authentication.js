const jwt  = require("jsonwebtoken")
const userSchema  = require("../Schema/User");

const bcrypt = require("bcrypt");

const {createNewColumn, checkRecordsExists, insertRecord} = require('../utils/sqlSchemaFunction')

const generateAcccessToken = (use) => {
    return jwt.sign({userID : use }, process.env.JWT, {expiresIn: "1d"});


}
const register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        res.status(400).json("please supply the email or Password")
   
   return; }
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt)
const user = {
    username:  req.body.username,
    email: email,
    password: hashedPassword
}
try {
    await createNewColumn(userSchema);

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
                userId : confirmUser.userID,
                email : confirmUser.email,
                access_token: generateAcccessToken(confirmUser.userID) 
            })
        }
} catch(err)  {
    res.status(400).json({err: err.message})
}   

}


module.exports = {login, register};