import {Request, Response, NextFunction} from 'express'
class ImportGLX {

    importfile(req: Request, res: Response, next: NextFunction = ()=>{}) {
        res.send("ok")
    }
    
    start() {
        
    }

}

export {ImportGLX}