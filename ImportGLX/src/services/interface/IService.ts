import IDto from "../../dto/interface/IDto";

export default interface IService{
    runService():boolean|Promise<boolean>
    exportData():IDto
}