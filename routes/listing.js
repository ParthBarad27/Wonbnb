const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");

// Use Cloudinary storage
const upload = multer({ storage });


router
    .route("/")
    .get(
        // index route // main listings page
        wrapAsync(listingController.index)
    )
    .post(
        isLoggedIn,
        upload.single('image'),
        (req, res, next) => {
            // Handle uploaded file (takes priority over URL)
            if (req.file) {
                req.body.listing.image = {
                    url: req.file.path,
                    filename: req.file.filename
                };
            } 
            // If no file uploaded, use URL input (if provided)
            else if (req.body.listing.image && req.body.listing.image.url) {
                req.body.listing.image = {
                    url: req.body.listing.image.url,
                    filename: "user-provided-url"
                };
            }
            // If neither provided, set default or let validation handle it
            else {
                req.body.listing.image = {
                    url: "",
                    filename: ""
                };
            }
            next();
        },
        validateListing,
        wrapAsync(listingController.createListing)
    );

// new route
router.get("/new",
    isLoggedIn,
    listingController.renderNewForm);


router
    .route("/:id")
    //show route
    .get(
    isLoggedIn,
    wrapAsync(listingController.showListing))
    // update route 
    .put(
    isLoggedIn,
    isOwner,
    upload.single('image'),
    (req, res, next) => {
        // Handle uploaded file (takes priority over URL)
        if (req.file) {
            req.body.listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        } 
        // If no file uploaded, use URL input (if provided)
        else if (req.body.listing.image && req.body.listing.image.url) {
            req.body.listing.image = {
                url: req.body.listing.image.url,
                filename: "user-provided-url"
            };
        }
        // If neither provided, keep existing image (don't modify)
        next();
    },
    validateListing,
    wrapAsync(listingController.upadateListing))
    // delete route
    .delete(
        isLoggedIn,
        isOwner, 
        wrapAsync(listingController.detroyListing));



// Edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.editForm)
);






module.exports = router;



// create route
        // This is too time consuing to do 
        // That's why we use """"joi"""""
        // if(!newListing.title) {
        //     throw new ExpressError(404, "title not written.")
        // }
        // if(!newListing.description) {
        //     throw new ExpressError(404, "Discription not written.")
        // }
        // if(!newListing.price) {
        //     throw new ExpressError(404, "price not written.")
        // }
        // if(!newListing.location) {
        //     throw new ExpressError(404, "location not written.") 
        // }
        // if(!newListing.country) {
        //     throw new ExpressError(404, "country not written.")
        // }

        


