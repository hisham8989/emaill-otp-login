const express = require("express");
const UserController = require("../../controllers/userController");
const router = express.Router();

const Controller = new UserController();

router.post("/create", Controller.createUser);

module.exports = router;
