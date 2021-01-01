import IRepository from './interface/IRepository'
import GlxFileDto from '../dto/glxFileDto'
import {config} from 'node-config-ts'
import {promisify} from 'util'
import xml2js from 'xml2js'
import path from 'path'
import fs from 'fs'

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
        try {
            this.glxDto.glx.mv(this.setFinalPath())
            return true
        } catch (e) {
            console.log(e)
            return false
        }

    }

    async load(){
        const parser = new xml2js.Parser
        try {
            const data = await fs.promises.readFile(this.filepath as string)
            const result = await promisify(parser.parseString)(data)
            return result
        }
        catch(err) {
            console.log(err)
        }
    }

    private setFinalPath(): string{
        return path.join(path.resolve('./'), this.filepath as string)
    }
}