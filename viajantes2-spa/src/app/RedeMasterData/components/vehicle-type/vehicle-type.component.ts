import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {VehicleType} from '../../models/vehicle-type';
import {VehicleTypeService} from '../../services/vehicle-type.service'
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup, FormControlDirective} from '@angular/forms';
import { VehicleTypeMapper } from '../../models/mappers/vehicleTypeMapper';

export interface fuel {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {
  
  // list
  vehicleTypeList: VehicleType[] = [];
  displayedColumns: string[] = ['description', 'autonomy', 'costPerKilometer', 'averageCost', 'averageSpeed', 'fuelType' ];
  dataSource = new MatTableDataSource<VehicleType>();
  
  mapper = new VehicleTypeMapper();

  formControl = new FormControl('', [
    Validators.required,
 ]);

 fuels: fuel[] = [
  {value: 'Gasoleo', viewValue: 'Gasoleo'},
  {value: 'GPL', viewValue: 'GPL'},
  {value: 'Hidrogenio', viewValue: 'Hidrogenio'},
  {value: 'Eletrico', viewValue: 'Eletrico'},
  {value: 'Gasolina', viewValue: 'Gasolina'}
];


 vehicleTypeForm = new FormGroup ({
   description: new FormControl(),
   autonomy: new FormControl(),
   costPerKilometer: new FormControl(), 
   averageCost: new FormControl(),
   averageSpeed: new FormControl(),
   fuel:  new FormControl()
  });

 isAdding: boolean = false;
 hasError: boolean = false;
 errorMessages: any[] = [];

  constructor(private vehicleTypeService: VehicleTypeService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getVehicleTypes();
  }

  applyFilter(event: Event) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setAdd() : any {
    this.vehicleTypeForm.reset();
    this.hasError = false;
    return this.isAdding = !this.isAdding;  
  }

  getVehicleTypes() : void {
    this.vehicleTypeService.getVehicleTypes().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          for (let i = 0; i < data.length; i ++){              
            this.vehicleTypeList.push(this.mapper.fromResponseToDto(new VehicleType() as VehicleType, data[i]));
            };
          this.dataSource = new MatTableDataSource(this.vehicleTypeList);       
        };          
      }       
    ); 
  };

  submit() :void {
    var postEntity = new VehicleType();
    this.errorMessages = [];
    postEntity = this.mapper.fromFormToDTO(this.vehicleTypeForm.value, postEntity)
    this.vehicleTypeService.postVehicleType(postEntity)
    .subscribe(
      (data) => {
        if (data) { 
          this.vehicleTypeList.push(data); 
          this.dataSource = new MatTableDataSource(this.vehicleTypeList);          
          // this.showDetails.push(false);
          this.isAdding = !this.isAdding;
        }
      },
      (error) => { 
        this.hasError = true;
        if (error.error != null && error.error.code == null && error.error.message == null) {
          console.error("This model does not have Business Validations.");
        } else {
          this.errorMessages.push("Error Submiting the Vehicle Type. " +
            "If no field is empty, there may already exist a Vehicle with the description introduced.");
        }
      }        
    )
  }
}
