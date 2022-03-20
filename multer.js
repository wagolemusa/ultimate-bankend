
const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  // name file using unique ID
  filename(req, file, cb) {
    if (file.mimetype === 'image/jpeg') {
      cb(null, `${Math.floor(Math.random() * 100)}.jpg`);
    } else {
      cb(null, `${Math.floor(Math.random() * 100)}.png`);
    }
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});