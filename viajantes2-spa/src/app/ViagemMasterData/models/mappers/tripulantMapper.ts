import { TripulantType } from '../../../RedeMasterData/models/tripulant-type';
import { Tripulant, TripulantPost } from '../tripulant';
export class TripulantMapper {
    constructor() { }

    fromFormToCreate = function (formBody: any, object: TripulantPost) {
        object.Name = formBody.name;
        object.BirthDate = formBody.birthDate;
        object.LicenceNr = formBody.licenceNumber;
        object.LicenceExpires = formBody.licenseExpires;
        object.TripulantTypes = [];
        for (let i = 0; i < formBody.tripulantTypes.length; i++){
            
            object.TripulantTypes.push(formBody.tripulantTypes[i]);
        };
        return object;
    }

    fromResponseToDto = function (model: Tripulant, response: any) {
        model.id = response.id;
        model.name = response.Name;
        model.birthDate = response.BirthDate;
        model.licenceNumber = response.LicenceNr;
        model.licenseExpires = response.LicenceExpires;
        for (let i = 0; i < response.TripulantTypes.length; i++) {
            model.tripulantTypes.push(response.TripulantTypes[i]);
        } 
        return model;
    }
}