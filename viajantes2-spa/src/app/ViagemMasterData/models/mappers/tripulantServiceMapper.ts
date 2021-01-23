import { TripulantService, TripulantServicePost } from '../tripulantServices';
import { Tripulant } from '../tripulant';

export class TripulantServiceMapper {
    constructor() { }

    fromResponseToDto = function (model: TripulantService, response: any, tripulantList: Tripulant[]) {

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


 fromFormToCreate = function (formBody: any, object: TripulantServicePost) {
    object.TripulantId = formBody.tripulantId;
    object.Date = formBody.date
    return object;
}
}