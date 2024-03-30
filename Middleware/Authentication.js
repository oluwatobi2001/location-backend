const jwt = require("jsonwebtoken");
const { checkRecordsExists } = require("../utils/sqlSchemaFunction");
const authenticate = async (req, res, next) => {
const authorizationHeader = req.headers.authorization;

if(!authorizationHeader || !authorizationHeader.startsWith("Bearer") ) {
    return res.status(401).json({ error: "You are not authorized to access this. No token"})
}
try {
    const token = authorizationHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({ error: "You are not authorized to access this. No token"})
    }
    const decoded = jwt.verify(token, process.env.JWT);
    console.log(decoded);
    if(!decoded || !decoded.userID ) {
        return res.status(401).json({ error: "Invalid token"})
    }
    console.log(decoded.userID)
    const user = await checkRecordsExists("users", "userID", decoded.userID);
console.log(user);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    delete req.user.password;

    next();


} 
catch(err) {
    console.error(err);
    return res.status(401).json({err})

}
}

module.exports = { authenticate }