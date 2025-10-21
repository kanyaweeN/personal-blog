import multer from "multer";

//ตั้งค่า multer เก็บไฟล์ในหน่วยความจำ
const storage = multer.memoryStorage();

//ฟังก์ชันกรองเฉพาะไฟล์รูปภาพ
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

//จำกัดขนาดไฟล์ 50MB
const limits = { fileSize: 50 * 1024 * 1024 };

//export upload instance ใช้งานได้เลย
export const upload = multer({ storage, limits, fileFilter });
