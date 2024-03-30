const express = require("express");
const { createNotification, AllNotifications } = require("../Controller/Notification");
const { authenticate } = require("../Middleware/Authentication");


const router = require("express").Router();


router.post("/new-notification", authenticate, createNotification);

  router.get("/get-notification", authenticate, AllNotifications);

router.delete("notification/:userId");


module.exports = router;