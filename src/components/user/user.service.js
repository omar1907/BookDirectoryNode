const { catchErrors } = require('../../utils/catchError')
const projectError = require('../../utils/CustomError')
const userModel = require('./user.model')
bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.signUp = catchErrors(async (req, res, next) =>{
    let isUser = await userModel.findOne({email:req.body.email})
        if(isUser) return next (new projectError('Email Already Exist',400))
            let user = new userModel(req.body)
                await user.save()
                    res.status(200).json({msg:"user created",user})
})

exports.signIn = catchErrors(async (req, res, next) =>{
    let user = await userModel.findOne({email:req.body.email})
        if(!user || !await bcrypt.compare(req.body.password,user.password))
            return next(new projectError('Email Or Password is Incorrect',401))
        let token = jwt.sign(
            {name:user.name,userId:user._id}
            ,process.env.JWT_KEY)
            res.status(200).json({msg:"user signed in",token})
})


exports.tokenVerify = catchErrors(async (req, res, next) =>{
    let token = req.headers.token
    !token && next(new projectError('token is required',400))
        let decoded = jwt.verify(token,process.env.JWT_KEY)
            let user = await userModel.findById(decoded.userId)
                if(!user) return next( new projectError('user not found',404))

                if(user.passwordChange){
                    let changedAt = parseInt(user.passwordChange.getTime()/1000)
                    if(changedAt > decoded.iat) return next( new projectError('password changed',401))

                }
                
                req.user = user
                next()
})

exports.isAllow = (...roles)=>{
    return(req,res,next) =>{
        if(!roles.includes(req.user.role)) return next(new projectError('not authorized',401))
        next()
    }
}