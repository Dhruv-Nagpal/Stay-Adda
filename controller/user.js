const User = require("../models/user/user");
//render signuppage
const rendersignUp = async(req,res)=>{
    res.render("user/signup");
}

//signup logic
const signUp = async(req,res)=>{
     try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
             req.flash("success", "Welcome to StayAdda!!")
             res.redirect("/listings")
        })
       
    } catch (e) {
       req.flash("error",e.message);
       res.redirect("/signup")
    }
}

//render loginPage
const renderloginPage = (req,res)=>{
    res.render("user/login")
}

//login logic
const login = (req,res)=>{
     req.flash("success","Welcome back to StayAdda!!")
     let redirectUrl = res.locals.redirectUrl || "/listings";
     delete req.session.redirectUrl;
     res.redirect(redirectUrl)
}

const logout = async(req,res)=>{
     req.logout((err)=>{
          if(err){
            next(err);
          }

           req.flash("success","You are logged out!!");
           res.redirect("/listings");

       })
      
}

module.exports = {
     rendersignUp,
     signUp,
     renderloginPage,
     login,
     logout
}