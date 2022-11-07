const mongoose= require('mongoose')
const Schema= mongoose.Schema


const postSocialSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    }
})

const exportPost = mongoose.model('postSocialSchema', postSocialSchema)
module.exports = exportPost 