import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TripulantType} from '../../models/tripulant-type';
import {TripulantTypeService} from '../../services/tripulant-type.service'
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tripulant-type',
  templateUrl: './tripulant-type.component.html',
  styleUrls: ['./tripulant-type.component.css']
})
export class TripulantTypeComponent implements  OnInit  {

  tripList: TripulantType[] = [];
  displayedColumns: string[] = ['description'];
  dataSource = new MatTableDataSource<TripulantType>();

  formControl = new FormControl('', [
    Validators.required,
  ]);

  tripulantTypeForm = new FormGroup ({
    description: new FormControl(),
  });

  isAdding: boolean = false;
  hasError: boolean = false;
  errorMessages: any[] = [];

  constructor(
    private tripulantTypeService: TripulantTypeService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit()  {
    this.getTripulantTypes();
  }
  
  applyFilter(event: Event) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setAdd() : any {
    this.tripulantTypeForm.reset();
    this.hasError = false;
    return this.isAdding = !this.isAdding;  
  }

  getTripulantTypes() : void {
    this.tripulantTypeService.getTripulantType().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          this.tripList = data; 
          this.dataSource = new MatTableDataSource(this.tripList);
        };
      }
    ); 
  };

  submit() :void {
    var postEnitity = new TripulantType();
    this.errorMessages = [];
    postEnitity.description = this.tripulantTypeForm.value.description;
    this.tripulantTypeService.postTripulantType(postEnitity)
    .subscribe(
      (data) => {
        if (data) { 
          this.tripList.push(data); 
          this.dataSource = new MatTableDataSource(this.tripList);          
          // this.showDetails.push(false);
            this.isAdding = !this.isAdding;
        }
      },
      (error) => { 
        this.hasError = true;
        if (error.error != null && error.error.code == null && error.error.message == null) {
          console.error("This model does not have Business Validations.");
        } else {
          this.errorMessages.push("Error Submiting the Tripulant Type. " +
            "If the description is filled, there may already exist a Tripulant with the description introduced.");
        }
      }
    )
  }
}
