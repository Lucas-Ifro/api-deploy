import { prisma } from "../configs/prismaClient.js";

class turmaRepository {

  static async listar(filtro) {
    return await prisma.turma.findMany(filtro);
};

static async listarPorId(filtro) {
  return await prisma.turma.findUnique(filtro);
};

   static async atualizar(data){
    return await prisma.turma.update(data);
  };

static constructFilters(parametros) {
  let filtro = {
      where: {
          ...(parametros.id != undefined && { id: parametros.id }),
          ...(parametros.nome && { nome: { contains: parametros.nome } }), // Filtro para o nome da turma
          ...(parametros.aluno_id != undefined && { aluno: { some: { id: parametros.aluno_id } } }), // Filtro para aluno relacionado
          ...(parametros.professor_id != undefined && { professor: { some: { id: parametros.professor_id } } }) // Filtro para professor relacionado
      },
      select: {
          id: true,          // Incluir o ID da turma na consulta
          nome: true,        // Incluir o nome da turma na consulta
      }
  };
  return filtro;
}

}
export default turmaRepository;
