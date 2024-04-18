const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,{}).then(()=>{
            console.log("db connected");
        }).catch(err=>{
            console.log("eror got it here")
            console.log(err,"ersdfas")});
    }
    catch (error) {
        process.exit()
    }
}

module.exports = {connection}