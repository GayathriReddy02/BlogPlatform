const express = require("express");

const authController = require("../controllers/auth.controller");

const { validateRegister,validateLogin } = require("../validators/auth.validator");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

router.post(
    "/register",
    validateRegister,
    authController.register
);

router.post(
    "/login",
    validateLogin,
    authController.login
);


router.get(
    "/me",
    authenticate,
    authController.getMe
);


router.get(
    "/author",
    authenticate,
    authorize("author"),
    authController.authorAccess
);

module.exports = router;