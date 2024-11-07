const moduloRoutes = {
    "/modulo": {
        post: {
            tags: ["Modulo"],
            summary: "Criar um modulo e salva sua imagem na api",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                imagem: {
                                    type: "string",
                                    format: "binary",
                                    description: "Banner do modulo."
                                },
                                turma_id: {
                                    type: "integer",
                                    description: "ID da turma associado ao modulo."
                                },
                                titulo: {
                                    type: "string",
                                    description: "titulo do modulo a ser criado."
                                },
                                descricao: {
                                    type: "string",
                                    description: "descrição do modulo a ser criado."
                                }
                            },
                            required: ["imagem", "turma_id", "titulo", "descricao"]
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Modulo criado com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createcsvRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400csv"
                    }                
                },
                "404": {
                    description: "turma não existe.",
                    content: {
                        $ref: "#/components/schemas/erro404csv"
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

export default moduloRoutes