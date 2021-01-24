import { TripulantType } from '../../../RedeMasterData/models/tripulant-type';
import { Tripulant, TripulantPost } from '../tripulant';
export class TripulantMapper {
    constructor() { }

    fromFormToCreate = function (formBody: any, object: TripulantPost) {
        object.Name = formBody.name;
        object.BirthDate = formBody.birthDate;
        object.LicenceNr = formBody.licenseNumber;
        object.LicenceExpires = formBody.licenseExpires;
        object.TripulantTypes = [];
        for (let i = 0; i < formBody.tripulantTypes.length; i++){
            
            object.TripulantTypes.push(formBody.tripulantTypes[i]);
        };
        return object;
    }

    fromResponseToDto = function (model: Tripulant, response: any) {
        model.id = response.id;
        model.name = response.name;
        model.birthDate = response.birthDate;
        model.licenceNumber = response.licenceNr;
        model.licenseExpires = response.licenceExpires;
        for (let i = 0; i < response.tripulantTypes.length; i++) {
            model.tripulantTypes.push(response.tripulantTypes[i]);
        } 
        return model;
    }
    fromNotExpandDTO = function (model: Tripulant, response: any) {
        model.id = response.id;
        model.name = response.name;
        model.birthDate = response.birthDate;
        model.licenceNumber = response.licenceNr;
        model.licenseExpires = response.licenceExpires;
        model.tripulantTypes = [];
        return model;

    }
}