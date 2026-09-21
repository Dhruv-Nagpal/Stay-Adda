const Listing = require("../models/listing/listing");
const geocode = require("../utils/geocode");
//Get Route
const index = async (req, res) => {
    const { category,search } = req.query;

    let filter = {};

    if (category) {
        filter.category = category;
    }

    if(search){
        filter.title = {
           $regex: `^${search}`,
           $options: "i",
        }
    }


    let alllistings = await Listing.find(filter);

    res.render("./listing/index", { alllistings });
}

//Render new page
const rendernewpage = (req, res) => {
    res.render("listing/new")
}

//Render edit page
const rendereditpage = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist!!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_500,h_300,c_fill,g_auto/")
    res.render("listing/edit", { listing, originalImageUrl })
}

//show listing
const show = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing does not exist!!");
        return res.redirect("/listings");
    }
    const isOwner = req.user && listing.owner.equals(req.user._id);
    res.render("listing/show", { listing, isOwner });
}

//create new listing
const newlisting = async (req, res) => {
    const newlisting = new Listing(req.body.listing);
    let url = req.file.path;
    let filename = req.file.filename;
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };

    const coordinates = await geocode(req.body.listing.location);

    if (coordinates) {
        newlisting.latitude = coordinates.latitude;
        newlisting.longitude = coordinates.longitude;
    }

    await newlisting.save();
    req.flash("success", "New Listing Added!!")

    res.redirect("/listings");
}

//updatelisting
const updatelisting = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
        new: true,
        runValidators: true
    });
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    res.redirect(`/listings/${id}`)
}

const destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}

module.exports = {
    index,
    rendernewpage,
    rendereditpage,
    show,
    newlisting,
    updatelisting,
    destroyListing
}