const { catchErrors } = require('../../utils/catchError')
const projectError = require('../../utils/CustomError')
const userModel = require('./user.model')


exports.addUser = catchErrors(async (req, res, next) =>{
    let isUser = await userModel.findOne({email:req.body.email})
        if(isUser) return next (new projectError('Email Already Exist',400))
            let user = new userModel(req.body)
                await user.save()
                    res.status(200).json({msg:"user created",user})
})

exports.getUser = catchErrors(async (req, res, next) =>{
    let user = await userModel.find({})
        res.status(200).json({msg:"All Users",user})
        
})

exports.getSpecificUser = catchErrors(async (req, res, next)=>{
    let user = await userModel.findById(req.params.id)
    !user && next(new projectError('User Not Found',404))
    user && res.status(200).json({msg:'User is',user})
})

exports.updateUser = catchErrors(async (req, res, next)=>{
    let user = await userModel.findByIdAndUpdate(req.params.id,
        req.body,
        {new:true})
    !user && next(new projectError('User Not Found',404))
    user && res.status(200).json({msg:'User Updated',user})
})

exports.deleteUser = catchErrors(async (req, res, next)=>{
    let user = await userModel.findByIdAndDelete(req.params.id)
    !user && next(new projectError('User Not Found',404))
    user && res.status(200).json({msg:'User Deleted'})
})
