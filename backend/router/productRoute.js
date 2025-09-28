import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createProduct, fetchProducts, removeProduct, updateProduct } from '../Controller/productController.js';
import { createReview, fetchReviews } from '../Controller/reviewController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

productRouter.post('/create', upload.single('image'), isAuthenticated, createProduct);
productRouter.get('/fetchproducts', isAuthenticated, fetchProducts);
productRouter.post('/deleteproduct/:id', isAuthenticated, removeProduct);
productRouter.post('/updateproduct/:id', isAuthenticated, updateProduct);
productRouter.post('/addreview/:id', isAuthenticated, createReview);
productRouter.get('/fetchreviews/:id', isAuthenticated, fetchReviews);

export default productRouter;
