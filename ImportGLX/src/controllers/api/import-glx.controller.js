const config = require('config')
const moment = require('moment')
const uploadRede = require('./upload-rede.controller')
const uploadViagem = require('./upload-viagem.controller')

exports.importfile = function (req, res) {

    if (!req.files.glx || req.files.glx.mimetype != "application/xml") {
        return res.status(config.get('errors.http.file-not-valid.status')).json(config.get('errors.http.file-not-valid.message'))
    }

    const glxFile = req.files.glx
    const filename = moment().format('YYYYMMDD_hhmmss')

    try {
        glxFile.mv(`${config.get('glx-files.upload-dir')}/${filename}.glx.xml`)
    } catch (e) {
        console.log(e);
        return res.status(config.get('errors.file-system.file-not-saved.status')).json(config.get('errors.file-system.file-not-saved.message'))
    }

    try {
        uploadRede.start(filename)
        uploadViagem.start(filename)
    } catch (e) {
        console.log(e);
        return res.status(config.get('errors.import.error-on-upload.status')).json(config.get('errors.import.error-on-upload.message'))
    }

    res.send("Data imported successfully")

}