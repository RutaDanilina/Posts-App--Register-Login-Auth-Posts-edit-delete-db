const mongoose= require('mongoose')
const Schema= mongoose.Schema


const userSocialSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: true

    },
    secret: {
        type: String,
        required: true
    }
    
})

const exportUser = mongoose.model('userSocialSchema', userSocialSchema)
module.exports = exportUser 