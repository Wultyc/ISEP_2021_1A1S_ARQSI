import IDto from '../dto/interface/IDto'

interface failedData {
    message: String,
    details: any
}

export default class Result {
    data!: IDto | failedData
    isSuccessful!: boolean

    setSuccessful(data: IDto){
        this.isSuccessful = true
        this.data = data 
        Object.freeze(this)
    }
    
    setFailed(message: String, details: any){
        this.isSuccessful = false
        this.data = {message,details}
        Object.freeze(this)
    }

    success(): boolean{
        return this.isSuccessful
    }

    failed(): boolean{
        return !this.isSuccessful
    }

    getData(): IDto | failedData{
        return this.data
    }
}