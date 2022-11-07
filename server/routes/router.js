const express = require('express')
const router = express.Router()
const middle = require("../middleware/middle")

//auth
const {register, login, getUser} = require('../controllers/mainController')
const {emailValid, passwordsValid, userValid, secretValid, loginValid} = require("../middleware/middle")

router.post("/register", emailValid, passwordsValid, userValid, register)
router.post("/login",loginValid, login)
router.post('/getUser/:secret', secretValid, getUser)


//posts
const {addPost,findPost,deletePost,update, allPosts } = require('../controllers/mainController')

router.post('/allPosts', allPosts)
router.post('/addPost', addPost)
router.post("/find", findPost)
router.get("/delete/:id", deletePost)
router.post("/update", update)



module.exports = router

