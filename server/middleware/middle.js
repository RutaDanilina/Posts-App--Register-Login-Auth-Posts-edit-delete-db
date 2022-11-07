const isEmail = require("is-email")
const userSchema = require("../schemas/userSocialSchema")
const sendRes = require("../modules/universalResponse")

module.exports = {
    emailValid: (req, res, next) => {
        const {email} = req.body
        if(!isEmail(email)) return sendRes(res, true, "bad email", null)
        next()
    },
    passwordsValid: (req, res, next) => {
        const {passOne, passTwo} = req.body

        if(passOne !== passTwo) return sendRes(res, true, "passwords don't match", null)
        if(passTwo.length < 5 || passTwo.length > 20) return sendRes(res, true, "bad password length", null)

        next()
    },
    userValid: async (req, res, next) => {
        const {email} = req.body

        const userExists = await userSchema.findOne({email})

        if(userExists) {
            return sendRes(res, true, "user already exists", null)
        }

        next()
    },

    loginValid: async ( req, res, next) => {
        const {email} = req.body

        const userExists = await userSchema.findOne({email})

        if(!userExists) {
            return sendRes(res, true, "User does not exist", null)
        }

        next()

    },
    secretValid: async (req, res, next) => {
        const {secret} = req.params

        const userExists = await userSchema.findOne({secret})

        if(!userExists) return  sendRes(res, true, "bad user secret", null)

        next()
    }
}