import IService from './interface/IService'
import GlxFileDto from '../dto/glxFileDto'
import StoreGlxRepository from '../repository/StoreGlxRepository'
import {config} from 'node-config-ts'
import moment from 'moment'
import logger from '../utils/Logger'
import IDto from '../dto/interface/IDto'

export default class StoreGLXService implements IService {
    
    storeGlxRepository: StoreGlxRepository
    glxDto: GlxFileDto
    filename: String

    constructor(glx: GlxFileDto, repo: StoreGlxRepository = new StoreGlxRepository){
        this.glxDto = glx
        this.filename = this.getFileName()
        this.storeGlxRepository = repo
    }
    exportData(): GlxFileDto {
        return this.glxDto
    }

    runService():boolean{
        this.storeGlxRepository.setFilepath(this.filename)
        this.storeGlxRepository.setGlx(this.glxDto)
        if (!this.storeGlxRepository.save()){
            return false
        }
        new logger().log("File imported sucessfully")
        this.glxDto.filepath = this.filename

        return true
    }

    getFileName(): String{
        return `${moment().format(config.glx_files.fileTimeStampFormat)}.${config.glx_files.fileExtension}`
    }
}