const {getUser} = require("../services/auth.js")

function checkforAuthentication(req, res, next){
    
    const tokenCookie = req.cookies?.uid;
    req.user = null;

    if(!tokenCookie) return next();

    const token = tokenCookie;
    const user  = getUser(token);

    req.user = user;
    return next();
}

function restricTo(roles = []){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");
        
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    };
}


// async function restrictToLoggedinUserOnly(req, res, next){
//     const userUid = req.headers["authorization"];
    
//     // if(!userUid) return res.redirect("/user/login");

//     const token = userUid?.split("Bearer ")[1];  
//     const user = getUser(token);

//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// async function checkAuth(req,res, next){
//     const userUid = req.headers["authorization"];

//     // if(!userUid) return res.redirect("/login");

//     const token = userUid?.split("Bearer ")[1];
//     const user = getUser(token);

//     req.user = user;
//     next(); 
// }

module.exports = {
    checkforAuthentication,
    restricTo
    };