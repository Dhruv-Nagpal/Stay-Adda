const Listing = require("./models/listing/listing");
const Review = require("./models/reviews/review")
const ExpressError = require("./utils/expresserror");
const {listingSchema,reviewSchema} = require("./schema")


module.exports.validateListing= (req,res,next)=>{
     let { error } = listingSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    } 

    next()

   
}

module.exports.validateReviews= (req,res,next)=>{
     let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    } 

    next()

    
}

module.exports.isLoggedin = (req,res,next)=>{
     console.log(req.user);
     
     if(!req.isAuthenticated()){
        //save originalurl
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in!!");
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}


module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist");
        return res.redirect(`/listings/${id}`);
    }

    if(!listing.owner.equals(req.user._id)){
        req.flash("error","You do not have permission!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewid} =  req.params;
    let review = await Review.findById(reviewid);

   if (!review) {
        req.flash("error", "Review does not exist!");
        return res.redirect(`/listings/${id}`);
    }

    if(!review.author.equals(req.user._id)){
        req.flash("error","You do not have permission!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
