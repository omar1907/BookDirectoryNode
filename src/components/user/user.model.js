const {Schema, Types, model} = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = Schema({
    name:{
        type:String,
        required:[true,'user name required'],
        trim:true,
        minlength:[2,'too short user name'],
    },
    email:{
        type:String,
        required:[true,'user email required'],
        trim:true,
        unique:[true,'email must be unique']
    },
    phone:{
        type:String,
        required:[true,'phone number required']
    },
    password:{
        type:String,
        required:[true,'user password required'],
        minlength:[6,'too short user password'],
    },
    passwordChange:{
        type:Date
    },
    profileImage:{
        type:String
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:'user'
    },
    favouriteBook:[{
        type:Types.ObjectId,
        ref:'book'
    }]
},{timestamps:true
})

userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password,Number(process.env.SALT_ROUND))
})
userSchema.pre('findOneAndUpdate', async function(){
    if(!this._update.password) return
    this._update.password = await bcrypt.hash(this._update.password,Number(process.env.SALT_ROUND))
})

module.exports= model('user',userSchema)