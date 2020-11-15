const config = require('config')
const moment = require('moment')
const uploadRede = require('./upload-rede.controller')
const uploadViagem = require('./upload-viagem.controller')

exports.importfile = async function (req, res) {

    if (!req.files || !req.files.glx || req.files.glx.mimetype != "application/xml") {
        return res.status(config.get('errors.http.file-not-valid.status')).json(config.get('errors.http.file-not-valid.message'))
    }

    const glxFile = req.files.glx
    const fileDir = config.get('glx-files.upload-dir')
    const filename = moment().format('YYYYMMDD_hhmmss') + "." + config.get('glx-files.fileExtension')

    try {
        glxFile.mv(`${fileDir}/${filename}`)
    } catch (e) {
        console.log(e);
        return res.status(config.get('errors.file-system.file-not-saved.status')).json(config.get('errors.file-system.file-not-saved.message'))
    }

    try {
        await uploadRede.start(filename)
        await uploadViagem.start(filename)
    } catch (e) {
        console.log(e);
        return res.status(config.get('errors.import.error-on-upload.status')).json(config.get('errors.import.error-on-upload.message'))
    }

    res.send("Imported started successfully")

}