const uploadFile = require('../../utils/uploadImg')
const { tokenVerify, isAllow } = require('../user/user.service')
const { createCategory, getCategories, getSpecificCategory, updateCategory, deleteCategory } = require('./category.service')
const bookRoute = require('../book/book.api')
const router = require('express').Router()

router.use("/:catId/book",bookRoute)
router.route("/")
.post(tokenVerify,isAllow('admin'),uploadFile('image','category'),createCategory)
.get(tokenVerify,isAllow('admin','user'),getCategories)
router.route("/:id")
.get(tokenVerify,isAllow('admin','user'),getSpecificCategory)
.put(tokenVerify,isAllow('admin'),updateCategory)
.delete(tokenVerify,isAllow('admin'),deleteCategory)


module.exports = router