const { Query } = require("mongoose");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});

module.exports.index = async (req, res) => {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", {allListings}); // important the "listing/index.ejs"
};


module.exports.renderNewForm = (req, res) => {;
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
        let {id} = req.params;
        const listing = await Listing.findById(id)
        .populate({path : "reviews", populate: {
            path: "author",
        },
    })
        .populate("owner");
        if (!listing) {
            req.flash("error", "listing you requested for does not exits!")
            return res.redirect("/listings")
        }
        res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
        let response = await geocodingClient
            .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
            .send();
         

        const newListing =  new Listing(req.body.listing);
        newListing.owner = req.user._id;

        newListing.geometry = response.body.features[0].geometry;

        let savedListing = await newListing.save();
        req.flash("success", "New Listing created!");
        res.redirect("/listings");
};

module.exports.editForm = async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "listing you requested for does not exits!")
            return res.redirect("/listings")
        }
        if(!listing.owner._id.equals(res.locals.currUser._id)) {
            req.flash("error", "you don't have permission to edit");
            return res.redirect(`/listings/${id}`);
        }

        let originalImageUrl = listing.image.url;
        originalImageUrl.replace("/upload", "/upload/w_300");
        res.render("listings/edit.ejs", { listing, originalImageUrl });
    };

module.exports.upadateListing = async (req, res) => {
        let {id} = req.params;
        let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing });

        // while editing update the existing image with new one
        if(req.body.listing.image) {
            listing.image = req.body.listing.image;
            await listing.save(); 
        }

        req.flash("success", "your listing updated");
        res.redirect(`/listings/${id}`);
};

module.exports.detroyListing = async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listing deleted");
        res.redirect("/listings");
};