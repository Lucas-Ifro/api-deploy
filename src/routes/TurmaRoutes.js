import express from "express";
import TurmaController from "../controllers/turmaController.js"
const router = express.Router();

/**
 * a turma não tem post nem delete, pq so são 3 turmas e não precissa adicionar nem deletar
 * aqui é o padrão de rotas normais
*/

router
  router.get("/turma", TurmaController.listar)
  router.get("/turma/:id",TurmaController.listarPorID)
  router.patch("/turma/:id",TurmaController.atualizar)  
  export default router;
