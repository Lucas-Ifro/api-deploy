const usuarioCsvRoutes = {
    "/usuario/csv": {
        post: {
            tags: ["Usuário/csv"],
            summary: "Cria varias contas de usuarios ao mesmo tempo utilizando um arquivo csv.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                "file-csv": {
                                    type: "string",
                                    format: "binary",
                                    description: "Arquivo csv com os dados dos usuários."
                                },
                            },
                            required: ["file-csv"]
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Usuarios criados com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createUsuarioCsvRes"
                            }
                        }
                    }
                },
                "404": {
                    description: "Arquivo do tipo errado ou Estrutura do CSV está incorreta.",
                    content: {
                        $ref: "#/components/schemas/erro404UsuarioCsv"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        }
    }
};

export default usuarioCsvRoutes