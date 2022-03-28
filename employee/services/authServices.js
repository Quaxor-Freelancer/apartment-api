const Employee = require('../../models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendMail = require("../../utils/email");
const config = require('../../config/keys')
const { makeUid } = require('../../utils/utils')

exports.loginEmployee = async (email, password) => {
    const employee = await Employee.findOne({ email })

    if (employee && (await bcrypt.compare(password, employee.password))) {
        const encryptedEmployee = {
            _id: employee.id,
            email: employee.email
        }
        return {
            _id: employee.id,
            accessToken: generateAccessToken(encryptedEmployee),
            refreshToken: generateRefreshToken(encryptedEmployee),
            employee: {
                firstname: employee.firstname,
                lastname: employee.lastname,
                email: employee.email,
            }
        };
    } else {
        throw new Error("Invalid credientials")
    }
}

exports.tokenRefresh = (refreshToken) => {
    try {
        const decodedEmployee = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const accessToken = generateAccessToken({ id: decodedEmployee._id, email: decodedEmployee.email })
        return accessToken;
    } catch (error) {
        console.log(error)
        throw new Error("Error occured")
    }
}

exports.forgotPassword = async (email) => {
    const employee = await Employee.findOne({ email })
    if (employee) {
        const resetToken = makeUid(6)
        const expiration = 30
        const expirationTime = Date.now() + expiration * 60 * 1000
        const accountRecovery = {
            token: resetToken,
            expirationTime
        }
        const result = await Employee.updateOne({ _id: employee._id }, {
            $set: { accountRecovery }
        })

        const resetUrl = config.FROENTEND_DOMAIN + "/" + config.PASSWORD_RESET_PATH + "/" + email + "/" + resetToken

        console.log(resetUrl)
        const params = {
            to: email,
            subject: "Password recovery",
            title: "ElectroLeaf Password Recovery",
            text:
                "Your password reset vertification code is " +
                resetToken,
            html:
                `<div>Please reset your password using this link  ` +
                `<a href="${resetUrl}">${resetUrl}</a>` +
                `</div>`
        }

        return sendMail(
            params,
            (err, response) => {
                console.log(JSON.stringify({ err, response, result }, null, 2));
                if (err) throw new Error("Cannot send email")
                return `Reset email sent to ${response && response.accepted && response.accepted[0]}`
            }
        );

    } else {
        console.log("Email not found")
        throw new Error("Email not found")
    }
}


exports.resetPassword = async ({ email, token, newPassword }) => {
    try {
        const employee = await Employee.findOne({ email })

        if (employee.accountRecovery && employee.accountRecovery.token === token) {
            if (employee.accountRecovery.expirationTime && (employee.accountRecovery.expirationTime > Date.now())) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                const result = await Employee.updateOne({ _id: employee._id }, {
                    $set: { password: hashedPassword, accountRecovery: { token: null, expirationTime: null } }
                })
                return "Password Changed"
            } else {
                console.log("Reset Token expired")
                throw new Error("Reset Token expired")
            }

        } else {
            console.log("Not valid credientials")
            throw new Error("Not valid credientials")
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.logout = (employeeId) => {

}

const generateAccessToken = (object) => {
    return jwt.sign(object, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',

    })
}

const generateRefreshToken = (object) => {
    return jwt.sign(object, process.env.REFRESH_TOKEN_SECRET)
}