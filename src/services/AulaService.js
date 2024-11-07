import AulaRepository from "../repositories/AulaRepository.js";
import AulaSchema from "../schemas/AulaSchemas.js";

class AulaService {

  static async listar(parametros) {
    const parametrosValidados = AulaSchema.listarSchema.parse(parametros);
    const { page, perPage } = parametrosValidados;
    const offset = (page - 1) * perPage;
        
    if (parametrosValidados.titulo || parametrosValidados.modulo_id) {
        const filtroRepository = AulaRepository.createFilterAula(parametrosValidados);
        const aulas = await AulaRepository.findAllAulas({
        ...filtroRepository,
      skip: offset,
      take: perPage
      });
        if (aulas.length === 0) {
            throw new Error("Nenhuma aula encontrada.");
        }
        return aulas;
    }

    if (parametrosValidados.aluno_id) {
        const filtroRepository = AulaRepository.createFilterFeito(parametrosValidados);
        const aulasFeitasRevisadas = await AulaRepository.findAllFeitos({
        ...filtroRepository,
        skip: offset,
        take: perPage
        });
        if (aulasFeitasRevisadas.length === 0) {
            throw new Error("Nenhuma aula encontrada.");
        }
        return aulasFeitasRevisadas;
    }

    const todasAsAulas = await AulaRepository.findAllAulas({
    skip: offset,
    take: perPage
    });
    if (todasAsAulas.length === 0) {
        throw new Error("Nenhuma aula encontrada.");
    }
    return todasAsAulas;
}

  static async listarPorID(idDoParam) {
    const IdValidado = AulaSchema.listarPorIdSchema.parse(idDoParam);
    
    const filtroDoRepository = AulaRepository.createFilterAula({ id: IdValidado.id });
    const aula = await AulaRepository.filtrarPorId(filtroDoRepository);
    
    if (!aula) {
      throw new Error("Nenhuma aula encontrada.");
    }
    return aula;
  }

  static async atualizar(parametros) {
    
    const parametrosValidados = AulaSchema.UpdateSchema.parse(parametros);
  
    const { id, modulo_id, titulo, video, pdf_questoes, pdf_resolucao, descricao } = parametrosValidados;
    
    const aulaExist = await AulaRepository.buscarPorId(id);

    if (!aulaExist) {
      throw new Error("Nenhuma aula encontrada.");
    }

    const filtro = {
      where: { id: id },
      data: {
        modulo_id: modulo_id,
        titulo: titulo,
        video: video,
        pdf_questoes: pdf_questoes,
        pdf_resolucao: pdf_resolucao,
        descricao: descricao
      },
      select: {
        id: true,
        modulo_id: true,
        titulo: true,
        video: true,
        pdf_questoes: true,
        pdf_resolucao: true,
        descricao: true
      }
    };

    return await AulaRepository.update(filtro);
  }

  static async create(parametros) {
    const insert = AulaSchema.schemaInsert.parse(parametros);

    const modulo = await AulaRepository.modulo_exist(insert.modulo_id);
    if (!modulo) {
      throw new Error("O modulo informado não existe.");
    }

    const AulaCriada = await AulaRepository.create(insert);
    return AulaCriada;
  }

  static async feito_status(parametros) {

    const parametrosValidados = AulaSchema.feito_status.parse(parametros);
    
    const feito = await AulaRepository.buscarFeito(parametrosValidados);
    
    if (feito) {
      throw new Error("A aula já foi assistida.");
    }

    const AulaCriada = await AulaRepository.feito(parametrosValidados);
    
    return AulaCriada;
  }

  static async deletar(idDoParam) {
    const IdValidado = AulaSchema.Delet.parse(idDoParam);
    
    const filtroDoRepository = AulaRepository.createFilterAula({ id: IdValidado.id });
    const aulaExists = await AulaRepository.filtrarPorId(filtroDoRepository);
    
    if (!aulaExists) {
      throw new Error("Nenhuma aula encontrada.");
    };
    const aulaDeletada = await AulaRepository.delete(aulaExists.id)
    
    return aulaDeletada;
  }
}

export default AulaService;
