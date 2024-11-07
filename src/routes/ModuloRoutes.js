import express from "express";
import moduloController from "../controllers/moduloController.js";
const router = express.Router();
import multer from "multer";
/**
 * o modulo é padrão igual qualquer outra rota, so lembre de no get normal
 * ter a possibilidade de filtrar pelo titulo.
 * Importante, tem que ser possivel filtrar os modulos de apenas um turma.
*/

const multerConfig = multer()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .get("/modulo", moduloController.listar)
  .get("/modulo/:id", moduloController.listarPorId)
  .post("/modulo", upload.single('imagem'), moduloController.inserir)
  .patch("/modulo/:id", moduloController.atualizar)
  .delete("/modulo/:id", moduloController.deletar)
 
  export default router;