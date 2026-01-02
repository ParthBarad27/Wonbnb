const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
};


module.exports.signupListing = async (req, res) => {
        try {
            let {username, email, password} = req.body;
            const newUser = new User({email, username});
            const registeredUser = await User.register(newUser, password);
            req.login(registeredUser, (err) => {
                if(err) {
                return next(err);
                }
                req.flash("success", "Welcome to wonderlust");
                res.redirect("/listings");  
            })
        } catch(e) {
            req.flash("error", e.message);
            res.redirect("/signup");
        }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};


module.exports.login = async(req, res) => {
        req.flash("success", "Welcome to wondurlust");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    };

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logout not");
        res.redirect("/listings");
    })
};