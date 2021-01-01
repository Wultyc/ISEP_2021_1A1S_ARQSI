import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TripulantType } from '../../../RedeMasterData/models/tripulant-type';
import { TripulantMapper } from '../../models/mappers/tripulantMapper';
import { Tripulant, TripulantPost } from '../../models/tripulant';
import { TripulantService } from '../../services/tripulant.service';
import { TripulantTypeService } from '../../../RedeMasterData/services/tripulant-type.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-tripulant',
  templateUrl: './tripulant.component.html',
  styleUrls: ['./tripulant.component.css'],
  providers: [TripulantMapper,
]
})
export class TripulantComponent implements OnInit {

  tripulantList: Tripulant[] = [];
  tripulantTypeList: TripulantType[] = [];
  displayedColumns: string[] = ['Name','BirthDate','LicenceNr','LicenseExpires', 'TripulantTypes'];
  dataSource = new MatTableDataSource<Tripulant>();

  formControl = new FormControl('', [
    Validators.required,
  ]);

  tripulantForm = new FormGroup ({
    name: new FormControl(),
    birthDate: new FormControl(new Date()),
    licenseNumber: new FormControl(),
    licenseExpires: new FormControl(new Date()),
    tripulantTypes: new FormControl()
  });

  isAdding: boolean = false;
  hasError: boolean = false;
  errorMessages: any[] = [];
  constructor(
    private tripulantMapper: TripulantMapper,
    private tripulantService: TripulantService,
    private tripulantTypeService: TripulantTypeService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getTripulantTypes();

  }

  applyFilter(event: Event) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setAdd() : any {
    this.tripulantForm.reset();
    this.hasError = false;
    return this.isAdding = !this.isAdding;
  }

  // getTripulants(){
  //   this.tripulantService.getTripulants().subscribe(
  //     (data) => {
  //       if (data && data.length > 0) { 
  //         data.forEach(v => this.vehicleList.push(this.vehicleMapper.fromResponseToDto(new Vehicle(), v)))
  //         this.dataSource = new MatTableDataSource(this.vehicleList);
  //         this.getVehicleTypes()
  //       };
  //     }
  //   ); 
  // }
  getTripulantTypes(){
    this.tripulantTypeService.getTripulantType().subscribe(
      (data) => {
        this.tripulantTypeList = data
      }
    ); 
  }

  submit() :void {
    // var postEntity = new Vehicle();
    this.errorMessages = [];


    this.tripulantForm.value.birthDate = new Date(this.tripulantForm.value.birthDate.valueOf() - this.tripulantForm.value.birthDate.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, ''); 
    this.tripulantForm.value.licenseExpires = new Date(this.tripulantForm.value.licenseExpires.valueOf() - this.tripulantForm.value.licenseExpires.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, ''); 
    
    var postEntity = this.tripulantMapper.fromFormToCreate(this.tripulantForm.value, new TripulantPost);
  

    console.log(postEntity);

    this.tripulantService.postTripulant(postEntity)
    .subscribe(
      (data) => {
        if (data) { 
          this.tripulantList.push(data); 
          
          // this.showDetails.push(false);
            this.isAdding = !this.isAdding;
        }
      },
      (error) => { 
        this.hasError = true;
          console.error(error);
      }
    )
  }

}
