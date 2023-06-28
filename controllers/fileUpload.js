const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    // fetch file
    const file = req.files.file;
    console.log(file);

    // defining server path
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log(path);
    file.mv(path, (err) => console.log(err));

    res.json({
      success: true,
      message: "Local file uploaded with success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadToCloudinary(file, folder , quality) {
  const options = { folder };
  options.resource_type = "auto";

  if(quality){
    options.quality = quality
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // file format matched
    const response = await uploadToCloudinary(file, "mudit");
    // make a entry in database
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image succesfully uploaded on cloudinary",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    // data file
    const { name, tags, email } = req.body;
    const file = req.files.videoFile;

    // validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    const response = await uploadToCloudinary(file, "mudit");
    console.log(response)
    const fileData = await File.create({
      name,
      tags,
      email,
      videoUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      videoUrl: response.secure_url,
      message: "Done uploading",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // file format matched
    const response = await uploadToCloudinary(file, "mudit" , 30);
    // make a entry in database
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image succesfully uploaded on cloudinary",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
