import authPaths from "../routes/auth.js";
import usersPaths from "../routes/users.js";
import turmaPaths from "../routes/turma.js"
import authSchemas from "../schemas/authSchema.js";
import turmaSchema from "../schemas/turmaSchema.js";
import loginSchema from "../schemas/loginSchemaDoc.js"
import moduloRoutes from "../routes/modulo.js";
import moduloSchema from "../schemas/moduloSchemaDoc.js";
import usuarioCsvRoutes from "../routes/usuario-csv.js";
import usuarioCsvSchema from "../schemas/usuario-csvSchemaDoc.js";
import aulaRoutes from "../routes/aula.js";
import aulaSchema from "../schemas/aulaSchemaDoc.js";

// Função para definir as URLs do servidor dependendo do ambiente
const getServersInCorrectOrder = () => {
    const devUrl = { url: "http://localhost:3051" };
    const prodUrl = { url: "http://localhost:3051" };

    if (process.env.NODE_ENV === "production") return [prodUrl, devUrl];
    else return [devUrl, prodUrl];
};

// Função para obter as opções do Swagger
const getSwaggerOptions = () => {
    return {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "API AUTH SGBD",
                version: "1.0-alpha",
                description: "API AUTH SGBD\n\nÉ necessário autenticar com token JWT antes de utilizar a maioria das rotas, faça isso na rota /login com uma matricula e senha válidas.",
            },
            servers: getServersInCorrectOrder(),
            tags: [
                {
                    name: "Login",
                    description: "Rotas para autenticação"
                },
                {
                    name: "Aula",
                    description: "Rotas para gestão de aulas"
                },
                {
                    name: "Modulo",
                    description: "Rotas para gestão de modulos"
                },
                {
                    name: "Turmas",
                    description: "Rotas para gestão de turmas"
                },
                {
                    name: "Usuários", 
                    description: "Rotas para gestão de usuários"
                },
                {
                    name: "Usuários/csv", 
                    description: "Rotas para gestão de usuários"
                },
            ],
            paths: {
                ...authPaths,
                ...usersPaths,
                ...turmaPaths,
                ...moduloRoutes,
                ...usuarioCsvRoutes,
                ...aulaRoutes,
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                },
                schemas: {
                    ...authSchemas,
                    ...turmaSchema,
                    ... loginSchema,
                    ...moduloSchema,
                    ...usuarioCsvSchema,
                    ...aulaSchema,
                }
            },
            security: [{
                bearerAuth: []
            }]
        },
        apis: ["./src/routes/*.js"]
    };
};

export default getSwaggerOptions;