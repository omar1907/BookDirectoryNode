const { catchErrors } = require('../../utils/catchError')
const bookModel = require('./book.model')
const refactorServ = require('../../../src/handlers/refactorService')


exports.createbook = refactorServ.create(bookModel)
exports.updatebook = refactorServ.update(bookModel)
exports.getSpecificbook = refactorServ.getSpecific(bookModel)
exports.deletebook = refactorServ.delete(bookModel)

exports.getBooks = catchErrors(async (req,res) =>{
    let filter = {}
    if(req.params.catId){
        filter = {category:req.params.catId}
    }
    let Books = await bookModel.find({filter})
        res.status(200).json({message:"All Books",Books})
})


// exports.createbook = catchErrors(async (req, res) =>{
//     let Book = new bookModel(req.body)
//         await book.save()
//             res.status(200).json({message:"book Created",Book})

// })

// exports.getSpecificbook = catchErrors(async (req,res) =>{
//     let Book = await bookModel.findById(req.params.id)
//     !Book && next(new projectError('Book Not Found',404))
//     Book && res.status(200).json({message:"Book",Book})

// })

// exports.updatebook = (async (req,res) =>{
//     let Book = await bookModel.findByIdAndUpdate(
//         req.params.id,
//          req.body,
//          {new:true})
//          !Book && next(new projectError('Book Not Found',404))
//          Book && res.status(200).json({message:"Book Updated",Book})
// })

// exports.deletebook = catchErrors(async (req,res) =>{
//     let Book = await bookModel.findByIdAndRemove(req.params.id)
//         !Book && next(new projectError('Book Not Found',404))
//             Book && res.status(200).json({message:"Book Deleted"})

// })