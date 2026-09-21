const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const multer  = require('multer')
const {storage} = require("../cloudconfig")
const upload = multer({storage})

const {isLoggedin,isOwner,validateListing} = require("../middleware")
const ListingController = require("../controller/listing");


router
      .route("/")
      //Get Route
      .get(wrapAsync(ListingController.index))
      //create new
      .post(isLoggedin,
            validateListing,
            upload.single("image"),
            wrapAsync(ListingController.newlisting));
      

//Render new Page
router.get("/new", isLoggedin,(ListingController.rendernewpage));

//Render edit page
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(ListingController.rendereditpage));

router
      .route("/:id")
       //Show route
      .get(wrapAsync(ListingController.show))
      //Update Route
      .put(isLoggedin,
            isOwner,
            upload.single("image"),
             validateListing, wrapAsync(ListingController.updatelisting))
      //Delete Route
      .delete(isLoggedin,isOwner, wrapAsync(ListingController.destroyListing));


module.exports = router;