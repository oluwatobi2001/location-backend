const router = require("express").Router();
const {newLocation, getUserLocation} = require("../Controller/Location")
const { authenticate }  = require("../Middleware/Authentication")

router.post("/new",  authenticate,  newLocation
  );


router.get("/get-location-history", authenticate, getUserLocation);

module.exports = router;
