const {Schema, Types, model} = require('mongoose')
const slugify  = require('slugify')

const bookSchema = Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    image:{type:String},
    category:{
        type:Types.ObjectId,
        ref:'category',
        required:true
    },
    slug: {type: String, lowercase:true},
},{timestamps:true
})

bookSchema.pre('save',function(){
    this.slug = slugify(this.name)
})

bookSchema.pre('findOneAndUpdate',function(){
    this._update.slug = slugify(this._update.name)
})

bookSchema.post('init', (doc)=>{
    doc.image = "http://localhost:3000/category/"+doc.image
})

module.exports= model('book',bookSchema)