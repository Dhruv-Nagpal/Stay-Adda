const Listing = require("../models/listing/listing");
const Review = require("../models/reviews/review");

//new review
const newreview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    console.log(newreview);
    listing.reviews.push(newreview);
    await listing.save();
    await newreview.save();
    req.flash("success","New review was added!!")

    res.redirect(`/listings/${listing._id}`)
}

//render edit page
const rendereditPage = async(req,res)=>{
    let {id,reviewid} =  req.params;
    const review = await Review.findById(reviewid);
    if(!review){
            req.flash("error","Review does not exist");
            return res.redirect(`/listings/${id}`);
        }
      
    res.render("reviews/edit",{review,id});
}

//updatereview
const updateReview = async(req,res)=>{
      let {id,reviewid} = req.params;

        await Review.findByIdAndUpdate(reviewid,req.body.review,{
            new: true,
            runValidators: true
        });

        req.flash("success","Review Updated!!");
        res.redirect(`/listings/${id}`)
}

const destroyReview= async(req,res)=>{
      let { id, reviewid } = req.params;
      //Listing se review ko delete krne ke liye
      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
      //Review model se review delete krne ke liye
      await Review.findByIdAndDelete(reviewid);
      req.flash("success", "Review Deleted!");
      res.redirect(`/listings/${id}`);
}

module.exports = {
    newreview,
    rendereditPage,
    updateReview,
    destroyReview
}