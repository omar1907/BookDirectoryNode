const { tokenVerify, isAllow } = require('../user/user.service')
const { addFavourtieBook, removeFavouriteBook, getUserFavouriteBook } = require('./favourite.service')

const router = require('express').Router()


router.route(tokenVerify,isAllow('user'))

router.route('/addfavourite')
.patch(addFavourtieBook)

router.route('/removefavourite')
.delete(removeFavouriteBook)

router.route("/")
.get(getUserFavouriteBook)


module.exports = router