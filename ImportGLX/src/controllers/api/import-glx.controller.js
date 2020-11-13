const config = require('config')
const moment = require('moment')

exports.importfile = function (req, res) {

    if (!req.files.glx || req.files.glx.mimetype != "application/xml") {
        return res.status(config.get('errors.http.file-not-valid.status')).json(config.get('errors.http.file-not-valid.message'))
    }

    const glxFile = req.files.glx;

    try {
        glxFile.mv(`${config.get('glx-files.upload-dir')}/${moment().format('YYYYMMDD_hhmmss')}.glx.xml`)
    } catch(e){
        console.log(e);
        return res.status(config.get('errors.file-system.file-not-saved.status')).json(config.get('errors.file-system.file-not-saved.message'))
    }

    res.send("ok")

}