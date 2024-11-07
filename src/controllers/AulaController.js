import env from "dotenv";
import AulaService from "../services/AulaService.js";
import path from "path";
import { sendError, sendResponse } from "../utils/messages.js";
import { ZodError } from 'zod';

env.config();

class AulaController {

  /**
   * Parâmetros aceitos:
   * - titulo: Filtra pelo título da aula (opcional).
   * - feito: Se a aula foi feita ou não ("true" ou "false").
   * - revisar: Se a aula precisa ser revisada ("true" ou "false").
   */
  static listarAll = async (req, res) => {
    try {
      const { titulo, aluno_id, modulo_id, page = 1, perPage = 5 } = req.query;

      const parametros = {
        titulo: titulo,
        modulo_id: modulo_id ? parseInt(modulo_id) : undefined,
        aluno_id: aluno_id ? parseInt(aluno_id) : undefined,
        page: parseInt(page),
        perPage: parseInt(perPage)
      }

      const aulaExist = await AulaService.listar(parametros);

      return sendResponse(res, 200, { data: aulaExist });

    } catch (err) {
      if (err instanceof ZodError) {
        return sendError(res, 400, err.errors[0].message);

      } else if (err.message == "Nenhuma aula encontrada.") {
        return sendError(res, 404, ["Nenhuma aula encontrada."]);

      } else {
        return sendError(res, 500, "Ocorreu um erro interno no servidor!");
      }
    }
  };

  static listarPorID = async (req, res) => {
    try {
      const parametros = { id: parseInt(req.params.id) };
      const aulaExists = await AulaService.listarPorID(parametros);

      return sendResponse(res, 200, { data: aulaExists });

    } catch (err) {

      if (err instanceof ZodError) {
        return sendError(res, 400, err.errors[0].message);

      } else if (err.message == "Nenhuma aula encontrada.") {
        return sendError(res, 404, ["Nenhuma aula encontrada."]);

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

      const aula = await AulaService.atualizar(parametros)

      return sendResponse(res, 200, { data: aula });

    } catch (err) {
      if (err instanceof ZodError) {
        return sendError(res, 400, err.errors[0].message);

      } else if (err.message == "Nenhuma aula encontrada.") {
        return sendError(res, 404, ["Nenhuma aula encontrada."]);

      } else {
        return sendError(res, 500, "Ocorreu um erro interno no servidor!");
      }
    }
  }

  static inserir = async (req, res) => {
    try {
      const files = req.files;

      const parametros = {
        modulo_id: req.body.modulo_id,
        titulo: req.body.titulo == '' ? undefined : req.body.titulo,
        video: req.body.video,
        descricao: req.body.descricao == '' ? undefined : req.body.descricao,
        pdf_questoes: files.pdf_questoes ? files.pdf_questoes[0].filename : undefined,
        pdf_resolucao: files.pdf_resolucao ? files.pdf_resolucao[0].filename : undefined
      };

      const questaoCreate = await AulaService.create(parametros)

      return sendResponse(res, 201, { data: questaoCreate });

    } catch (err) {

      if (err instanceof ZodError) {
        return sendError(res, 400, [err.errors[0].message, err.errors[0].path]);

      } else if (err.message == "O modulo informado não existe.") {
        return sendError(res, 404, [err.message]);

      } else {
        return sendError(res, 500, "Ocorreu um erro interno no servidor!");
      }
    }
  }

  static feito_status = async (req, res) => {
    try {
      const { aluno_id, aula_id, feito } = req.body
      const parametros = {
        aluno_id: parseInt(aluno_id),
        aula_id: parseInt(aula_id),
        feito: Boolean(feito),
      };
      
      const feitoDone = await AulaService.feito_status(parametros)

      return sendResponse(res, 201, { data: feitoDone });

    } catch (err) {

      if (err instanceof ZodError) {
        return sendError(res, 400, err.errors[0].message);

      } else if (err.message == "A aula já foi assistida.") {
        return sendError(res, 404, ["A aula já foi assistida."]);

      } else {
        return sendError(res, 500, "Ocorreu um erro interno no servidor!");
      }
    }
  };


  static buscar_arquivo = async (req, res) => {
    try {
      const fileName = req.params.fileName;
      const filePath = path.join(process.cwd(), './uploads/pdf', fileName);

      res.sendFile(filePath, (err) => {
        if (err) {
          return sendError(res, 404, ['Arquivo não foi encontrado']);
        }
      });

    } catch (err) {
      return sendError(res, 500, "Ocorreu um erro interno no servidor!");

    }
  };
  static deletar = async (req, res) => {
    try {

      const id = { id: parseInt(req.params.id) };

      const aulaDeletada = await AulaService.deletar(id);

      return sendResponse(res, 200, { data: aulaDeletada } );

    } catch (err) {

      if (err instanceof ZodError) {
        return sendError(res, 400, err.errors[0].message);

      } else if (err.message == "Nenhuma aula encontrada.") {
        return sendError(res, 404, ["Nenhuma aula encontrada."]);

      } else {
        return sendError(res, 500, "Ocorreu um erro interno no servidor!");
      }
    }
  };
}

export default AulaController;
