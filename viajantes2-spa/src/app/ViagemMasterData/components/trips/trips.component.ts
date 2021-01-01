import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';
import { TripMapper } from '../../models/mappers/trip'

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
  providers: [TripMapper]
})
export class TripsComponent implements OnInit {

  tripList: Trip[] = [];
  displayedColumns: string[] = ['lineId','routeId','startTime','endTime'];
  dataSource = new MatTableDataSource<Trip>();

  formControl = new FormControl('', [
    Validators.required,
  ]);

  tripForm = new FormGroup ({
    lineId: new FormControl(),
    routeId: new FormControl(),
    startTime: new FormControl(),
    endTIme: new FormControl()
  });

  isAdding: boolean = false;
  hasError: boolean = false;
  errorMessages: any[] = [];

  constructor(
    private tripMapper: TripMapper,
    private tripsService: TripsService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getTrips();
  }

  applyFilter(event: Event) {
    let dataSource = new MatTableDataSource(this.tripList);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setAdd() : any {
    this.tripForm.reset();
    this.hasError = false;
    return this.isAdding = !this.isAdding;
  }

  getTrips(){
    this.tripsService.getTrips().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          data.forEach(t => this.tripList.push(this.tripMapper.fromResponseToDto(new Trip(), t)))
          this.dataSource = new MatTableDataSource(this.tripList);
        };
      }
    ); 
  }

  submit() :void {
    var postEntity = new Trip();
    this.errorMessages = [];

    //postEntity = this.tripMapper.fromFormToDTO(this.tripForm.value, new Trip)

    console.log(postEntity)

    this.tripsService.postTrip(postEntity)
    .subscribe(
      (data) => {
        if (data) { 
          this.tripList.push(data);
          // this.showDetails.push(false);
            this.isAdding = !this.isAdding;
        }
      },
      (error) => { 
        this.hasError = true;
        if (error.error != null && error.error.code == null && error.error.message == null) {
          console.error("This model does not have Business Validations.");
        } else {
          this.errorMessages.push("Error Submiting the Trip.");
        }
      }
    )
  }
}
