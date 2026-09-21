const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedin,validateReviews, isReviewAuthor} = require("../middleware")
const reviewController = require("../controller/review");

//Post Review Route
router.post("/",isLoggedin, validateReviews, wrapAsync(reviewController.newreview));
//render Edit Page
router.get("/:reviewid/edit",isLoggedin,isReviewAuthor,wrapAsync(reviewController.rendereditPage));

router
      .route("/:reviewid")
      //update route
      .patch(isLoggedin,isReviewAuthor, wrapAsync(reviewController.updateReview))
      //Delete Review
      .delete(isLoggedin,isReviewAuthor, wrapAsync(reviewController.destroyReview))

module.exports = router;