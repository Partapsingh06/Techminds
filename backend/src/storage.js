const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Config Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Configure Cloudinary if credentials are provided
const hasCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('Cloudinary storage initialized successfully.');
} else {
  console.log('Cloudinary not configured. Falling back to local disk storage.');
}

// Helper function to handle uploaded file and return url
async function handleUploadedFile(file) {
  if (!file) return null;

  if (hasCloudinary) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'techminds'
      });
      // Delete local temporary file
      fs.unlinkSync(file.path);
      return result.secure_url;
    } catch (err) {
      console.error('Cloudinary upload failed, falling back to local file URL:', err.message);
      // Fallback to local URL if Cloudinary fails
    }
  }

  // Local static file url
  return `/uploads/${file.filename}`;
}

module.exports = {
  upload,
  handleUploadedFile
};
