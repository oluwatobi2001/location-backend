const {createNewColumn, checkRecordsExists, insertRecord, updateRecord} = require('../utils/sqlSchemaFunction')
const userSchema = require("../Schema/User");

const UserDetails = async(req, res) => {
    const userId = req.params.id;

    if(!userId)  {
        res.status(400).json("Unsuccessful, please login again")
    } 
    try {
        const userInfo =  await checkRecordsExists(`users`, `user_id`, userId);
        res.status(200).json(userInfo);
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}

const deleteUser = async(req, res)=> {
const userId = req.params.id;
if(!userId)  {
    res.status(400).json("Unsuccessful, please login again")
}
}

const updatePassword = async(req, res) => {
    const userId = req.user.id;

    if(!userId) {
        res.status(400).json("Please try aagin later")
    }
    try {
        const updateRes = await updateRecord(`users`, `id`, userId);
        console.log(updateRes);
        res.status(200).json(updateRes)

    } catch(err) {
        res.status(400).json(err.message)
    }
}
module.exports  =  {updatePassword, UserDetails, deleteUser}