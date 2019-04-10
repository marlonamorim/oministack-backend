const File = require('../models/File')
const Box = require('../models/Box')

class FileController {
    async store(req, res) {
        const box = await Box.findById(req.params.id)

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        })

        box.files.push(file)
        await box.save()

        //Emite um evento com o parâmetro 'file', afim de informar
        //a todas as requisições que estejam escutando via socket, recebam
        //a informação
        req.io.sockets.in(box._id).emit('file', file)

        return res.json(file)
    }
}

module.exports = new FileController()