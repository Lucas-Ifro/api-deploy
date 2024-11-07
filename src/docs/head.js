const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "UserManager",
        description: "API para controlar usuários, grupos, unidades e rotas",
        version: "0.0.1",
        termsOfService: "http://localhost:3030",
        contact: {
          name: "USER Manangers",
          email: "fslab@fslab.dev",
          url: "fslab.dev"
        },
        license: {
          name: "Lincença: GPLv3",
          url: "http://www.gnu.org/licenses/gpl-3.0.html"
        }
      },
      externalDocs: {
        description: "Documentação detalhada",
        url: "http://docs.api.fslab.dev"
      },
      servers: [
        {
          url: process.env.URL1_API,
          description: "API em desenvovlvimento no FSLAB"
        },
        {
          url: process.env.URL2_API,
          description: "API em desenvovlvimento no FSLAB"
        }
      ],
      tags: [
        {
          name: "Login",
          description: "Login do usuário"
        },
        {
          name: "Users",
          description: "Usuários do sistema"
        },
        {
          name: "Grupos",
        description: "Grupos de acesso as rotas"
        },
        {
          name: "Rotas",
          description: "Rotas de acesso aos recursos"
        },
        {
          name: "Unidades",
          description: "Unidades do sistema (Órgão, Cidade, Prefeitura, Câmara, etc)"
        },
        {
          name: "Recuperar Senha",
          description: "Recuperação de senha do usuário"
        },
        {
          name: "Alterar Senha",
          description: "Alteração de senha do usuário"
        },
        {
          name: "Sessao",
          description: "Sessão do usuário"
        },
        {
          name: "Permissão",
          description: "Permissão de acesso a rota"
        },
        {
          name: "Autorização",
          description: "Autorização de acesso a rota" 
        }
      ],
      paths: {},
      components: {
        securitySchemes:{
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    },
    apis: ["./src/routes/*.js"]
  };
  
  export default swaggerOptions;
