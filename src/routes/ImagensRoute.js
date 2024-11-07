import express from "express";
import path from "path";
const cominho = process.cwd()

const router = express.Router();

router.use('/imagens', express.static(path.join(cominho.toString(), './uploads/imagens')));

export default router;
