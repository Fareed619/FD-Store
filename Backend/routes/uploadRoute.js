import path from "path";
import { Router } from "express";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // There will be folder in root directory named uploads
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// Function to filter the files that client will send => ((  just images  ))
const fileFilter = (req, file, cb) => {
  const filetypes = /(jpe?g|png|webp)/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images Only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

//  upload image =>> http://localhost:4000/api/uploads
router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    } else if (req.file) {
      res.status(200).json({
        message: "Image Uploaded Successfuly",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).json({ message: "No image file provided" });
    }
  });
});

export default router;
