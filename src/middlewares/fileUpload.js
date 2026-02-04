const multer = require("multer");
const path = require("path");

const userStorage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "public/img/user");
  //   },
  filename: (req, file, cb) => {
    const extansionName = path.extname(file.originalname);
    const fileName = Date.now() + "-" + extansionName;
    cb(null, fileName);
  },
});

// === upload user =====
const userUpload = multer({
  storage: userStorage,
  limits: { fileSize: 2097152 },
  //   fileFilter,
});

module.exports = userUpload;
