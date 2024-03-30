const {createNewColumn, checkRecordsExists, insertRecord, FetchNotifRecord} = require('../utils/sqlSchemaFunction')
const notifSchema = require("../Schema/Notification");


const createNotification = async(req, res) => {

    const userId  = req.user.userID;

    if(!userId) {
        res.status(400).json("Error: Please try again later");

    }
    const NewNotif = {
        description: req.body.description,
        userID : userId
    }

    try {
        await createNewColumn(notifSchema);
        const addNotification = await insertRecord("user_notification", NewNotif)
console.log(addNotification);
res.status(200).json("New notification")
    

    } catch(err) {
        res.status(400).json(err.message)
    }
}

const AllNotifications = async(req, res) =>{

    const userId  = req.user.user_id ;

    if(!userId) {
        res.status(400).json("Error: Please try again later");

    }
    try {
const NotifRecords =  await FetchNotifRecord("user_notification", `description`,  userId);
res.status(200).json(NotifRecords);
         
    } catch(err) {
        res.status(400).json(err.message)
    }
}

module.exports = {AllNotifications, createNotification}