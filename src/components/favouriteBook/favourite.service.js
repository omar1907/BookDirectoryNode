const { catchErrors } = require('../../utils/catchError')
const projectError = require('../../utils/CustomError')
const userModel = require('../user/user.model')


exports.addFavourtieBook = catchErrors(async (req,res,next) =>{
    let {wishlist} = await userModel.findByIdAndUpdate(req.user._id,
        {$addToSet:{favouriteBook:req.body.book}},
        {new:true})
        
        !wishlist && next(new projectError('user not found',404))
        wishlist && res.status(200).json(wishlist)

})


exports.removeFavouriteBook = catchErrors(async (req,res,next) =>{
    let {wishlist} = await userModel.findByIdAndUpdate(req.user._id,
        {$pull:{favouriteBook:req.body.book}},
        {new:true})
        !wishlist && next(new projectError('user not found',404))
        wishlist && res.status(200).json(wishlist)
        
})

exports.getUserFavouriteBook = catchErrors(async (req, res, next) =>{
    let {wishlist} = await userModel.findById(req.user._id)
        !wishlist && next(new AppError("user not found",400))
            wishlist && res.status(200).json(wishlist)
})