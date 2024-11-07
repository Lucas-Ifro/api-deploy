import usuarioRepository from "../repositories/usuarioRepository.js";
import UsuarioSchema from "../schemas/usuarioSchema.js";
import Stream from "stream";
import csvParser from "csv-parser";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import CSVFileValidator from 'csv-file-validator'
import 'dotenv/config'

dotenv.config();


class UsuarioService {

  static async listarUsuarios(filtros) {
    const validFiltros = UsuarioSchema.listarUsuarios.parse(filtros);
    return await usuarioRepository.listarUsuarios(validFiltros);
}

static async buscarUsuarioPorId(id) {
    UsuarioSchema.buscarUsuarioPorId.parse({ id });
    const usuario = await usuarioRepository.buscarUsuarioPorId(id);
    
    if (!usuario) {
        throw new Error("Usuário não encontrado.");
    }
    
    return usuario;
}

static async criarUsuario(data) {

  const validatedData = UsuarioSchema.criarUsuario.parse(data);
  const grupoExiste = usuarioRepository.buscarGrupoPorId(validatedData.grupo_id)

  if (!grupoExiste) {
    throw new Error("grupo não encontrado.");
  }

  const filtro = usuarioRepository.createFilterUsuario(validatedData)
  const matriculaExist  = await usuarioRepository.buscarUsuarioPorMatricula(filtro)
    console.log(matriculaExist)
  if (matriculaExist) {
    throw new Error("usuario já existe.");
  }
  const filtroRepository = await usuarioRepository.criarUsuario(validatedData)
  return filtroRepository;
};

static async deletarUsuario(id) {

  const UsuarioDeletado = await usuarioRepository.removerDependencias(id);
  
  return UsuarioDeletado;
}



static async atualizar (parametros){
  const parametrosValidos = UsuarioSchema.atualizarUsuario.parse(parametros);
  const { id,nome, matricula, active, senha, grupo_id } = parametrosValidos;
  const usuarioExist = await usuarioRepository.buscarId(id);

  if (usuarioExist.matricula){
    throw new Error("ja existe um usuario com essa matricula")
  }
 

  if(!usuarioExist){
    throw new Error("O recurso solicitado não foi encontrado no servidor.")
  }

  const filtro ={
    where:{ id:id},
    data:{
      nome:nome,
      matricula:matricula,
      active:active,
      senha:senha,
      grupo_id:grupo_id
    },
    select:{
      id:true,
      nome:true,
      matricula:true,
      active:true,
      senha :true,
      grupo_id:true
    }
  };
  
  return await usuarioRepository.atualizarUsuario(filtro);
}


  static async inserir_csv(arquivo) {
    if (arquivo.mimetype != "text/csv") {
      throw new Error("Arquivo do tipo errado.");
    }

    const csvStreamUsuarios = new Stream.PassThrough();
    csvStreamUsuarios.end(arquivo.buffer);

    const config = {
      headers: [
        { name: "nome", inputName: "nome", required: true },
        { name: "matricula", inputName: "matricula", required: true },
        { name: "senha", inputName: "senha", required: true },
      ],
    };

    const csvData = await CSVFileValidator(csvStreamUsuarios, config);
    if (csvData.inValidData.length > 0) {
      throw new Error("Estrutura do CSV está incorreta.");
    }

    const csvStream = new Stream.PassThrough();
    csvStream.end(arquivo.buffer);

    let usuario_existentes = await usuarioRepository.listar_csv();
    const grupo = await usuarioRepository.grupo_alunos();
    const turmas_ids = await usuarioRepository.buscar_turmas();
    console.log(turmas_ids)

    let usuario_csv = [];
    const header = ["nome", "matricula", "senha"];

    await new Promise((resolve, reject) => {
      csvStream
        .pipe(csvParser({ headers: header, separator: ";", skipLines: 1 }))
        .on("data", (row) => {
          const tupula = {
            nome: row["nome"],
            matricula: row["matricula"],
            senha: row["senha"],
          };
          usuario_csv.push(tupula);
        })
        .on("end", () => {
          resolve();
        });
    });

    const novosUsuarios = usuario_csv.filter((usuario) => {
      return !usuario_existentes.some(
        (existente) => existente.matricula === usuario.matricula
      );
    });

    const usuariosParaInserir = await Promise.all(
      novosUsuarios.map(async (usuario) => {
        return {
          nome: usuario.nome,
          matricula: usuario.matricula,
          senha: await bcrypt.hash(usuario.senha, parseInt(process.env.SALT)),
          active: true,
          grupo_id: grupo.id,
        };
      })
    );
    let ids = [];
    let usuario_criados = [];
    await Promise.all(
      usuariosParaInserir.map(async (usuario) => {
        const usuario_criado = await usuarioRepository.inserir_usuarios(
          usuario
        );
        ids.push(usuario_criado.id);
        usuario_criados.push(usuario_criado);
      })
    );

    await Promise.all(
      ids.map(async (usuario) => {
        let insert = [];
        for (const turma of turmas_ids) {
          insert.push({ usuario_id: usuario, turma_id: turma.id });
        }
        await usuarioRepository.inserir_alunos(insert);
      })
    );

    return usuario_criados;
  }
}

export default UsuarioService;