import { sendError } from "../utils/messages.js";
import path from "path";
import fs from 'fs'
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
import AulaController from "../controllers/AulaController.js"
import express from "express"
const router = express.Router();

import multer from "multer";

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf', // PDF
        'application/msword', // DOC
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo enviado não é suportado. Envie no formato: .PDF, .DOC, .DOCX'));
    }
};

const generateRandomNumber = () => Math.floor(Math.random() * 1000) + 1;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;

        uploadPath = path.join(process.cwd(), './uploads/pdf');

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${generateRandomNumber()}_${file.originalname}`; 
        cb(null, uniqueFilename);
    }
});

const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 } // Limite de 20MB por arquivo
});

/**
 * post, patch e delete é padrão, normal igual já fizeram.
 * 
 * O get normal ele tem que receber na requisição o id do usuario
 * para que? junto com os dados da sala, vc tem que buscar na tabela feito
 * se o usuario já marcou aquela aula com assistida ou para revisar, isso você faz
 * utilizando o id do usuario e da sala.
 * 
 * também deve ser possivel filtrar as aulas pelo titulo
 * 
 * e a rota /aula/status é insersão nessa tabela feito, ela vai receber o id do usuario e da sala 
 * e o boolean do atributo feito ou revisar. vc pega isso e insere na tabela feito.
 * 
 * Isso serve para marcar que uma aula já foi assistida pelo usuario.
*/

router
    router.get("/aula", AulaController.listarAll)
    router.get("/aula/:id",AulaController.listarPorID)
    router.patch('/aula/:id',AulaController.atualizar);
    router.post(
        '/aula',
        upload.fields([{ name: 'pdf_questoes' }, { name: 'pdf_resolucao' }]),
        (err, req, res, next) => {
            if (err.message == "Tipo de arquivo enviado não é suportado. Envie no formato: .PDF, .DOC, .DOCX") {
                return sendError(res,400,[err.message]);
            }
            next();
        },
        AulaController.inserir
    );
    router.post('/aula/status', AulaController.feito_status)//Falta documentar esse
    router.delete('/aula/:id', AulaController.deletar)
    router.get('/aula/arquivo/:fileName', AulaController.buscar_arquivo);

    export default router;