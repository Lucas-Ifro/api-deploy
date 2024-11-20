import express from "express";
import users from "./UsuarioRoutes.js";
import login from "./loginRoute.js";
import turma from "./TurmaRoutes.js";
import aula from "./AulaRoute.js";
import modulo from "./ModuloRoutes.js"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import getSwaggerOptions from "../docs/config/head.js";

const routes = (app) => {

    app.get("/", (req, res) => {
        res.status(200).redirect("/docs"); 
    });

    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(getSwaggerOptions()), {
        customCssUrl: [
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css"
          ],
          customJsUrl: [
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"
          ],
        customSiteTitle: "API plataforma de Matematica", // Personalizando o título da página de documentação
    }));

    app.use(
        express.json(),
        express.text(),
        // rotas para autentição e autorização (permissão)
        login,
        turma,
        aula,
        users,
        modulo

    );

    // Se não é nenhuma rota válida, produz 404
    app.use((req, res, next) => {
        res.status(404).json({ message: "Rota não encontrada" });
    });
};

export default routes;
