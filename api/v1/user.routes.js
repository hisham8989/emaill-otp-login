const express = require("express");
const UserController = require("../../controllers/userController");
const { validate } = require("express-validation");
const { createUser } = require("../../validations/auth.validation");
const router = express.Router();

const Controller = new UserController();

router.post("/create", validate(createUser, {}, {}), Controller.createUser);

module.exports = router;
