import 'dotenv/config'
import express, { json } from "express";
import routes from "./routes/index.js";
import cors from "cors"; // permite o fornt-end usar essa api (resumindo)

//instanciando o express
const app = express();

app.use(cors());
// app.use(cors([
//   { origin: ['http://cloud.fslab.dev:8806', 'http://cloud.fslab.dev:8807', 'http://cloud.fslab.dev:8806', 'http://cloud.fslab.dev:8807] },
//   { methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] }
// ])); //  Mude apenas isso: origin: ['http://www.section.io', 'http://www.google.com/']

// habilitando o uso de json pelo express
app.use(express.json());


// Passando para o arquivo de rotas o app, que envia junto uma instância do express
routes(app);

// exportando para o server.js fazer uso
export default app
