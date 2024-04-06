const cloudinary = require("../cloud");
// const FeaturedPost = require("../models/featuredPost");
// const Post = require("../models/post");
const Elite = require("../models/elite");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const {secretKey} = require('../index')
const secretKey = require("../secret")
exports.createPost = async (req, res) => {
  console.log('Secret Key:', secretKey);

  try {
    const { token } = req.body;
    console.log('Token:', token);
    console.log('Secret Key:', secretKey);
    const user = jwt.verify(token, secretKey);
    const useremail = user.email;
        // Handle thumbnail file upload
        const pictureResult = await cloudinary.uploader.upload(req.file.path);

        // Construct the new picture object to update in the database
        const newPicture = { uri: pictureResult.secure_url, public_id: pictureResult.public_id };
    
        // Update user data with the new picture
        await Elite.findOneAndUpdate({ email: useremail }, { picture: newPicture });
    
        res.status(200).json({ message: "Picture uploaded successfully", picture: newPicture });
      } catch (error) {
        console.error("Error uploading picture:", error);
        res.status(500).json({ message: "Internal server error" });
      }

};


