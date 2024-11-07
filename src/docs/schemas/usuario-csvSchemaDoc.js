const usuarioCsvSchema = {
    createUsuarioCsvRes: {
        type: "object",
        example: {
            "error": false,
            "code": 201,
            "message": "Requisição bem sucedida, recurso foi criado",
            "errors": [],
            "data": [
                {
                    "id": 6,
                    "nome": "bruna",
                    "matricula": 235563,
                    "grupo_id": 1,
                    "active": true
                },
                {
                    "id": 7,
                    "nome": "caslos",
                    "matricula": 244646,
                    "grupo_id": 1,
                    "active": true
                },
                {
                    "id": 8,
                    "nome": "lucas",
                    "matricula": 234234,
                    "grupo_id": 1,
                    "active": true
                }
            ]
        }
    },
    erro404UsuarioCsv: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["Arquivo do tipo errado.", "Estrutura do CSV está incorreta."],
                    data: []
                }
            }
        }
    },
};


export default usuarioCsvSchema;
