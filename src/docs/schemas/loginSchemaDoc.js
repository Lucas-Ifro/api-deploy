const loginSchema = {
    retornoLogin: {
        "application/json": {
            schema: {
            type: "object",
                example: {
                    "error": false,
                    "code": 200,
                    "message": "Requisição bem sucedida.",
                    "errors": [],
                    "data": {
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MX0sImlhdCI6MTczMDIxNDUwMCwiZXhwIjoxNzMwNTYwMTAwfQ.yeWPLCbXH6pCN9HJF3i-lFop8edwsrXNUknSodYc_no",
                        "usuario": {
                            "id": 1,
                            "nome": "professor",
                            "grupo_id": 2,
                            "matricula": 12345,
                            "active": true
                        },
                        "permissoes": [
                            {
                                "id": 5,
                                "rota": "aula/status",
                                "get": false,
                                "post": true,
                                "patch": false,
                                "put": false,
                                "delete": false
                            },
                            {
                                "id": 6,
                                "rota": "usuario/csv",
                                "get": false,
                                "post": true,
                                "patch": false,
                                "put": false,
                                "delete": false
                            },
                            {
                                "id": 7,
                                "rota": "aula",
                                "get": true,
                                "post": true,
                                "patch": true,
                                "put": true,
                                "delete": true
                            },
                            {
                                "id": 8,
                                "rota": "modulo",
                                "get": true,
                                "post": true,
                                "patch": true,
                                "put": true,
                                "delete": true
                            },
                            {
                                "id": 9,
                                "rota": "turma",
                                "get": true,
                                "post": true,
                                "patch": true,
                                "put": true,
                                "delete": true
                            },
                            {
                                "id": 10,
                                "rota": "usuario",
                                "get": true,
                                "post": true,
                                "patch": true,
                                "put": true,
                                "delete": true
                            }
                        ]
                    }
                }
            }
        }
    },

    typeErrorLogin: {
        "application/json": {
            schema: {
            type: "object",
                example: {
                    data: [],
                    error: true,
                    code: 401,
                    message: "Cliente sem credenciais para acessar o recurso solicitado.",
                    errors: [
                        {
                            "message": "Usuario não exite na base de dados verifique se a matricula esta correto!"
                        },
                        {
                            "message": "Senha informada esta incorreta!"
                        }
                    ]
                }
            }
        }
    },
    
    erro500Login: {
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
}

export default loginSchema;
