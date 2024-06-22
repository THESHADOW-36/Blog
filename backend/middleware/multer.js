import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads')
   },
   filename: function (req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
   }
})

const upload = multer({
   storage,
   fileFilter: function (req, file, cb) {
      // Check file type
      const filetypes = /jpeg|jpg|png|gif/; // Allowed file extensions
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);

      if (extname && mimetype) {
         return cb(null, true);
      } else {
         cb('Error: Images Only!');
      }
   }
})

export default upload; 