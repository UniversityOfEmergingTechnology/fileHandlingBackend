const mongoose = require("mongoose");
const nodemailer = require('nodemailer')
require('dotenv').config()

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});
// hw added
// post middleware
fileSchema.post("save" , async function(doc){
  try{
    console.log(doc)
    let transporter = nodemailer.createTransport({
      host : process.env.MAIL_HOST , 
      auth : {
        user : process.env.MAIL_USER , 
        pass : process.env.MAIL_PASS
      }
    })
    // send mail
    let info = await transporter.sendMail({
      from :  "Mudit Kapoor" , 
      to : doc.email ,
      subject : "New file uploaded on cloudinary",
      html : `<h2> Hello Sir File Uploaded </h2>`
    })

  }
  catch(err){
    console.log(err)
  }
})

module.exports = mongoose.model("File", fileSchema);
