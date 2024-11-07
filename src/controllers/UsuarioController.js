import bcrypt from "bcryptjs";
import env from "dotenv";
import messages, { sendError, sendResponse } from "../utils/messages.js";
import UsuarioService from '../services/usuarioService.js';


import { boolean, ZodError } from "zod";
import UsuarioSchema from "../schemas/usuarioSchema.js";


env.config(); 

class systemUsuarioController {

  static listar = async (req, res) => {
    try {
        const filtros = req.query;
        const usuarios = await UsuarioService.listarUsuarios(filtros);
        return sendResponse(res, 200, { data: usuarios });
    } catch (err) {
      console.log(err)
        return sendError(res, 400, err.message);
    }
};

static buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UsuarioService.buscarUsuarioPorId(parseInt(id));
        return sendResponse(res, 200, { data: usuario });
    } catch (err) {
      console.log(err)
        return sendError(res, 404, err.message);
    }
};

static criarUsuario = async (req, res) => {
  try {

    console.log("cg")
    const usuarioData = {
      ...req.body,
      matricula: String(req.body.matricula),
    };


    const { nome, matricula, senha, active, grupo_id } = UsuarioSchema.criarUsuario.parse(usuarioData);

    const parametros = {
      nome: nome,
      matricula: matricula,
      senha: senha,
      active: Boolean(active),
      grupo_id: parseInt(grupo_id),
    };

    const usuario = await UsuarioService.criarUsuario(parametros);
    return sendResponse(res, 201, { data: usuario });

  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return sendError(res, 400, error.errors[0].message);
    } else if (error.message === "usuario já existe.") {
      return sendError(res, 404, ["usuario já existe."]);
    } else {
      return sendError(res, 500, "Ocorreu um erro interno no servidor!");
    }
  }
};

static atualizar = async (req, res) => {
  try {
    let id = req.params.id
    let parametros = {
      id: parseInt(id),
      ...req.body
    }
    
    const usuario = await UsuarioService.atualizar(parametros)

      return sendResponse(res,200, {data:usuario});

    } catch (err) {
     console.error(err)
      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "O recurso solicitado não foi encontrado no servidor."){
        return sendError(res,404,["O recurso solicitado não foi encontrado no servidor."]);

      }else if(err.message == "ja existe um usuario com essa matricula"){
        return sendError(res,404,["ja existe um usuario com essa matricula"]);
      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
}

// Controller
static deletarUsuario = async (req, res) => {
  try {

    const id = parseInt(req.params.id);
    console.log(typeof id);

    if (isNaN(id)) {
      return sendError(res, 400, "ID inválido. Deve ser um número.");
    }

    const usuarioDeletado = await UsuarioService.deletarUsuario(id);

    return sendResponse(res, 204, messages.httpCodes, { data: usuarioDeletado });

  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      return sendError(res, 400, err.errors[0].message);
    } else if (err.message === "Nenhum usuario encontrado") {
      return sendError(res, 404, ["Nenhum usuario encontrado"]);
    } else {
      return sendError(res, 500, "Ocorreu um erro interno no servidor! aquiiiii");
    }
  }
};


  static inserir_csv = async (req, res) => {
    try {
      if (!req.file) {
        return sendError(res, 400, ["Nenhum arquivo enviado."]);
      }

      const retorno = await UsuarioService.inserir_csv(req.file);

      return sendResponse(res, 201, { data: retorno });
    } catch (err) {
      console.error(err);

      if(err.message == "Arquivo do tipo errado." ){
        return sendError(res,404,[err.message]);

      }else if(err.message == "Estrutura do CSV está incorreta." ){
        return sendError(res,404,[err.message]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
  };
  
}

export default systemUsuarioController;
