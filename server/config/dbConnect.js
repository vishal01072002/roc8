const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
    })
    .then(()=> {console.log("database connected sucessfully")})
    .catch( (error)=> {
        console.log("DB connection error ",error);
        process.exit(1);
    })
}