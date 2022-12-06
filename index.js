process.on("uncaughtException",(err)=>{
    console.log("uncaughtException",err);
})

const express = require('express')
const { dbConnection } = require('./src/database/dbConnection')
const projectError = require('./src/utils/CustomError')
require('dotenv').config({path:'./config/.env'})
const app = express()
const port = process.env.PORT
const globalMiddleWare = require('./src/utils/globalMiddlewareError');
const refactorAllApis = require('./src/utils/refactorApis');
app.use(express.static('uploads'))
app.use(express.json())



refactorAllApis(app)
app.all("*",(req,res,next)=>{
    next(new projectError(`Can't find this route" ${req.originalUrl} on server`,404))
})

//Error Handling MiddleWare
app.use(globalMiddleWare)


dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection',(err)=>{
    console.log("unhandledRejection",err);
})