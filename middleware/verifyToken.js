const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) return res.status(401).json({ success: false, message: "Auth Failed", err });
            req.body.userId = decode.userId;
            next();
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: "Auth Failed" })
    }
}

module.exports = { verifyToken }