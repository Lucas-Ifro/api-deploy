import express from "express";
import systemUsuarioController from "../controllers/UsuarioController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import PermissaoMiddleware from "../middlewares/permissaoMiddleware.js";

import multer from "multer";

const multerConfig = multer()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


/**
 * usuario é padrão não tem nada de especial, so lembre de ser possivel filtar no get por
 * nome, matricula e active, grupo_id. o inserir_csv o lucas vai fazer.
*/

const router = express.Router();

router
  .get("/usuario", systemUsuarioController.listar)
  .get("/usuario/:id", systemUsuarioController.buscarPorId)
  .post("/usuario", systemUsuarioController.criarUsuario)
  .post("/usuario/csv", upload.single('file-csv'), systemUsuarioController.inserir_csv)
  .patch("/usuario/:id", systemUsuarioController.atualizar)
  .delete("/usuario/:id", systemUsuarioController.deletarUsuario);

 
  export default router;