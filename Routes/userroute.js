const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require('passport')
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controller/user");


router
    .route("/signup")
    //render signup page
    .get(wrapAsync(userController.rendersignUp))
    //signup logic
    .post(wrapAsync(userController.signUp))

router
    .route("/login")
    //render login page
    .get((userController.renderloginPage))
    //login logic
    .post(saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: '/login',
        failureFlash: true
    }

    ), (userController.login))


router.get("/logout", (userController.logout));


module.exports = router;