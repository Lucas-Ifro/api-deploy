import { prisma } from "../src/configs/prismaClient.js";
import faker from 'faker-br';
import bcrypt from 'bcryptjs';

async function clearDatabase() {
  try {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
    await prisma.$executeRaw`TRUNCATE TABLE permissoes;`;
    await prisma.$executeRaw`TRUNCATE TABLE rota;`;
    await prisma.$executeRaw`TRUNCATE TABLE grupo;`;
    await prisma.$executeRaw`TRUNCATE TABLE usuario;`;
    await prisma.$executeRaw`TRUNCATE TABLE aluno;`;
    await prisma.$executeRaw`TRUNCATE TABLE aula;`;
    await prisma.$executeRaw`TRUNCATE TABLE modulo;`;
    await prisma.$executeRaw`TRUNCATE TABLE professor;`;
    await prisma.$executeRaw`TRUNCATE TABLE turma;`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
  }
}

async function seedDatabase() {
  try {
    let SALT = parseInt(process.env.SALT);
    let salt = await bcrypt.genSalt(SALT);
    const senhaHash = await bcrypt.hash("senhatest", salt);

    // Inserindo dados na tabela `grupo`
    const grupos = await prisma.grupo.createMany({
        data: [
          { nome: 'alunos' },
          { nome: 'professores' },
        ],
      });
  
      // Inserindo dados na tabela `rota`
      const rotas = await prisma.rota.createMany({
        data: [
          { rota: 'aula', get: true, post: false, patch: false, put: false, delete: false },
          { rota: 'modulo', get: true, post: false, patch: false, put: false, delete: false },
          { rota: 'turma', get: true, post: false, patch: false, put: false, delete: false },
          { rota: 'usuario', get: true, post: false, patch: false, put: false, delete: false },

          { rota: 'aula/status', get: false, post: true, patch: false, put: false, delete: false },

          { rota: 'usuario/csv', get: false, post: true, patch: false, put: false, delete: false },
          { rota: 'aula', get: true, post: true, patch: true, put: true, delete: true },
          { rota: 'modulo', get: true, post: true, patch: true, put: true, delete: true },
          { rota: 'turma', get: true, post: true, patch: true, put: true, delete: true },
          { rota: 'usuario', get: true, post: true, patch: true, put: true, delete: true },
        ],
      });
  
      // Inserindo permissões
      const permissoes = await prisma.permissoes.createMany({
        data: [
          { rota_id: 1, grupo_id: 1 }, // alunos - aula
          { rota_id: 2, grupo_id: 1 }, // alunos - modulo
          { rota_id: 3, grupo_id: 1 }, // alunos - turma
          { rota_id: 4, grupo_id: 1 }, // alunos - usuario
          { rota_id: 5, grupo_id: 1 }, // alunos - aula/status
          
          { rota_id: 5, grupo_id: 2 }, // alunos - aula/status
          { rota_id: 6, grupo_id: 2 }, // professores - aula
          { rota_id: 7, grupo_id: 2 }, // professores - modulo
          { rota_id: 8, grupo_id: 2 }, // professores - turma
          { rota_id: 9, grupo_id: 2 }, // professores - usuario
          { rota_id: 10, grupo_id: 2 }, // professores - usuario
        ],
      });

    // Inserindo dados na tabela `usuario`
    const usuarios = await prisma.usuario.createMany({
      data: [
        { nome: "professor", grupo_id: 2, senha: senhaHash, matricula: "12345", active: true },
        { nome: faker.name.findName(), grupo_id: 1, senha: senhaHash, matricula: "12346", active: true },
        { nome: faker.name.findName(), grupo_id: 1, senha: senhaHash, matricula: "12347", active: false },
        { nome: faker.name.findName(), grupo_id: 1, senha: senhaHash, matricula: "12348", active: true },
        { nome: faker.name.findName(), grupo_id: 1, senha: senhaHash, matricula: "12349", active: true },
      ],
    });

    // Inserindo dados na tabela `turma`
    const turmas = await prisma.turma.createMany({
      data: [
        { nome: '1º Ano' },
        { nome: '2º Ano' },
        { nome: '3º Ano' },
      ],
    });

    // Inserindo dados na tabela `aluno`
    const alunos = await prisma.aluno.createMany({
      data: [
        { usuario_id: 2, turma_id: 1 },
        { usuario_id: 2, turma_id: 2 },
        { usuario_id: 2, turma_id: 3 },
        { usuario_id: 3, turma_id: 1 },
        { usuario_id: 3, turma_id: 2 },
        { usuario_id: 3, turma_id: 3 },
        { usuario_id: 4, turma_id: 1 },
        { usuario_id: 4, turma_id: 2 },
        { usuario_id: 4, turma_id: 3 },
        { usuario_id: 5, turma_id: 1 },
        { usuario_id: 5, turma_id: 2 },
        { usuario_id: 5, turma_id: 3 },
      ],
    });

    // Inserindo dados na tabela `modulo`
    const modulos = await prisma.modulo.createMany({
      data: [
        { turma_id: 1, titulo: 'Módulo 1', descricao: 'Descrição do Módulo 1 do 1º Ano', image:"http://localhost:3051/imagens/teste.png" },
        { turma_id: 1, titulo: 'Módulo 2', descricao: 'Descrição do Módulo 2 do 1º Ano', image:"http://localhost:3051/imagens/teste.png" },
        { turma_id: 2, titulo: 'Módulo 1', descricao: 'Descrição do Módulo 1 do 2º Ano', image:"http://localhost:3051/imagens/teste.png" },
        { turma_id: 2, titulo: 'Módulo 2', descricao: 'Descrição do Módulo 2 do 2º Ano', image:"http://localhost:3051/imagens/teste.png" },
        { turma_id: 3, titulo: 'Módulo 1', descricao: 'Descrição do Módulo 1 do 3º Ano', image:"http://localhost:3051/imagens/teste.png" },
        { turma_id: 3, titulo: 'Módulo 2', descricao: 'Descrição do Módulo 2 do 3º Ano', image:"http://localhost:3051/imagens/teste.png" },
      ],
    });

    // Inserindo dados na tabela `aula`
    const aulas = await prisma.aula.createMany({
      data: [
        { modulo_id: 1, titulo: 'Aula 1.1', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 1.1 do 1º Ano' },
        { modulo_id: 1, titulo: 'Aula 1.2', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 1.2 do 1º Ano' },
        { modulo_id: 2, titulo: 'Aula 2.1', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 2.1 do 1º Ano' },
        { modulo_id: 2, titulo: 'Aula 2.2', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 2.2 do 1º Ano' },
        { modulo_id: 3, titulo: 'Aula 1.1', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 1.1 do 2º Ano' },
        { modulo_id: 3, titulo: 'Aula 1.2', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 1.2 do 2º Ano' },
        { modulo_id: 4, titulo: 'Aula 2.1', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 2.1 do 2º Ano' },
        { modulo_id: 4, titulo: 'Aula 2.2', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 2.2 do 2º Ano' },
        { modulo_id: 5, titulo: 'Aula 1.1', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 1.1 do 3º Ano' },
        { modulo_id: 5, titulo: 'Aula 1.2', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 1.2 do 3º Ano' },
        { modulo_id: 6, titulo: 'Aula 2.1', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 2.1 do 3º Ano' },
        { modulo_id: 6, titulo: 'Aula 2.2', video: faker.internet.url(), pdf_questoes: faker.internet.url(), pdf_resolucao: faker.internet.url(), descricao: 'Descrição da Aula 2.2 do 3º Ano' },
      ],
    });

    // Inserindo dados na tabela `professor`
    const professores = await prisma.professor.createMany({
      data: [
        { usuario_id: 1, turma_id: 1 },
        { usuario_id: 1, turma_id: 2 },
        { usuario_id: 1, turma_id: 3 },
      ],
    });

    console.log('Banco de dados preenchido com sucesso.');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  await clearDatabase();
  await seedDatabase();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
