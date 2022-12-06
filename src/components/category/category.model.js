const {Schema, model} = require('mongoose')
const slugify = require('slugify')

const categorySchema= Schema({
    name:{
        type:String,
        required:[true,'category name required'],
        trim:true,
        unique:[true,'category name unique'],
        minlength:[2,'too short category name'],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:String,
},{timestamps:true})


categorySchema.pre('save',function(){
    this.slug = slugify(this.name)
})
categorySchema.pre('findOneAndUpdate',function(){
    this._update.slug = slugify(this._update.name)
})

categorySchema.post('init', (doc)=>{
    doc.image = "http://localhost:3000/category/"+doc.image
})

module.exports= model('category',categorySchema)