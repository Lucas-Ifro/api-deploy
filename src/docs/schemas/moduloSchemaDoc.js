const moduloSchema = {
    createcsvRes: {
        type: "object",
        example: {
            "error": false,
            "code": 201,
            "message": "Requisição bem sucedida, recurso foi criado",
            "errors": [],
            "data": {
                "id": 17,
                "turma_id": 1,
                "titulo": "tese",
                "descricao": "Descrição do Módulo 1 do 1º Ano",
                "image": "http://localhost:3051/imagens/565_teste.png"
            }
        }
    },

    // erros
    erro400csv: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 400,
                    message: "Requisição com sintaxe incorreta ou outros problemas.",
                    errors: ["Arquivo não é uma imagem."],
                    data: []
                }
            }
        }
    },

    erro404csv: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["A turma informada não existe."],
                    data: []
                }
            }
        }
    },

    erro500: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 500,
                    message: "Servidor encontrou um erro interno.",
                    errors: ["OCORREU UM ERRO INTERNO"],
                    data: []
                }
            }
        }
    },
};


export default moduloSchema;
