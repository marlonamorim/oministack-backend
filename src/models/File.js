const mongoose = require('mongoose')

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, {
        timestamps: true,
        //Propriedades são necessárias, afim de externar os métodos virtuais
        //declarados abaixo(File.virtual('url'))
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    })

File.virtual('url').get(function () {
    const baseUrl = process.env.URL || 'http://localhost:3333';
    return `${baseUrl}/files/${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model('File', File)