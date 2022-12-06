const uploadFile = require('../../utils/uploadImg')
const { tokenVerify, isAllow } = require('../user/user.service')
const { createbook, getBooks, getSpecificbook, updatebook, deletebook } = require('./book.service')

const router = require('express').Router({mergeParams:true})

router.route("/")
.post(tokenVerify,isAllow('admin'),uploadFile('image','book'),createbook)
.get(tokenVerify,isAllow('admin','user'),getBooks)
router.route("/:id")
.get(tokenVerify,isAllow('user','admin'),getSpecificbook)
.put(tokenVerify,isAllow('admin'),updatebook)
.delete(tokenVerify,isAllow('admin'),deletebook)


module.exports = router