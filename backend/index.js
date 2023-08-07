const mongoose = require("mongoose");
const uri = "mongodb+srv://gouripawde:gouripawde123@cluster0.rwqmc0y.mongodb.net/";


function main() {
    mongoose.connect(uri).then(() => {
        console.log("Successful")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };