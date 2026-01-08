import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ✅ Yahan "uploads/" ki jagah "uploads/images" kar diya gaya hai
    cb(null, "uploads/images"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });