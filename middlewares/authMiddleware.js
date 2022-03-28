const jwt = require('jsonwebtoken')

module.exports = {
    ensureEmployee: function (req, res, next) {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Get token from header
                token = req.headers.authorization.split(" ")[1]

                if (!token) throw new Error("Token required")

                // Verify token
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

                // Get user from the token
                // req.user = await userServices.getUserById(decoded.id)
                req.user = decoded;

                next()
            } catch (error) {
                console.log(error)
                res.status(401)
                throw new Error("Not authorized")
            }
        }

        if (!token) {
            res.status(401).send("No authorization headers")
            throw new Error("Not authorized")
        }
    },
    ensureOTPSent: function (req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            // If authentication failed, `token` will be set to false. If an exception occurred, `err` will be set.
            if (err || !token || _.isEmpty(token)) {
                // PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
                return res.status(401).send('Unauthorized');
            } else if (token.endPoint !== 'endUser' || req.client !== token.client) {
                return res.status(401).send('Unauthorized customer');
            } else {
                req.OTPDetail = token;
                return next();
            }
        })(req, res, next);
    },
    ensureEndUser: function (req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            // If authentication failed, `token` will be set to false. If an exception occurred, `err` will be set.
            if (err || !token || _.isEmpty(token)) {
                // PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
                return res.status(401).send('Unauthorized');
            } else if (token.endPoint !== 'endUser' || req.client !== token.client || !token.verified) {
                return res.status(401).send('Unauthorized customer');
            } else {
                req.user = token;
                return next();
            }
        })(req, res, next);
    },
}