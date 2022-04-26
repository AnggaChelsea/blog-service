module.exports = () => {

    const multer = require("multer");

    const MIME_TYPE = {
      "image/png": "png",
      "image/jpg": "jpg",
      "image/jpeg": "jpeg",
    }
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const isValid = MIME_TYPE[file.mimetype];
        let uploadError = new Error("Invalid mime type");
        if(isValid){
          uploadError = null;
          cb(null, "assets/images");
        }else{
          cb(uploadError, "file iss not support");
        }
       
      },
      filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        const extension = MIME_TYPE[file.mimetype];
        const suffix = Date.now() + "-" + Math.round(Math.random() * 1000 + '-' + extension)
        cb(null, suffix + "-" + fileName);
      }
    })
    const uploadOption = multer({
      storage: storage
    }).single("image");


}