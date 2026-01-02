if(process.env.NODE_ENV != "production")  {
    require('dotenv').config();

}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
require('events').defaultMaxListeners = 20; //when listening limit exceed
const ejsMate = require("ejs-mate");
const { url } = require("inspector");
const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const Joi = require("joi"); //schema validation //server side validation schema
// These are not required in app.js
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
const Listing = require("./models/listing.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const { log } = require('console');

const dbUrl = process.env.ATLASDB_URL;

// const mongo_Url = "mongodb://127.0.0.1:27017/wonderlust";


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
        
    });

// async function main() {
//     await mongoose.connect(mongo_Url);
// }

async function main() {
    await mongoose.connect(dbUrl);
}

// session/cookies management
const store = MongoStore.MongoStore
        ? MongoStore.MongoStore.create({
                mongoUrl: dbUrl,
                crypto: { secret: "process.env.SECRET" }
            })
        : MongoStore.default
        ? MongoStore.default.create({
                mongoUrl: dbUrl,
                crypto: { secret: "process.env.SECRET" }
            })
        : MongoStore.create({
                mongoUrl: dbUrl,
                crypto: { secret: "process.env.SECRET" }
            });

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
    
}); 

const sessionOptions = {
    store,
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // for 1 week cookie will store 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true //to prevent cross scripting attack
    },
};

// home
app.get("/", (req, res) => {
    res.send("Okayy")
});

// express-session / flash session
app.use(session(sessionOptions));
app.use(flash());

// passport session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

// session serialize and deserialize
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// pbkdf2 hashing algorithm used to convert password into

// flashh middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User ({
//         email: "student@gmail.com",
//         username: "parth",
//     });

//     let registerUser = await User.register(fakeUser, "helloworld");
//     res.send(registerUser);
// });


// we shifted all routes
app.use("/listings", listingRouter);
// the riviewe route
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// For all remaining undefined path
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// // all unused route
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found!"));
// });

// middleware handler
app.use((err, req, res, next) => {
    console.log("Error caught:", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
});



app.listen(8080, () => {
    console.log("Server is listening on 8080");
    
});

// the validate review
// const validateReview = (req, res, next) => {
//     let {error} = reviewSchema.validate(req.body);
//         if(error) {
//             let errMsg = error.details.map((el) => el.message).join(",");
//             throw new ExpressError(400, error)
//         } else {
//             next();
//         }
// };

// // Testing request to save database into mongodb
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing ({
//         title: "My New house",
//         description: "My the house",
//         image: {
//             filename: "listingimage",
//             url: "",
//         },
//         price: 24000,
//         location: "Calangute , Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Succesful testing");
    
// });


// ***************All routes are written in route file****************

// // main listings page //index route
// app.get(
//     "/listings",
//     validateListing, 
//     wrapAsync(async (req, res) => {
//         const allListings = await Listing.find({});
//         res.render("listings/index.ejs", {allListings}); // important the "listing/index.ejs"
// }));


// // new route
// app.get("/listings/new", (req, res) => {;
//     res.render("listings/new.ejs");
// });


// // Show route
// app.get(
//     "/listings/:id",
//     wrapAsync(async (req, res) => {
//         let {id} = req.params;
//         const listing = await Listing.findById(id).populate("reviews");

//         res.render("listings/show.ejs", { listing });
// }));

// // create route
// app.post(
//     "/listings", 
//     validateListing,
//     wrapAsync(async (req, res, next) => {
//         // validate incoming data
        
//         // let {title, description, image, price, }
//         // let listing = req.body.listing;
//         // if valid, then save
//         const newListing =  new Listing(req.body.listing)
//         await newListing.save();
//         res.redirect("/listings"); //${newListing._id}`
        
        

//         // This is too time consuing to do 
//         // That's why we use """"joi"""""
//         // if(!newListing.title) {
//         //     throw new ExpressError(404, "title not written.")
//         // }
//         // if(!newListing.description) {
//         //     throw new ExpressError(404, "Discription not written.")
//         // }
//         // if(!newListing.price) {
//         //     throw new ExpressError(404, "price not written.")
//         // }
//         // if(!newListing.location) {
//         //     throw new ExpressError(404, "location not written.") 
//         // }
//         // if(!newListing.country) {
//         //     throw new ExpressError(404, "country not written.")
//         // }

        
// })
// );

// // Edit route
// app.get("/listings/:id/edit", 
//     wrapAsync(async (req, res) => {
//         let { id } = req.params;
//         const listing = await Listing.findById(id);
//         if (!listing) {
//             throw new ExpressError(404, "Listing not found");
//         }
//         res.render("listings/edit.ejs", { listing });
//     })
// );

// // update route
// app.put("/listings/:id", 
//     validateListing,
//     wrapAsync(async (req, res) => {
//         let {id} = req.params;
//         await Listing.findByIdAndUpdate(id, {...req.body.listing }); //doubt
//         res.redirect(`/listings/${id}`);
// }));


// // delete route
// app.delete("/listings/:id", 
//     wrapAsync(async (req, res) => {
//         let { id } = req.params;
//         let deletedListing = await Listing.findByIdAndDelete(id);
//         console.log(deletedListing);
//         res.redirect("/listings");
// }));






// Shifted to the review.js
// // Reviews
// // Post review Route
// app.post("/listings/:id/reviews", 
//     validateReview, 
//     wrapAsync(async(req, res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review
//     );
//     console.log(newReview);
    
//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();

//     console.log("new review saved");
//     res.redirect(`/listings/${listing._id}`);
// }));


// // Delete Review route
// app.delete("/listings/:id/reviews/:reviewId", 
//     wrapAsync(async (req, res) => {
//     let {id, reviewId} = req.params;
//     // those who match with review id we pull it means delete it from db
//     await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
//     await Review.findByIdAndDelete(reviewId);

//     res.redirect(`/listings/${id}`);
//     })
// );

// This is not allowed in express 5 new version
// app.all("/*", (req, res, next) => {
//     next(new ExpressError(404, "Page not found!"));
// });








// // For all remaining undefined path
// app.use((req, res, next) => {
//     next(new ExpressError(404, "Page not found!"));
// });


// // middleware handler
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Something went wrong";
//     res.status(statusCode).render("error.ejs", {message});
//     // res.status(statusCode).send(message);
// });



// app.listen(8080, () => {
//     console.log("Server is listening on 8080");
    
// });