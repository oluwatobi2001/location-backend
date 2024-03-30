

const express = require("express")
const  {login, register} = require('../Controller/Authentication')

const router = require("express").Router();


router.post("/register",  register);

router.post("/login",  login);


module.exports = router;