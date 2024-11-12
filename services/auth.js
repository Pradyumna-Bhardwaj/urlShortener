const jwt = require("jsonwebtoken");
const {returnKEY} = require("../pvt/jwtKey")
const KEY = returnKEY();


function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    },
    KEY);
}

function getUser(token) {
    if(!token) return null;
    try{
        return jwt.verify(token, KEY);
    } catch(error){
        return null;
    }
}
module.exports = {
    setUser,
    getUser,
}
