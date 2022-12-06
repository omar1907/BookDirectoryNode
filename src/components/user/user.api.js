const { addUser, getUser, getSpecificUser, updateUser, deleteUser } = require('./admin')
const { signUp, signIn } = require('./user.service')

const router = require('express').Router()

router.route("/")
.post(addUser)
.get(getUser)

router.route("/:id")
.get(getSpecificUser)
.put(updateUser)
.delete(deleteUser)

router.route("/signup")
.post(signUp)
router.route("/signin")
.post(signIn)
module.exports = router