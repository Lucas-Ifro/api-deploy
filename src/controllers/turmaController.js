import env from "dotenv";
import turmaService from "../services/turmaService.js"
import { ZodError } from "zod";
import { messages, sendError, sendResponse } from "../utils/messages.js";

env.config();


class TurmaController{
  static listar = async (req, res) => {
    try {
      const {  nome } = req.body;
      const filtro = {
        nome:nome
      };
      const response = await turmaService.listar(filtro);

      return sendResponse(res,201, {data: response});

    } catch (err) {
      console.log(err)

        if(err instanceof ZodError){
          return sendError(res,400,err.errors[0].message);
  
        }else if(err.message == "nem um modulo foi encontrado." ){
          return sendError(res,404,["nem um modulo foi encontrado."]);
  
        }else{
          return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }
    }
  };

  static listarPorID = async (req, res) => {
    try {
      const id = { id: req.params.id };
      const response = await turmaService.listarPorId(parseInt(id.id));
     
      return sendResponse(res,201, {data:response});

    } catch (err) {
      console.log(err)

        if(err instanceof ZodError){
          return sendError(res,400,err.errors[0].message);
  
        }else if(err.message == "nem um modulo foi encontrado." ){
          return sendError(res,404,["nem um modulo foi encontrado."]);
  
        }else{
          return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }
    }
   
  };
  static atualizar = async (req, res) => {
    try {
      let id = req.params.id
     
      const { nome } = req.body;
      const data = {
      nome:nome    
      }
    const response = await turmaService.atualizarTurma(parseInt(id),data)
    return sendResponse(res,201, {data:response});

    } catch (err) {
      console.log(err)

        if(err instanceof ZodError){
          return sendError(res,400,err.errors[0].message);
  
        }else if(err.message == "Aqui vai a mensagem de Erro que vc gerou lá no service." ){
          return sendError(res,404,["Aqui vai a mensagem de Erro que vc gerou lá no service."]);
  
        }else{
          return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }
    }
  }
}
export default TurmaController;
