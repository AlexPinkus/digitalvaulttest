import express from 'express';
import uploadFileController from '../controllers/files/upload.js';
import uploadIPFS from '../controllers/files/uploadIPFS.js';

const router = express.Router();
router.post('/create', uploadFileController);
router.post('/ipfs-upload', uploadIPFS);

export default router;