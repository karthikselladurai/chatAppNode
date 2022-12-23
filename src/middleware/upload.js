const multer = require("multer");
const { loginSchema } = require("./joiValidation");
const env = process.env
// console.log(`"${PATH}"`)

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("__basedir",env.PATH1 );    
    cb(null,env.PATH1  );
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile