import IRepository from './interface/IRepository'
import GlxFileDto from '../dto/glxFileDto'
import {config} from 'node-config-ts'
import path from 'path'

export default class StoreGlxRepository implements IRepository{

    glxDto: GlxFileDto = new GlxFileDto
    filepath: String = ""

    setGlx(glxDto: GlxFileDto){
        this.glxDto = glxDto
    }

    setFilepath(filename: String){
        this.filepath = path.join(config.glx_files.upload_dir, filename as string)
    }
    
    save():boolean{
        console.log(this.filepath)
        try {
            this.glxDto.glx.mv(this.setFinalPath())
            return true
        } catch (e) {
            console.log(e)
            return false
        }

    }

    load(){

    }

    private setFinalPath(): string{
        return path.join(__dirname, "..", "..", this.filepath as string)
    }
}