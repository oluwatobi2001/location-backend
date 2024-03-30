const bodyParser = require("body-parser");
const { get } = require("mongoose");
const { UserDetails, updatePassword, deleteUser } = require("../Controller/Users");
const { authenticate } = require("../Middleware/Authentication");

const router = require("express").Router();

 


router.get("/:id",authenticate,  UserDetails )
router.delete("/user':id" , updatePassword);
router.put("/update-password", deleteUser);

/*router.post("/password-reset", async(req, res) => {
    const user1 = await User.findOne({email: req.body.email});
    try {

  if(user1) {
 const token = new Token({
     userId: user1._id,
     token: "455778",
 }) ;
 const newTok = await token.save(); const link = `localhost:5000/api/users/password-reset/${user1._id}/${token.token}`
 res.status(200).json(link);
 res.send(link);
  
     
  } 
 
    
       
   
    else {

 res.status(400).send("Thie email isn't registered");
        
     
   

    } } catch (err) {
res.status(550).json(err)
    }
})
router.post("/password-reset/:id/:token", async(req, res) => {



    try {
        const user2 = await User.findById(req.params.id);
        if(!user2) {
          res.status(400).send("Invalid User"); 
        }

 const token2 = await Token.findOne({
     userId: user2._id,
     token: req.params.token
 });
 if (!token2) return res.status(400).send("Invalid or expired token.");
 user2.password = req.body.password;
 await user2.save();
 await token2.delete();
 res.send("password reset succesfully")
    } catch (err) {
        console.log(err);
    }
})
*/


module.exports = router;