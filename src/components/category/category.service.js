const { catchErrors } = require('../../utils/catchError')
const refactorServ = require('../../../src/handlers/refactorService')
const categoryModel = require('./Category.model')


exports.createCategory = refactorServ.create(categoryModel)

exports.updateCategory = refactorServ.update(categoryModel)

exports.deleteCategory = refactorServ.delete(categoryModel)

exports.getSpecificCategory = refactorServ.getSpecific(categoryModel)


exports.getCategories = catchErrors(async (req,res,next) =>{
    let Categories = await categoryModel.find({})
        res.status(200).json({message:"All Categories",Categories})
                
})






























// exports.getSpecificCategory = catchErrors(async (req,res,next) =>{         
//     let Category = await categoryModel.findById(req.params.id)
//         !Category &&  next(new projectError('Category not found',404))
//         Category && res.status(200).json({message:"Category is",Category})                
// })




// exports.createCategory = catchErrors(async (req, res) =>{
//     let Category = new CategoryModel(req.body)
//         await Category.save()
//             res.status(200).json({message:"Category Created",Category})
// })
   


// exports.deleteCategory = catchErrors(async (req,res,next) =>{
    //     let Category = await categoryModel.findByIdAndRemove(
        //         req.params.id)
        //         !Category &&  next(new projectError('Category not found',404))
        //         Category && res.status(200).json({message:"Deleted"})
        // })


        
        // exports.updateCategory = catchErrors(async (req,res,next) =>{
            //     let Category = await categoryModel.findByIdAndUpdate(
                //         req.params.id,
                //             req.body,
                //                 {new:true})
                
                //         !Category &&  next(new projectError('Category not found',404))
                //         Category && res.status(200).json({message:"Updated",Category})
                // })
