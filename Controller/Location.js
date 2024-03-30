const {createNewColumn, checkRecordsExists, insertRecord, FetchLocRecord} = require('../utils/sqlSchemaFunction')
const locationSchema = require("../Schema/Location");

const newLocation = async(req, res) => {
    const longitude = req.body.longitude;
    const latitude  = req.body.latitude;
const userID = req.user.userID
    if (!longitude|| !latitude ) {
        res.status(400).json("Invalid location co-ordinates");

    }
    const locationDetails = {
        longitude,
        latitude, userID
    }
    try {
        await createNewColumn(locationSchema);
const addLocation = await insertRecord("location_history_db", locationDetails)
console.log(addLocation);
res.status(200).json("location update successful")
    }
catch(err) {
    res.status(500).json(err.message)
}

}

const getUserLocation = async(req, res) =>{
    const user = req.user.user_id;
    if(!user) {
        res.status(400).json("User credentials invalid")
    }
    try {
  const userLocation = await FetchLocRecord("location_history_db", "users", "longitude", "latitude", "created_at",  user );
    console.log(userLocation);
    res.status(200).json(userLocation);
    }
 catch(err) {
     res.status(500).json(err.message)
 }

}

module.exports = {getUserLocation, newLocation}