const Box = require('../models/Box')

class BoxController {
    async store(req, res) {
        const box = await Box.create({ title: req.body.title })
        return res.json(box)
    }

    async show(req, res) {
        //Método populate, retorna os dados do relacionamento informado,
        //'files' no exemplo e a ordenação de forma decrescente do relacionamento(-1)
        const box = await Box.findById(req.params.id)
        .populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        })
        return res.json(box)
    }
}

module.exports = new BoxController()