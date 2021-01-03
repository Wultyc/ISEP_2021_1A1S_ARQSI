import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VehiclesService } from '../../services/vehicles.service';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { VehicleServiceMapper } from '../../models/mappers/vehicleServiceMapper';
import { VehicleServicePost } from '../../models/vehicleServices';
import { Vehicle } from '../../models/vehicles';
import { VehicleMapper } from '../../models/mappers/vehicles';
import { MatDialog } from '@angular/material/dialog';
import { VehicleTypeService } from '../../../RedeMasterData/services/vehicle-type.service';
import { VehicleType } from '../../../RedeMasterData/models/vehicle-type';

@Component({
  selector: 'app-vehicle-service',
  templateUrl: './vehicle-service.component.html',
  styleUrls: ['./vehicle-service.component.css'],
  providers: [VehicleServiceMapper, VehicleMapper]
})
export class VehicleServiceComponent implements OnInit {

  vehicleList: Vehicle[] = [];
  vehicleTypesList: VehicleType[] = [];
  vehicleServiceForm = new FormGroup ({
    vehicleId: new FormControl(),
    date: new FormControl(new Date())
  });
  
  isAdding: boolean = false;
  hasError: boolean = false;
  errorMessages: any[] = [];
  hasSubmited: boolean = false;
  submitMessages: any[] = [];

  constructor(
    private vehicleServiceMapper: VehicleServiceMapper,
    private vehiclesService: VehiclesService,
    private vehicleTypeService: VehicleTypeService,
    private vehicleMapper: VehicleMapper,
    private vehicleServiceService: VehicleServiceService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(){
    this.vehiclesService.getVehicles().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          data.forEach(v => this.vehicleList.push(this.vehicleMapper.fromResponseToDto(new Vehicle(), v)))
        };
        this.getVehicleTypes();
      }
    ); 
  }
  getVehicleTypes(){
    this.vehicleTypeService.getVehicleTypes().subscribe(
      (data) => {
        this.vehicleTypesList = data
        this.vehicleList = this.vehicleMapper.addVehicleTypes(this.vehicleList, this.vehicleTypesList)
      }
    ); 
  }

  submit() :void {
    var postEntity = new VehicleServicePost();
    this.errorMessages = [];
    this.submitMessages = [];

    this.vehicleServiceForm.value.startDate = new Date(this.vehicleServiceForm.value.date.valueOf() - this.vehicleServiceForm.value.date.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, ''); 
    console.log(this.vehicleServiceForm.value)
    postEntity = this.vehicleServiceMapper.fromFormToCreate(this.vehicleServiceForm.value, new VehicleServicePost)

    this.vehicleServiceService.postVehicle(postEntity)
    .subscribe(
      (data) => {
        if (data) { 
          //this.vehicleServiceList.push(data);
          // this.showDetails.push(false);
          this.isAdding = !this.isAdding;
        }
        this.hasSubmited = true;
        this.submitMessages.push("Vehicle Service was submited.");
      },
      (error) => { 
        this.hasError = true;
        this.errorMessages.push("Error Submiting the Vehicle Service.");
        if (error.error != null && error.error.title != null && error.error.message == null) {
          this.errorMessages.push(error.error.title);
        }   
      }
    )
  }

}
