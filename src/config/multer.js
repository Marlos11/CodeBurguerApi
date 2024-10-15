/* import { v4 } from "uuid";
import multer from "multer";


import { extname, resolve } from 'path'

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            return callback(null, v4() + extname(file.originalname))
        }

    })
} */


    import { v4 } from "uuid";
import multer from "multer";
import { extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Simulando __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),  // Usando __dirname simulado
        filename: (request, file, callback) => {
            return callback(null, v4() + extname(file.originalname));  // Nome do arquivo com UUID
        }
    })
};
