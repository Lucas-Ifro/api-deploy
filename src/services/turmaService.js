import turmaRepository from "../repositories/turmaRepository.js";
import 'dotenv/config';
import TurmaSchema from "../schemas/turmaSchemas.js";

class turmaService {
    static async listar(filtro) { 
      const filtroValidated = TurmaSchema.listarSchema.parse(filtro)
      const consulta = turmaRepository.constructFilters(filtroValidated)
      const busca = await turmaRepository.listar(consulta)
      if (!busca) {
          throw new Error("nenhuma turma foi encontrada.");
      }
      return busca
  };

  static  async listarPorId(id) {
    const parsedIdSchema = TurmaSchema.listarPoIdSchema.parse({id:id});
    const consulta = turmaRepository.constructFilters(parsedIdSchema)
    const response = await turmaRepository.listarPorId(consulta);
    if (!response) {
        throw new Error("nenhuma turma foi encontrada.");
    }
    return response
};
  
static async atualizarTurma(id,data) {
    const parametro = TurmaSchema.atualizarSchema.parse(data);

    const {nome} = parametro;

    const parsedIdSchema = TurmaSchema.listarPoIdSchema.parse({id:id});
    const consulta = turmaRepository.constructFilters(parsedIdSchema)
    const turmaExist = await turmaRepository.listarPorId(consulta);

    if (turmaExist== null) {
        throw new Error("O recurso solicitado não foi encontrado no servidor.");
    }

    let atualizacao = {
        where: { id: id },
        data: {
          nome:nome
        },
        select: {
        id: true,          
        nome:true
        }
    };

    return await turmaRepository.atualizar(atualizacao);
}

}
export default turmaService;
