// this is a reusable component for uploading single or multiple files. This can be called by other functions from controller.js

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const CloudinaryUpload = async (files, folder = "TerraQuest") => {
  const uploadedUrls = [];

  const fileArray = Array.isArray(files) ? files : [files];

  for (const file of fileArray) {
    try {
      const result = await cloudinary.uploader.upload(file.path, { folder });
      uploadedUrls.push(result.secure_url);

      fs.unlinkSync(file.path);
      console.log("deleted the local file ", file.path);
    } catch (err) {
      console.log("There was an error uploading", file.path, err);
    }
  }
  return uploadedUrls;
};

module.exports = CloudinaryUpload;
