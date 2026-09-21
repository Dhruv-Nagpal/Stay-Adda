if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const port = process.env.PORT || 8080;
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const ExpressError = require("./utils/expresserror");
const listings = require("./Routes/listingroute")
const reviews = require("./Routes/reviewroute");
const userRoute = require("./Routes/userroute")
const session = require('express-session');
const { MongoStore } = require("connect-mongo");
const cookieparser = require('cookie-parser');
const connectflash = require("connect-flash");
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require("./models/user/user")



async function main() {
    await mongoose.connect(process.env.ATLAS_DBURL)
}

main().then((res) => {
    console.log('Connection Successful')
}).catch((err) => {
    console.log('Some error occured!!')
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.use(cookieparser());


const sessionOptions = {
    secret: process.env.Session_Secret,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
        mongoUrl: process.env.ATLAS_DBURL,
        collectionName: "sessions"
    }),
    //Adding cookie information
    cookie: {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
       maxAge: 7 * 24 * 60 * 60 * 1000,
       httpOnly: true
    }
}

app.use(session(sessionOptions))
app.use(connectflash());
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


// app.get("/demouser",async(req,res)=>{
//     let newUser = new User({
//          username: "Dhruv Nagpal",
//          email: "dhr13@gmail.com"
//     })

//     let registeredUser = await User.register(newUser,"helloworld");
//     res.send(registeredUser);
// })


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",userRoute);






app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error", { message });
})

app.listen(port, () => {
    console.log("Server is listening to port!!")
})

