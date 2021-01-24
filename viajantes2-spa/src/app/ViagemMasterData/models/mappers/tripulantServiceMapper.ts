import { TripulantServices, TripulantServicePost } from '../tripulantServices';
import { Tripulant } from '../tripulant';
import { TripulantMapper } from './tripulantMapper';

export class TripulantServiceMapper {
    constructor() { }

    fromResponseToDto = function (model: TripulantServices, response: any, tripulantList: Tripulant[]) {

        var tripulant = new Tripulant();
        for (let index = 0; index < tripulantList.length; index++) {
            if (tripulantList[index].id.toUpperCase() == response.tripulantId.toUpperCase()) {
                tripulant = tripulantList[index];
            }
        }
        
        model.id = response.id;
        model.tripulant = tripulant;
        model.date = response.date;

        return model;
    }

    fromResponseFullToDTO = function ( model: TripulantServices, response: any) {
        var tripulantMapper = new TripulantMapper();
        model.id = response.id;
        model.date = response.date;
        model.tripulant = tripulantMapper.fromNotExpandDTO(new Tripulant(), response.tripulant);
        return model;
    }
 fromFormToCreate = function (formBody: any, object: TripulantServicePost) {
    object.TripulantId = formBody.tripulantId;
    object.Date = formBody.date
    return object;
}
}