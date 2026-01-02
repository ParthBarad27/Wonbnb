const express = require("express");
// when the review route unable to get re.params daata thebecause it remains in app.js to come in review.js that's why we use router merParams
const router = express.Router({ mergeParams : true });
const wrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");




// Reviews
// Post review Route
router.post("/", 
    validateReview,
    isLoggedIn, 
    wrapAsync(reviewController.createReview));


// Delete Review route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);


module.exports = router;