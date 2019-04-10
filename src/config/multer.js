const path = require('path')
const crypto = require('crypto')

const multer = require('multer')

module.exports = {
    //Config afim de informar um local onde será armazenado as arquivos
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            //Função de callback, retorna nulo para algum possível erro e o destino
            //do armazenamento do arquivo
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
        },
        filename: (req, file, cb) => {
            //É gerado um array de bytes com 16 posições hexadecimais
            //afim de tornar o nome do arquivo único
            crypto.randomBytes(16, (err, hash) => {
                //Caso ocorra algum erro na geração do hash
                //é retornado o erro
                if(err) cb(err)

                file.key = `${hash.toString('hex')}-${file.originalname}`
                //Retorna nulo para algum possível erro e a chave do arquivo
                cb(null, file.key)
            })
        }
    })
}