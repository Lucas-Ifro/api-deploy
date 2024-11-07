const aulaSchema = {
    getAllAulaRes: {
        type: "object",
        example: {
            "error": false,
            "code": 200,
            "message": "Requisição bem sucedida.",
            "errors": [],
            "data": {
              "id": 1,
              "modulo_id": 1,
              "titulo": "string",
              "video": "https://www.youtube.com/watch?v=glcIXLQ7SAI",
              "pdf_questoes": "597_E-book.pdf",
              "pdf_resolucao": "45_dados.pdf",
              "descricao": "string"
            }
          }
    },
    updateAulaRes: {
        type: "object",
        example: {
            "error": false,
            "code": 200,
            "message": "Aula atualizada com sucesso.",
            "errors": [],
            "data": {
              "id": 1,
              "modulo_id": 1,
              "titulo": "string",
              "video": "https://www.youtube.com/watch?v=glcIXLQ7SAI",
              "pdf_questoes": "597_E-book.pdf",
              "pdf_resolucao": "45_dados.pdf",
              "descricao": "string"
            }
          }
    },
    deleteAulaRes: {
        type: "object",
        example: {
            "error": false,
            "code": 200,
            "message": "Aula deletada com sucesso.",
            "errors": [],
            "data": {
              "id": 1,
              "modulo_id": 1,
              "titulo": "string",
              "video": "https://www.youtube.com/watch?v=glcIXLQ7SAI",
              "pdf_questoes": "597_E-book.pdf",
              "pdf_resolucao": "45_dados.pdf",
              "descricao": "string"
            }
          }
    },
    statusAulaRes: {
        type: "object",
        example: {
            "error": false,
            "code": 201,
            "message": "Aula assistida.",
            "errors": [],
            "data": {
              "id": 1,
              "aluno_id": 1,
              "aula_id":4,
              "feito":true
            }
          }
    },
    createAulaRes: {
        type: "object",
        example: {
            "error": false,
            "code": 201,
            "message": "Requisição bem sucedida, recurso foi criado",
            "errors": [],
            "data": {
              "id": 25,
              "modulo_id": 1,
              "titulo": "string",
              "video": "https://www.youtube.com/watch?v=glcIXLQ7SAI",
              "pdf_questoes": "597_E-book.pdf",
              "pdf_resolucao": "45_dados.pdf",
              "descricao": "string"
            }
          }
    },

    getPDF: {
        type: "object",
        example: {
            "error": false,
            "code": 201,
            "message": "Requisição bem sucedida, recurso foi criado",
            "errors": [],
            "data": "Arquivo PDF."
            
        }
    },

    // erros
    erro400aula: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 400,
                    message: "Requisição com sintaxe incorreta ou outros problemas.",
                    errors: [],
                    data: []
                }
            }
        }
    },

    erro404aula: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["O modulo informado não existe.", 'Arquivo não foi encontrado','Nenhuma aula encontrada.'],
                    data: []
                }
            }
        }
    },
};


export default aulaSchema;
