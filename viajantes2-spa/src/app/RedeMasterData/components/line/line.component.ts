import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Line, LinePost} from '../../models/line';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import { LinesService } from '../../services/lines.service';
import { Nodes } from '../../models/nodes';
import { NodesService } from '../../services/nodes.service';
import { NodesMapper } from '../../models/mappers/nodeMapper';
import { TripulantType } from '../../models/tripulant-type';
import { TripulantTypeService } from '../../services/tripulant-type.service';
import { LinesMapper } from '../../models/mappers/lineMapper';
import { RoutesService } from '../../services/routes.service';
import { Route } from '../../models/route';
import { RoutesMapper } from '../../models/mappers/routeMapper';
import { VehicleTypeService } from '../../services/vehicle-type.service';
import { VehicleType } from '../../models/vehicle-type';
import { VehicleTypeMapper } from '../../models/mappers/vehicleTypeMapper';
import { Trip } from '../../../ViagemMasterData/models/trip';
import { TripsService } from '../../../ViagemMasterData/services/trips.service';
import { TripMapper } from '../../../ViagemMasterData/models/mappers/trip';
import { Router } from '@angular/router';

export interface orientation {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit, AfterViewInit  {
  formControl = new FormControl('', [
    Validators.required,
  ]);
  errorMessage: any;

  nodeList: Nodes[] = [];
  nodeMapper = new NodesMapper();

  tripulantTypeList: TripulantType[] = [];
  vehicleTypesList: VehicleType[] = [];

  routeList: Route[] = [];

  lineTrips: Trip[] = [];
  tripMapper = new TripMapper();

  lineForm = new FormGroup ({
    code: new FormControl(),
    name: new FormControl(),
    color: new FormControl(),
    beginNode: new FormControl(),
    finalNode: new FormControl(),
    tripulantType: new FormControl(),
    vehicleType: new FormControl()
  });

  hasError: boolean = false;

  showDetails: boolean[] = [];
  lineList: Line[] = [];
  lineRoutes: any[] = [];
  displayedColumns: string[] = ['code', 'name', 'color', 'beginNode', 'finalNode', 'actions'];
  dataSource = new MatTableDataSource<Line>();

  isAdding: boolean = false;
  isViewingDetails: boolean = false;
  hasRoutes: boolean = true;
  hasTrips: boolean = true;

  errorMessages: any[] = [];

  mapper = new LinesMapper;

  mapperRoutes = new RoutesMapper;
  vehicleMapper = new VehicleTypeMapper;

  lineRoutesForm = new FormArray([]);
  orientationArray = new FormArray([]);


  orientations: orientation[] = [
    {value: 'Go', viewValue: 'Go'},
    {value: 'Return', viewValue: 'Return'}
  ];

 @ViewChild(MatSort) sort : MatSort;

 constructor(
  private router: Router,
   private linesService: LinesService,
   private routeService: RoutesService,
   private nodesService: NodesService,
   private tripulantTypeService: TripulantTypeService,
   private vehicleTypesService: VehicleTypeService,
   private tripsService: TripsService,
   private dialog: MatDialog,
   private formBuilder: FormBuilder,
   private _snackBar: MatSnackBar
   ) {}
 ngOnInit()  {
   this.dataSource.filterPredicate = 
   (data: Line, filter: string) => data.name?.indexOf(filter) != -1;
   this.getLines();
   this.getNodes();
   this.getTripulantTypes();
   this.getRoutes();
   this.getVehicleTypes();
 }
 ngAfterViewInit() {
   
   // this.dataSource.sort = this.sort;
 }

 getLines() : void {    
    this.linesService.getLines().subscribe(
      (data) => {
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i ++){              
            this.lineList.push(this.mapper.fromResponseToDto(new Line() as Line, data[i]));
          
          }  
        };        
        this.dataSource = new MatTableDataSource(this.lineList);
        this.dataSource.sort = this.sort;
        for (let i = 0; i < data.length; i++) {
          this.showDetails.push(false);
        }          
     
  });
}

