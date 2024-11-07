import { query } from "express";
import { get } from "http";
import { request } from "https";

const aulaRoutes = {
    "/aula": {
        get: {
            tags: ["Aula"],
            summary: "Lista aulas de acordo com o filtro ou mostra todas as aulas paginadas.",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "titulo",
                    in: "query",
                    description: "Título da aula.",
                    required: false,
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "modulo_id",
                    in: "query",
                    description: "ID do módulo associado à aula.",
                    required: false,
                    schema: {
                        type: "integer"
                    }
                },
                {
                    name: "aluno_id",
                    in: "query",
                    description: "ID do aluno associado à aula.",
                    required: false,
                    schema: {
                        type: "integer"
                    }
                },
                {
                    name: "page",
                    in: "query",
                    description: "Número da página para paginação (default: 1).",
                    required: false,
                    schema: {
                        type: "integer",
                        default: 1
                    }
                },
                {
                    name: "perPage",
                    in: "query",
                    description: "Número de itens por página (default: 10).",
                    required: false,
                    schema: {
                        type: "integer",
                        default: 10
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Aula(s) encontrada(s) com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/getAllAulaRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Requisição com sintaxe incorreta ou outros problemas.",
                    content: {
                        $ref: "#/components/schemas/erro400aula"
                    }                
                },
                "404": {
                    description: "Nenhuma aula encontrada.",
                    content: {
                        $ref: "#/components/schemas/erro404aula"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        },
        post: {
            tags: ["Aula"],
            summary: "Cria uma aula e salva seus arquivos pdf na api.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                pdf_questoes: {
                                    type: "string",
                                    format: "binary",
                                    description: "Arquivo pdf com as questões."
                                },
                                pdf_resolucao: {
                                    type: "string",
                                    format: "binary",
                                    description: "Arquivo pdf com as respostas."
                                },
                                modulo_id: {
                                    type: "integer",
                                    description: "ID do módulo associado à aula."
                                },
                                titulo: {
                                    type: "string",
                                    description: "título da aula a ser criada."
                                },
                                video: {
                                    type: "string",
                                    description: "link do vídeo da aula."
                                },
                                descricao: {
                                    type: "string",
                                    description: "descrição da aula a ser criada."
                                }
                            },
                            required: ["modulo_id", "titulo", "video", "descricao"]
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Aula criada com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createAulaRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400aula"
                    }                
                },
                "404": {
                    description: "módulo não existe.",
                    content: {
                        $ref: "#/components/schemas/erro404aula"
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
    },
    "/aula/{id}": {  
        get: {
            tags: ["Aula"],
            summary: "Busca uma aula pelo ID.",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID da aula a ser buscada.",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Aula encontrada com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/getAllAulaRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Requisição com sintaxe incorreta ou outros problemas.",
                    content: {
                        $ref: "#/components/schemas/erro400aula"
                    }
                },
                "404": {
                    description: "Nenhuma aula encontrada.",
                    content: {
                        $ref: "#/components/schemas/erro404aula"
                    }
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }
                }
            }
        },
        patch: {
            tags: ["Aula"],
            summary: "Atualiza uma aula pelo ID.",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID da aula a ser buscada.",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                pdf_questoes: {
                                    type: "string",
                                    format: "binary",
                                    description: "Arquivo pdf com as questões."
                                },
                                pdf_resolucao: {
                                    type: "string",
                                    format: "binary",
                                    description: "Arquivo pdf com as respostas."
                                },
                                modulo_id: {
                                    type: "integer",
                                    description: "ID do módulo associado à aula."
                                },
                                titulo: {
                                    type: "string",
                                    description: "título da aula a ser criada."
                                },
                                video: {
                                    type: "string",
                                    description: "link do vídeo da aula."
                                },
                                descricao: {
                                    type: "string",
                                    description: "descrição da aula a ser criada."
                                }
                            },
                        }
                    }
                },
                required: true
            },
            responses: {
                "200": {
                    description: "Aula atualizada com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/updateAulaRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Requisição com sintaxe incorreta ou outros problemas.",
                    content: {
                        $ref: "#/components/schemas/erro400aula"
                    }
                },
                "404": {
                    description: "Nenhuma aula encontrada.",
                    content: {
                        $ref: "#/components/schemas/erro404aula"
                    }
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }
                }
            }
        },
        delete: {
            tags: ["Aula"],
            summary: "Deleta uma aula pelo ID.",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID da aula a ser buscada.",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Aula deletada com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/deleteAulaRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Requisição com sintaxe incorreta ou outros problemas.",
                    content: {
                        $ref: "#/components/schemas/erro400aula"
                    }
                },
                "404": {
                    description: "Nenhuma aula encontrada.",
                    content: {
                        $ref: "#/components/schemas/erro404aula"
                    }
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }
                }
            }
        }
    },
    "/aula/arquivo/{fileName}": {
        get: {
            tags: ["Aula"],
            summary: "busca arquivos pdf na api.",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    required: true,
                    name: "fileName",
                    in: "path",
                    description: "Nome do arquivo que deseja baixar.",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Arquivo enviado com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/getPDF"
                            }
                        }
                    }
                },
                "404": {
                    description: "Arquivo não foi encontrado.",
                    content: {
                        $ref: "#/components/schemas/erro404aula"
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
    },
    "/aula/status": {
        post: {
            tags: ["Aula"],
            summary: "Coloca uma aula com o status de feita para um certo aluno.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                aluno_id: {
                                    type: "integer",
                                    description: "Id do aluno."
                                },
                                aula_id: {
                                    type: "integer",
                                    description: "id da aula."
                                },
                                feito: {
                                    type: "boolean",
                                    description: "status da aula."
                                }
                            },
                            required: ["aluno_id", "aula_id", "feito"]
                        }
                    },
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                aluno_id: {
                                    type: "integer",
                                    description: "Id do aluno."
                                },
                                aula_id: {
                                    type: "integer",
                                    description: "id da aula."
                                },
                                feito: {
                                    type: "boolean",
                                    description: "status da aula."
                                }
                            },
                            required: ["aluno_id", "aula_id", "feito"]
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Aula assistida.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/statusAulaRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400aula"
                    }                
                },
                "404": {
                    description: "Nenhuma aula encontrada.",
                    content: {
                        $ref: "#/components/schemas/erro404aula"
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

export default aulaRoutes;
