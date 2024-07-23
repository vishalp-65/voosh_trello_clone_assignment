// import multer from "multer";
// import path from "path";

// const storage = multer.memoryStorage();

// const fileFilter = (
//     req: Express.Request,
//     file: Express.Multer.File,
//     cb: multer.FileFilterCallback
// ) => {
//     const fileTypes = /jpeg|jpg|png/;
//     const extname = fileTypes.test(
//         path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = fileTypes.test(file.mimetype);

//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb(new Error("Images only!"));
//     }
// };

// export const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 1024 * 1024 },
// });
