import {Request, Response, NextFunction} from 'express'
import GlxFileDto from '../../dto/glxFileDto'
import GlxFileMapper from '../../mappers/glxFileMapper'
import StoreGLXService from '../../services/StoreGLXService'
class ImportGLX {

    importfile(req: Request, res: Response, next: NextFunction = ()=>{}) {

        if (!req.files || !req.files.glx /*|| (req.files.glx.mimetype != "text/xml" && req.files.glx.mimetype != "application/xml")*/) {
            return res.status(400).json("A valid .glx file is required")
        }
    
        const map: GlxFileMapper = new GlxFileMapper;
        const dto: GlxFileDto = map.mapFromRequest(req, new GlxFileDto)

        //Call Store GLX Service
        const storeGlxService:StoreGLXService = new StoreGLXService(dto)
        if(!storeGlxService.runService()){
            res.status(503).send("Error saving the file")
        }

        //Call Send to RMD Service

        //Call Send to VMD Service

        /*
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