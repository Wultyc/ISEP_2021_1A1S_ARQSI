import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';
import { TripMapper } from '../../models/mappers/trip';

import { Line } from '../../../RedeMasterData/models/line';
import { LinesService } from '../../../RedeMasterData/services/lines.service';
import { LinesMapper } from '../../../RedeMasterData/models/mappers/lineMapper';

import { Route } from '../../../RedeMasterData/models/route';
import { RoutesService } from '../../../RedeMasterData/services/routes.service';
import { RoutesMapper } from '../../../RedeMasterData/models/mappers/routeMapper';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
  providers: [TripMapper]
})
export class TripsComponent implements OnInit {

  tripList: Trip[] = [];
  lineList: Line[] = [];
  routeList: Route[] = [];

  linesMapper = new LinesMapper();
  routesMapper = new RoutesMapper();

  displayedColumns: string[] = ['line','route','startTime','endTime'];
  dataSource = new MatTableDataSource<Trip>();

  formControl = new FormControl('', [
    Validators.required,
  ]);

  tripForm = new FormGroup ({
    line: new FormControl(),
    route: new FormControl(),
    startTime: new FormControl(),
    endTIme: new FormControl()
  });

  isAdding: boolean = false;
  hasError: boolean = false;
  errorMessages: any[] = [];

  constructor(
    private tripMapper: TripMapper,
    private linesService: LinesService,
    private routesService: RoutesService,
    private tripsService: TripsService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getObjects();
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

  getObjects() : void {
    this.getLines();
  }

  getLines() : void {    
    this.linesService.getLines().subscribe(
      (data) => {
        if (data && data.length > 0) {
          data.forEach(l => this.lineList.push(this.linesMapper.fromResponseToDto(new Line(), l)));
        };
        this.getRoutes();        
      });
  }

  getRoutes() : void {
    this.routesService.getRoutes().subscribe(
      (data) => {
        if (data && data.length > 0) {
          data.forEach(r => this.routeList.push(this.routesMapper.fromResponseToDto(new Route(), r)));
        };
        this.getTrips();
      });
  }

  getTrips(){
    this.tripsService.getTrips().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          data.forEach(t => this.tripList.push(this.tripMapper.fromResponseToDto(new Trip(), t, this.lineList, this.routeList)));
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
