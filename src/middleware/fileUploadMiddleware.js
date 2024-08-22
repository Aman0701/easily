import multer from "multer";

/**
 * Multer configuration for uploading files to the server.
 */
const storageConfig = multer.diskStorage({
    /**
     * Destination folder for uploaded files.
     */
    destination: (req, file, cb) => {
        cb(null, 'public/resume');
    },
    /**
     * File naming convention for uploaded files.
     */
    filename: (req, file, cb) => {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name)
    }
});

/**
 * Multer instance for uploading files.
 */
export const uploadFile = multer({
    storage: storageConfig,
});