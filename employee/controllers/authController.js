const authServices = require("../services/authServices")
// const asyncHandler = require('express-async-handler')

const loginEmployeee = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authServices.loginEmployee(email, password)
        res.json(user)
    } catch (error) {
        res.status(401).send(error.message)
    }
}

const tokenRefresh = (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) res.sendStatus(401)
    // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    const accessToken = authServices.tokenRefresh(refreshToken)
    res.json({ accessToken })
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            res.status(400)
            throw new Error("Please add missed fields")
        }

        const result = await authServices.forgotPassword(email)
        console.log(result)
        res.json({ status: true, result })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, token, newPassword } = req.body
        if (!email || !token || !newPassword) {
            res.status(400)
            throw new Error("Please add missed fields")
        }

        const result = await authServices.resetPassword({ email, token, newPassword })
        console.log(result)
        res.json({ status: true, result })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginEmployeee,
    tokenRefresh,
    forgotPassword,
    resetPassword
}