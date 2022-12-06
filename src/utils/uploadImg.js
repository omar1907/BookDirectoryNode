const multer = require('multer')
const projectError = require('./CustomError')

function uploadFile(fieldName,folderName){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null,uniqueSuffix   + '-'  +file.originalname)
        }
      })
      function fileFilter (req, file, cb) {
        if(req.file.mimetype.startsWith('image')){
        cb(null, true)
        }else{
            cb(new projectError('imagesOnly',400), false)
        }
      }
      
      const upload = multer({storage})
      return upload.single(fieldName)
}

module.exports = uploadFile