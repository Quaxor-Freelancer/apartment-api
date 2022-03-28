const userService = require('../services/userService')

const getMe = (req, res) => {
    const user = req.user;
    res.json(user)
}

const updateInfo = (req, res) => {
    const { _id: id } = req.user
    const { firstname, lastname, phone, address } = req.body;
    userService.updateInfo(id, { firstname, lastname, phone, address })
        .then(result => {
            res.json({ status: true })
        })
        .catch(e => {
            console.log(e)
            res.status(500).send("An Error occured")
        })
}

const changePassword = async (req, res) => {
    const { _id: id } = req.user
    // console.log(req.user)
    const { oldPassword, newPassword } = req.body
    if (!id || !oldPassword || !newPassword) {
        res.status(400)
        throw new Error("Please add missed fields")
    }

    const result = await userService.changePassword({ id, oldPassword, newPassword })
    res.json({ status: true, result })
}

module.exports = {
    getMe,
    updateInfo,
    changePassword,
}