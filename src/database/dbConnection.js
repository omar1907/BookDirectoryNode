const mongoose = require('mongoose')


module.exports.dbConnection = ()=>{
     mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
        console.log("DataBase Connected");
    }).catch((err)=>{
        console.log(err);
    })
}

