import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Line} from '../../models/line';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
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

 tripList: TripulantType[] = [];


  lineForm = new FormGroup ({
    code: new FormControl(),
    name: new FormControl(),
    color: new FormControl(),
    beginNode: new FormControl(),
    finalNode: new FormControl(),
    tripulantType: new FormControl(),
    vehicleType: new FormControl()
  });

 showDetails: boolean[] = [];
 lineList: Line[] = [];
 lineRoutes: any[] = [];
 displayedColumns: string[] = ['code', 'name', 'color', 'beginNode', 'finalNode', 'actions'];
 dataSource = new MatTableDataSource<Line>();

 isAdding: boolean = false;
 isViewingRoutes: boolean = false;
 hasRoutes: boolean = true;

 mapper = new LinesMapper;

 @ViewChild(MatSort) sort : MatSort;

 constructor(
   private linesService: LinesService,
   private nodesService: NodesService,
   private tripService: TripulantTypeService,
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
 }
 ngAfterViewInit() {
   
   // this.dataSource.sort = this.sort;
 }

 getLines() : void {    
    this.linesService.getLines().subscribe(
      (data) => {
        if (data && data.length > 0) {
          console.log(data)
          for (let i = 0; i < data.length; i ++){              
            this.lineList.push(this.mapper.fromResponseToDto(new Line() as Line, data[i]));
          
          }  
          console.log(this.lineList)
        };        
        this.dataSource = new MatTableDataSource(this.lineList);
        this.dataSource.sort = this.sort;
        for (let i = 0; i < data.length; i++) {
          this.showDetails.push(false);
        }          
     
  });
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
    this.tripService.getTripulantType().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          for (let i = 0; i < data.length; i ++){  
          this.tripList.push(data[i]);
          }
          console.log(this.tripList)
        };
      }
    ); 
  };

  onShowDetails(row: any) {
    console.log(row);
    this.linesService.getLineRoutes(row.id).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.hasRoutes = true;
          this.lineRoutes = data;
        } else {
          this.hasRoutes = false;
        };     
      }  
    );
    this.isViewingRoutes = !this.isViewingRoutes;
  }

  applyFilter(filterValue: string) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  setAdd() : any {
    return this.isAdding = !this.isAdding;  
  }

  setViewLineRoutes() : any {
    return this.isViewingRoutes = !this.isViewingRoutes;  
  }

  //will be implemented as front end validation
  isValidForm() : boolean {
    //verifications here
    return false;    
  }
}
