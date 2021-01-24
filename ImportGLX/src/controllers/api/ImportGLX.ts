import {Request, Response, NextFunction} from 'express'
import GlxFileDto from '../../dto/glxFileDto'
import GlxFileMapper from '../../mappers/glxFileMapper'
import StoreGLXService from '../../services/StoreGLXService'
import ImportRMDService from '../../services/ImportRMDService'
import ImportVMDService from '../../services/ImportVMDService'
class ImportGLX {

    async importfile(req: Request, res: Response, next: NextFunction = ()=>{}) {

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
        const importRMDService = new ImportRMDService(dto)
        if(await importRMDService.runService()){
            res.status(503).send("Error importing network")
        }

        //Call Send to VMD Service
        const importVMDService = new ImportVMDService(dto, importRMDService.exportData())
        if(await importVMDService.runService()){
            res.status(503).send("Error importing trips")
        }
        
        res.send("Import done successfully")
    }

}

export {ImportGLX}