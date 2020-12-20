import {Request, Response, NextFunction} from 'express'
import GlxFileDto from '../../dto/glxFileDto'
import GlxFileMapper from '../../mappers/glxFileMapper'
import moment from 'moment';
import {config} from 'node-config-ts'
class ImportGLX {

    importfile(req: Request, res: Response, next: NextFunction = ()=>{}) {

        if (!req.files || !req.files.glx /*|| (req.files.glx.mimetype != "text/xml" && req.files.glx.mimetype != "application/xml")*/) {
            return res.status(400).json("A valid .glx file is required")
        }
    
        const map: GlxFileMapper = new GlxFileMapper;
        const dto: GlxFileDto = map.mapFromRequest(req, new GlxFileDto)

        /* const glxFile = req.files.glx
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
        } */
    
        res.send("Import started successfully")
    }
    
    start() {
        
    }

}

export {ImportGLX}