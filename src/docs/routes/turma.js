import turmaSchema from "../schemas/turmaSchema.js";
import authSchemas from "../schemas/authSchema.js";
import commonResponses from "../schemas/commonResponses.js";

const turmasRoutes = {
    "/turma": {
        get: {
            tags: ["Turmas"],
            summary: "Lista todas as turmas",
            security: [{ bearerAuth: [] }],
            responses: {
                200: commonResponses[200]("#/components/schemas/TurmaListagem"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                500: commonResponses[500]()
            }
        },
        post: {
            tags: ["Turmas"],
            summary: "Cria uma nova turma",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/TurmaPost"
                        }
                    }
                }
            },
            responses: {
                201: commonResponses[201]("#/components/schemas/TurmaDetalhes"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                500: commonResponses[500]()
            }
        },
    },


    "/turma/matricular": {
        post: {
            tags: ["Turmas"],
            summary: "Insere um usuário em uma turma",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/InserirAluno"
                        }
                    }
                }
            },
            responses: {
                201: commonResponses[201]("#/components/schemas/InserirAlunoDetalhes"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                500: commonResponses[500]()
            }
        },
    },


    "/turma/{id}": {
        get: {
            tags: ["Turmas"],
            summary: "Obtém detalhes de uma turma",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: commonResponses[200]("#/components/schemas/TurmaDetalhes"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                404: commonResponses[404](),
                500: commonResponses[500]()
            }
        },
        patch: {
            tags: ["Turmas"],
            summary: "Atualiza uma turma",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/TurmaDetalhes"
                        }
                    }
                }
            },
            responses: {
                200: commonResponses[200]("#/components/schemas/TurmaDetalhes"),
                400: commonResponses[400](),
                401: commonResponses[401](),
                404: commonResponses[404](),
                500: commonResponses[500]()
            }
        },
        
        delete: {
            tags: ["Turmas"],
            summary: "Deleta uma turma",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: commonResponses[200](),
                400: commonResponses[400](),
                401: commonResponses[401](),
                404: commonResponses[404](),
                500: commonResponses[500]()
            }
        }
    },

    "/turma/remove": {
    delete: {
        tags: ["Turmas"],
        summary: "Remove um usuário de uma turma espcífica",
        security: [{ bearerAuth: [] }],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/InserirAluno"
                    }
                }
            }
        },
        responses: {
            200: commonResponses[200]("#/components/schemas/InserirAlunoDetalhes"),
            400: commonResponses[400](),
            401: commonResponses[401](),
            404: commonResponses[404](),
            500: commonResponses[500]()
        }
    }
}
};

export default turmasRoutes;
