import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AmazingTimePickerService } from 'amazing-time-picker';

import { Trip, TripPost, TripAdHocPost } from '../../models/trip';
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
  lineRouteList: Route[] = [];

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
    frequency: new FormControl(),
    numberOfTrips: new FormControl(),
  });

  tripAdHocForm = new FormGroup ({
    line: new FormControl(),
    route: new FormControl(),
    startTime: new FormControl()
  });

  isAdding: boolean = false;
  isAddingAdHoc: boolean = false;

  hasError: boolean = false;
  errorMessages: any[] = [];

  constructor(
    private tripMapper: TripMapper,
    private linesService: LinesService,
    private routesService: RoutesService,
    private tripsService: TripsService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private atp: AmazingTimePickerService) {
  }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }

  refreshRouteLine(selectedLineId: string) {
    console.log(selectedLineId);
    this.lineRouteList = [];
    if (this.isAdding) {
      this.tripForm.value.route = null;
    }
    if (this.isAddingAdHoc) {
      this.tripAdHocForm.value.route = null;
    }
    var lineWithSelectedId = new Line();
    for (let index = 0; index < this.lineList.length; index++) {
      if (this.lineList[index].id == selectedLineId) {
        lineWithSelectedId = this.lineList[index];
        break;
      }
    }
    lineWithSelectedId.lineRoutes.forEach(r => this.lineRouteList.push(this.routesMapper.fromResponseToDto(new Route(), r.route)));
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
    this.lineRouteList = [];
    this.hasError = false;
    this.isAdding = true;
    this.isAddingAdHoc = false;
  }

  setAddAdHoc() : any {
    this.tripAdHocForm.reset();
    this.lineRouteList = [];
    this.hasError = false;
    this.isAdding = false;
    this.isAddingAdHoc = true;
  }

  closeAdd() : any {
    this.tripForm.reset();
    this.tripAdHocForm.reset();
    this.lineRouteList = [];
    this.hasError = false;
    this.isAdding = false;
    this.isAddingAdHoc = false;
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
    var postEntity = new TripPost();
    this.errorMessages = [];
    postEntity = this.tripMapper.fromFormToDTO(this.tripForm.value, new TripPost);
    console.log(postEntity)

    this.validatePostEntity(postEntity);
    if (this.errorMessages.length > 0) {
      return;
    }

    this.tripsService.postTrip(postEntity)
    .subscribe(
      (data) => {
        if (data) { 
          data.forEach(t => this.tripList.push(this.tripMapper.fromResponseToDto(new Trip(), t, this.lineList, this.routeList)));
          this.isAdding = false;
        }
      },
      (error) => { 
        this.hasError = true;
        this.errorMessages.push("Error Submiting the Trip.");
        if (error.error != null && error.error.title != null && error.error.message == null) {
          this.errorMessages.push(error.error.title);
        }
      }
    )
  }

  submitAdHoc() :void {
    var postAdHocTrip = new TripAdHocPost();
    this.errorMessages = [];
    postAdHocTrip = this.tripMapper.fromAdHocFormToDTO(this.tripAdHocForm.value, new TripAdHocPost)
    console.log(postAdHocTrip)

    this.tripsService.postAdHocTrip(postAdHocTrip)
    .subscribe(
      (data) => {
        if (data) { 
          this.tripList.push(this.tripMapper.fromResponseToDto(new Trip(), data, this.lineList, this.routeList));
          this.isAddingAdHoc = false;
        }
      },
      (error) => { 
        this.hasError = true;
        this.errorMessages.push("Error Submiting the Trip.");
        if (error.error != null && error.error.title != null && error.error.message == null) {
          this.errorMessages.push(error.error.title);
        }
      }
    )
  }

  validatePostEntity(postEntity: TripPost) : void {
    const numberMinutesInDay = 24 * 60;
    if (postEntity.frequency * postEntity.numberOfTrips > numberMinutesInDay) {
      this.errorMessages.push("The time of all the trips combined surpasses a day.");
      this.hasError = true;
    }
  }

}
