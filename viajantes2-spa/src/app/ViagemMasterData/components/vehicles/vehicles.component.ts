import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from '../../models/vehicles';
import { VehiclesService } from '../../services/vehicles.service';
import { VehicleTypeService } from '../../../RedeMasterData/services/vehicle-type.service';
import { VehicleMapper } from '../../models/mappers/vehicles'
import { VehicleType } from '../../../RedeMasterData/models/vehicle-type';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  providers: [VehicleMapper]
})
export class VehiclesComponent implements OnInit {

  vehicleList: Vehicle[] = [];
  vehicleTypesList: VehicleType[] = [];
  displayedColumns: string[] = ['licencePlate','vin','vehicleType','startDate'];
  dataSource = new MatTableDataSource<Vehicle>();

  formControl = new FormControl('', [
    Validators.required,
  ]);

  vehicleForm = new FormGroup ({
    licencePlate: new FormControl(),
    vin: new FormControl(),
    vehicleType: new FormControl(),
    startDate: new FormControl()
  });

  isAdding: boolean = false;
  hasError: boolean = false;
  errorMessages: any[] = [];

  constructor(
    private vehicleMapper: VehicleMapper,
    private vehiclesService: VehiclesService,
    private vehicleTypeService: VehicleTypeService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  applyFilter(event: Event) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setAdd() : any {
    this.vehicleForm.reset();
    this.hasError = false;
    return this.isAdding = !this.isAdding;
  }

  getVehicles(){
    this.vehiclesService.getVehicles().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          data.forEach(v => this.vehicleList.push(this.vehicleMapper.fromResponseToDto(new Vehicle(), v)))
          this.dataSource = new MatTableDataSource(this.vehicleList);
          this.getVehicleTypes()
        };
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
    var postEntity = new Vehicle();
    this.errorMessages = [];

    postEntity = this.vehicleMapper.fromFormToDTO(this.vehicleForm.value, new Vehicle)

    console.log(postEntity)

    this.vehiclesService.postVehicle(postEntity)
    .subscribe(
      (data) => {
        if (data) { 
          this.vehicleList.push(data); 
          this.getVehicleTypes()
          // this.showDetails.push(false);
            this.isAdding = !this.isAdding;
        }
      },
      (error) => { 
        this.hasError = true;
        if (error.error != null && error.error.code == null && error.error.message == null) {
          console.error("This model does not have Business Validations.");
        } else {
          this.errorMessages.push("Error Submiting the Vehicle.");
        }
      }
    )
  }
}
