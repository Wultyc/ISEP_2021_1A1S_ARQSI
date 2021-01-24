import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { VehiclesService } from '../../services/vehicles.service';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { VehicleServiceMapper } from '../../models/mappers/vehicleServiceMapper';
import { VehicleServicePost, VehicleService } from '../../models/vehicleServices';
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
  vehicleServiceList: VehicleService[] = [];
  displayedColumns: string[] = ['date','vin'];
  dataSource = new MatTableDataSource<VehicleService>();
  
  filterForm = new FormGroup ({
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
    this.getVehicleService();
  }
  getVehicleService () {
    this.vehicleServiceService.getVehicleServices().subscribe (
      (data) => {
        if (data && data.length > 0) {
          data.forEach( element => (
            this.vehicleServiceList.push(this.vehicleServiceMapper.fromResponseToExpandedDTO(new VehicleService, element)))
            );
            this.dataSource = new MatTableDataSource(this.vehicleServiceList);

            console.log(this.vehicleServiceList)
        }
      }
    )
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

    
  filter() { 
    let date =  new Date(this.filterForm.value.date.valueOf() - this.filterForm.value.date.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, '');
    let filterYear = new Date(date).getFullYear();
    let filterMonth = new Date(date).getMonth();
    let filterDay = new Date(date).getDate();
    let newTripList: VehicleService[] = [];
    
    this.dataSource = new MatTableDataSource(this.vehicleServiceList.filter(vs => 
                                                                            filterYear == new Date(vs.date).getFullYear() &&
                                                                            filterMonth == new Date(vs.date).getMonth() &&
                                                                            filterDay == new Date(vs.date).getDate()))
  }
  
  closeFilter() {
    this.dataSource = null;
    this.vehicleServiceList = [];
    this.getVehicleService();
    this.filterForm.reset();
  }
 

  setAdd() : any {
    this.vehicleServiceForm.reset();
    this.hasError = false;
    return this.isAdding = !this.isAdding;
  }

  submit() :void {
    var postEntity = new VehicleServicePost();
    this.errorMessages = [];
    this.submitMessages = [];

    this.vehicleServiceForm.value.startDate = new Date(this.vehicleServiceForm.value.date.valueOf() - this.vehicleServiceForm.value.date.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, ''); 
    console.log(this.vehicleServiceForm.value)
    postEntity = this.vehicleServiceMapper.fromFormToCreate(this.vehicleServiceForm.value, new VehicleServicePost)

    this.vehicleServiceService.postVehicleService(postEntity)
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
