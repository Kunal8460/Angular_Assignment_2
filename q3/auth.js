const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {

    const token = req.session.token
    if (token != null) {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const { email } = decode;
        if (email != null) {
            req.session.email = email
            next()
        }
        // req.user = email;
    }
}

module.exports = verifyToken