const mongoose = require("mongoose")
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

function connectToDb(){
  mongoose.connect(process.env.MONGOOSE_URI)
  .then(()=>{
    console.log("connect to Db")
  })
}

module.exports = connectToDb