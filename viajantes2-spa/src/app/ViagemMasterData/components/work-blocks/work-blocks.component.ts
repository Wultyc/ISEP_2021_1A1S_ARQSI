import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AmazingTimePickerService } from 'amazing-time-picker';

import { WorkBlock, WorkBlockPost } from '../../models/workBlock';
import { WorkBlocksService } from '../../services/work-blocks.service';
import { WorkBlockMapper } from '../../models/mappers/workBlockMapper';

import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';
import { TripMapper } from '../../models/mappers/trip';

import { Line } from '../../../RedeMasterData/models/line';
import { LinesService } from '../../../RedeMasterData/services/lines.service';
import { LinesMapper } from '../../../RedeMasterData/models/mappers/lineMapper';

import { Route } from '../../../RedeMasterData/models/route';
import { RoutesService } from '../../../RedeMasterData/services/routes.service';
import { RoutesMapper } from '../../../RedeMasterData/models/mappers/routeMapper';

import { VehicleService } from '../../models/vehicleServices';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { VehicleServiceMapper } from '../../models/mappers/vehicleServiceMapper';

import { Vehicle } from '../../models/vehicles';
import { VehiclesService } from '../../services/vehicles.service';
import { VehicleMapper } from '../../models/mappers/vehicles';

@Component({
  selector: 'app-work-blocks',
  templateUrl: './work-blocks.component.html',
  styleUrls: ['./work-blocks.component.css']
})
export class WorkBlocksComponent implements OnInit {

  workBlockList: WorkBlock[] = [];
  tripList: Trip[] = [];
  lineList: Line[] = [];
  routeList: Route[] = [];
  vehicleServiceList: VehicleService[] = [];
  vehicleList: Vehicle[] = [];

  displayedColumns: string[] = ['trip','vehicleService','startTime', 'endTime'];
  dataSource = new MatTableDataSource<WorkBlock>();

  formControl = new FormControl('', [
    Validators.required,
  ]);

  workBlockForm = new FormGroup ({
    trip: new FormControl(),
    vehicleService: new FormControl(),
    startTime: new FormControl(),
    frequency: new FormControl(),
    numberOfWorkBlocks: new FormControl(),
  });

  isAdding: boolean = false;
  hasError: boolean = false;
  errorMessages: any[] = [];

  workBlockMapper = new WorkBlockMapper();
  tripMapper = new TripMapper();
  lineMapper = new LinesMapper();
  routeMapper = new RoutesMapper();
  vehicleServiceMapper = new VehicleServiceMapper();
  vehicleMapper = new VehicleMapper();

  constructor(
    
    private workBlockService: WorkBlocksService,
    private tripService: TripsService,
    private lineService: LinesService,
    private routeService: RoutesService,
    private vehicleServiceService: VehicleServiceService,
    private vehicleService: VehiclesService,

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

  ngOnInit(): void {
    this.getObjects();
  }

  applyFilter(event: Event) {
    let dataSource = new MatTableDataSource(this.workBlockList);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setAdd() : any {
    this.workBlockForm.reset();
    this.hasError = false;
    this.isAdding = true;
  }

  closeAdd() : any {
    this.workBlockForm.reset();
    this.hasError = false;
    this.isAdding = false;
  }

  getObjects() : void {
    this.getLines();
  }

  getLines() : void {    
    this.lineService.getLines().subscribe(
      (data) => {
        if (data && data.length > 0) {
          data.forEach(l => this.lineList.push(this.lineMapper.fromResponseToDto(new Line(), l)));
        };
        this.getRoutes();        
      });
  }

  getRoutes() : void {
    this.routeService.getRoutes().subscribe(
      (data) => {
        if (data && data.length > 0) {
          data.forEach(r => this.routeList.push(this.routeMapper.fromResponseToDto(new Route(), r)));
        };
        this.getTrips();
      });
  }

  getTrips(){
    this.tripService.getTrips().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          data.forEach(t => this.tripList.push(this.tripMapper.fromResponseToDto(new Trip(), t, this.lineList, this.routeList)));
        };
        this.getVehicles();
      }
    ); 
  }

  getVehicles() : void {    
    this.vehicleService.getVehicles().subscribe(
      (data) => {
        if (data && data.length > 0) {
          data.forEach(v => this.vehicleList.push(this.vehicleMapper.fromResponseToDto(new Vehicle(), v)));
        };
        this.getVehicleServices();        
      });
  }

  getVehicleServices() : void {    
    this.vehicleServiceService.getVehicleServices().subscribe(
      (data) => {
        if (data && data.length > 0) {
          data.forEach(vs => this.vehicleServiceList.push(this.vehicleServiceMapper.fromResponseToDto(new VehicleService(), vs, this.vehicleList)));
        };
        this.getWorkBlocks();  
      });
  }

  getWorkBlocks() : void {    
    this.workBlockService.getWorkBlocks().subscribe(
      (data) => {
        if (data && data.length > 0) {
          data.forEach(wb => this.workBlockList
            .push(this.workBlockMapper.fromResponseToDto(new WorkBlock(), wb, this.tripList, this.vehicleServiceList)));
        };
        this.dataSource = new MatTableDataSource(this.workBlockList);
      });
  }

  submit() :void {
    var postEntity = new WorkBlockPost();
    this.errorMessages = [];
    postEntity = this.workBlockMapper.fromFormToDTO(this.workBlockForm.value, new WorkBlockPost);
    console.log(postEntity);

    this.workBlockService.postWorkBlock(postEntity)
    .subscribe(
      (data) => {
        if (data) { 
          data.forEach(wb => this.workBlockList.push(this.workBlockMapper.fromResponseToDto(new WorkBlock(), wb, this.tripList, this.vehicleServiceList)));
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

}
