const userSocialSchema = require('../schemas/userSocialSchema')
const postSocialSchema = require('../schemas/postSocialSchema')

const sendRes = require("../modules/universalResponse")

//sectret key
const {uid} = require("uid")

//passwordu uzhashinimas
const bcrypt = require('bcrypt')


module.exports = {
    //////////////////////////////////////////////////////////////////////////////////////
    //Auth controllers
    register: async (req, res) => {
        const {email, passOne: password, img, description, username} = req.body

        //susikurti uzkoduotui passwordui
        const hash = await bcrypt.hash(password, 10)
        //tada new schema pakeisti pasworda i hash

        new userSocialSchema({
            email,
            password: hash,
            secret: uid(),
            img,
            description,
            username
        }).save().then(() => {
            sendRes(res, false, "all good", null)
        })
    },
    
    login: async (req, res) => {
        const {email, password} = req.body
        console.log(email, password)

        const userExists = await userSocialSchema.findOne({email})

        if(userExists) {
            //jei useris egzistuoja pagal email- reik sucomparinti passwordus su hash password
            const compare= await bcrypt.compare(password, userExists.password)
            if(compare){
                return sendRes(res, false, "all good", {secret: userExists.secret})
            } 
            return sendRes(res, true, 'Bad Credentials', null)
        }

        sendRes(res, true, "bad credentials", null)
    },

    getUser: async(req,res) => {
        const {secret} = req.params
        const user = await userSocialSchema.findOne({secret})

        return sendRes(res, false, "all good", {email: user.email, username: user.username, description: user.description, img: user.img})
    },

    //////////////////////////////////////////////////////////////////////////////////////
    //posts controllers
    allPosts: async(req, res) =>{
        const posts = await postSocialSchema.find()
        res.send({posts})
    }, 
    addPost: async(req, res) =>{

        const newPost= new postSocialSchema(req.body)
        await newPost.save()

        res.send({post: newPost})
    }, 
    
    findPost: async (req, res) => {
        const {username} = req.body
        let posts = []
        console.log(username);

        if(username.length > 0) {
            posts = await postSocialSchema.find({username})
        } else {
            posts = await postSocialSchema.find()
        }

        res.send({posts})
    },
    deletePost: async (req, res) => {
        const {id} = req.params
        await postSocialSchema.findOneAndDelete({_id: id})

        res.send({success: true})
    },
    update: async (req, res) => {

        const {id, title} = req.body

        const post = await postSocialSchema.findOneAndUpdate(
            {_id: id},
            {$set: {title: title}},
            {new : true}
        )
        res.send({success: true})
    }

}


