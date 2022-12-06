const { catchErrors } = require("../utils/catchError")
const projectError = require("../utils/CustomError")

exports.create=(Model)=>{
    return catchErrors(async (req, res, next) =>{
        if(req.file){
            req.body.image= req.file?.filename
        }
        let document = new Model(req.body)
            await document.save()
                res.status(201).json({msg:"Created Done",document})
    })
}

exports.update=(Model)=>{
    return catchErrors(async (req, res, next) =>{
        if(req.file){
            req.body.image= req.file?.filename
        }
        let document = await Model.findByIdAndUpdate(req.params.id,req.body)
            !document && next(new projectError('not found',404))
            document &&  res.status(201).json({msg:"updated Done",document})
    })
}

exports.delete=(Model)=>{
    return catchErrors(async (req, res, next) =>{
        let document = await Model.findByIdAndDelete(req.params.id)
            !document && next(new projectError('not found',404))
            document &&  res.status(201).json({msg:"Deleted Done"})
    })
}

exports.getSpecific=(Model)=>{
    return catchErrors(async (req, res, next) =>{
        let document = await Model.findById(req.params.id)
            !document && next(new projectError('not found',404))
            document &&  res.status(201).json({msg:"document is",document})
    })
}



