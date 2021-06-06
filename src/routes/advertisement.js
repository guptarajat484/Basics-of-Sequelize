const advcontroller=require('../controller/advertisement')
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./assets/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    //reject a file
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
  });

function adv(app){

    app.post('/advertisemet',upload.single("image"),advcontroller.postadv)
    app.get('/advertisemet',advcontroller.getadv)
    app.put('/advertisemet/:id',upload.single("image"),advcontroller.updateadv)
    app.delete('/advertisemet/:id',advcontroller.deleteadv)
    app.post('/advertisemet/bulk',advcontroller.bulkadd)
    app.get('/advertisemet/finder',advcontroller.finderdata)
    app.post('/advertisemet/setter-getter',advcontroller.setter)
    app.post('/advertisemet/raw-queries',advcontroller.rawquery)
}

module.exports=adv