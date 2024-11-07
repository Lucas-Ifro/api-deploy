const turmaSchema = {
    TurmaFiltro: {
        type: "object",
        properties: {
            titulo: {
                type: "string",
                description: "Titulo da Turma"
            },
        }
    },
    
    TurmaListagem: {
        type: "object",
        properties: {
            id: { type: "integer", description: "ID da turma" },
            titulo: { type: "string", description: "Titulo da turma" },
        },
        example: {
            id: 1,
            titulo: "1º série A",
        }
    },

     //Para o update da turma
    TurmaDetalhes: {
        type: "object",
        properties: {
            titulo: { type: "string", description: "Titulo da Turma" },
        },
        example: {
            titulo: "1º série D",
        }
    },

    InserirAlunoDetalhes: {
        type: "object",
        properties: {
            turma_id: { type: "integer", description: "id da turma" },
            usuario_id: { type: "integer", description: "id do aluno" },
        },
        example: {
            turma_id: 1,
            usuario_id: 1,
        }
    },

    //Criação de turma
    TurmaPost: {
        type: "object",
        required: ["id","titulo"],  
        properties: {
            id: { type: "int", description: "ID da turma" },
            titulo: { type: "string", description: "Titulo de turma"},
        },
        example: {
            id: 1,
            titulo: "Turma_Teste",
        }
    },
    TurmaPostResposta: {
        type: "object",
        properties: {
            id: { type: "int", description: "id da turma" },
            titulo: { type: "string", description: "Titulo de turma"},
        },
        example: {
            id: 1,
            titulo: "Turma_Teste",
        }
    },

    //Inserir aluno
    InserirAluno: {
        type: "object",
        required: ["turma_id","usuario_id"],  
        properties: {
            turma_id: { type: "int", description: "id da turma" },
            usuario_id: { type: "int", description: "id do aluno"},
        },
        example: {
            turma_id: 1,
            usuario_id: 1,
        }
    },

    InserirAlunoResposta: {
        type: "object",
        properties: {
            turma_id: { type: "int", description: "id da turma" },
            usuario_id: { type: "int", description: "id do aluno"},
        },
        example: {
            turma_id: 2,
            usuario_id: 2,
        }
    }
    
};

export default turmaSchema;