getRoutes() : void {
  this.routeService.getRoutes().subscribe(
    (data) => {
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i ++) {              
          this.routeList.push(this.mapperRoutes.fromResponseToDto(new Route() as Route, data[i]));
          };
      };
      console.log(this.routeList)
    }
  );
}

  getNodes() : void {    
    this.nodesService.getNodes().subscribe(
      (data) => {
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i ++){              
            this.nodeList.push(this.nodeMapper.fromResponseToDto(new Nodes() as Nodes, data[i]));
            }     
        };        
      } 
    ); 
  };

  getTripulantTypes() : void {
    this.tripulantTypeService.getTripulantType().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          for (let i = 0; i < data.length; i ++){  
          this.tripulantTypeList.push(data[i]);
          }
        };
      }
    ); 
  };

  getVehicleTypes() : void {
    this.vehicleTypesService.getVehicleTypes().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          for (let i = 0; i < data.length; i ++){  
            this.vehicleTypesList.push(this.vehicleMapper.fromResponseToDto(new VehicleType() as VehicleType, data[i]));
            
          }
        };
        console.log(this.vehicleTypesList)
      }
    ); 
  };

  goToInsertLineRoute(id: any): void {
    this.router.navigate(['rmd/lines',id,'edit']);
  }

  onShowDetails(row: any) {
    console.log(row);
    this.getLineRoutes(row.id);
    this.getLineTrips(row.id);
    this.isViewingDetails = !this.isViewingDetails;
  }

  getLineRoutes(lineId: string) : void {
    this.linesService.getLineRoutes(lineId).subscribe(
      (data) => {
        if (data && data.lineRoutes.length > 0) {
          this.hasRoutes = true;
          this.lineRoutes = data.lineRoutes;
        } else {
          this.hasRoutes = false;
        };  
      }  
    );
  }

  getLineTrips(lineId: string) : void {
    this.tripsService.getLineTrips(lineId).subscribe(
      (data) => {
        if (data && data.length > 0) { 
          this.hasTrips = true;
          data.forEach(t => this.lineTrips.push(this.tripMapper.fromResponseToDto(new Trip(), t, this.lineList, this.routeList)));
        } else {
          this.hasTrips = false; 
        }
      }
    ); 
  }

  insertRoute() {     
    this.lineRoutesForm.push(new FormControl())
    this.orientationArray.push(new FormControl())
  }

  applyFilter(filterValue: string) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  setAdd() : any {
    this.lineForm.reset();
    this.clearFormArray(this.lineRoutesForm);
    this.clearFormArray(this.orientationArray);
    this.hasError = false;
    return this.isAdding = !this.isAdding;
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  setViewLineDetails() : any {
    this.lineRoutes = [];
    this.lineTrips = [];
    return this.isViewingDetails = !this.isViewingDetails;  
  }

  //will be implemented as front end validation
  isValidForm() : boolean {
    //verifications here
    return false;    
  }
  submit() :void {
    let postEntity = new LinePost();
    this.errorMessages = [];
    let lineRoutesPost: any[] = [];
    for (let i = 0; i < this.lineRoutesForm.controls.length; i++) {
      lineRoutesPost.push(
        {
          id: this.lineRoutesForm.value[i],
          orientation: this.orientationArray.value[i]
        }
      )
    }
    
    postEntity = this.mapper.fromFormToPost(lineRoutesPost, this.lineForm.value, postEntity)
    console.log(postEntity)
    this.linesService.postLines(postEntity).subscribe(
      (data) => {
        if (data) {           
          this.lineList.push(this.mapper.fromResponseToDto(new Line() as Line, this.mapper.updateDataToResponseModel(data, this.nodeList)));
          this.dataSource = new MatTableDataSource(this.lineList);          
          this.showDetails.push(false); 
          this.isAdding = !this.isAdding;  
        }
      },
      (error) => { 
        this.hasError = true;
        if (error.error != null && error.error.code == null && error.error.message == null) {
          if (error.error instanceof Array) {
            this.errorMessages.push("Error Submiting the Line.");
            for (let i = 0; i < error.error.length; i ++) {       
              this.errorMessages.push(error.error[i]);
            }   
          } else {
            this.errorMessages.push("Error Submiting the Line. " + error.error);
          }
        } else {
          this.errorMessages.push("Error Submiting the Line. " +
            "If no required fields are empty, there may already exist a Line with that code introduced.");
        }
      }
    )
  }

}
