const express = require("express");
const fileUpload = require('express-fileupload')

const app = express()


// middleware
app.use(express.json());
app.use(fileUpload({
  useTempFiles : true ,
  tempFileDir : '/tmp/'
}))

// connections
require("dotenv").config();
require('./config/database').connectWithDb()
require('./config/cloudinary').cloudinaryConnect()

const upload = require('./routes/FileUpload')
app.use('/api/v1',upload)

// initalising our application

app.listen(process.env.PORT, () => {
  console.log(`Server started running at ${process.env.PORT}`);
});
