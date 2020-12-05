import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Route, RouteNodes} from '../../models/route';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import { RoutesService } from '../../services/routes.service';
import { RoutesMapper } from '../../models/mappers/routeMapper';
import { Nodes } from '../../models/nodes';
import { NodesService } from '../../services/nodes.service';
import { NodesMapper } from '../../models/mappers/nodeMapper';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit, AfterViewInit {
  formControl = new FormControl('', [
     Validators.required,
  ]);

  mapper = new RoutesMapper();
  nodeMapper = new NodesMapper;

  routeName: string;

  routeList: Route[] = [];
  nodeList: Nodes[] = [];
  routeNodes: any[] = [];

  //addNode = []; when complete add
  addNode: number[] = [];


  routeForm = new FormGroup ({
    // distance: new FormControl(),
    // duration: new FormControl(),
    isReinforcementRoute: new FormControl(),
    isEmptyRoute: new FormControl(),
    node: new FormControl(),
    durationNode: new FormControl(),
    distanceNode: new FormControl()

  });

  constructor( private routeService: RoutesService,
    private nodesService: NodesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

    dataSource = new MatTableDataSource<Route>();
    showDetails: boolean[] = [];
    isAdding: boolean = false;
    displayedColumns: string[] = ['name', 'distance', 'duration', 'isReinforcementRoute', 'isEmptyRoute'];

    @ViewChild(MatSort) sort : MatSort;

  ngOnInit(): void {
    this.getRoutes();
    this.getNodes();
  }
    ngAfterViewInit() {
    
    // this.dataSource.sort = this.sort;
  }
  
  getRoutes() : void {
    this.routeService.getRoutes().subscribe(
      (data) => {
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i ++) {              
            this.routeList.push(this.mapper.fromResponseToDto(new Route() as Route, data[i]));
            };
          this.dataSource = new MatTableDataSource(this.routeList);
          this.dataSource.sort = this.sort;
          for (let i = 0; i < data.length; i++) {
            this.showDetails.push(false);
          }
          console.log(this.routeList[2])         
        }; 
        }
      );
    }

    getNodes() : void {    
      this.nodesService.getNodes().subscribe(
        (data) => {
          if (data && data.length > 0) {
            for (let i = 0; i < data.length; i ++){              
              this.nodeList.push(this.nodeMapper.fromResponseToDto(new Nodes() as Nodes, data[i]));
              console.log(this.nodeList)
              }        
          };        
        } 
      ); 
    };
  
    
  handleError(error: any){

      this.isAdding = true
  
  }
    openSnackBar(error:any,) {
      this._snackBar.open(error, 'Bad request', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }  
    applyFilter(filterValue: string) {
      // let dataSource = new MatTableDataSource(this.nodeList);
    
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
    }
    
    setAdd() : any {
      console.log(this.routeForm.value)
      
      this.addNode = [];
      return this.isAdding = !this.isAdding;

    }
    

    isValidForm() : boolean {
  
      //verifications here
      return false;    
    }
    onSelectNode() {
      return this.routeNodes.push(
        {
        id: this.routeForm.value.node,
        distance: this.routeForm.value.distance,
        duration: this.routeForm.value.duration
        }
    )
    }
    insertNode () {      
      this.onSelectNode();
      if (this.addNode.length > 1) {
      if (this.routeNodes[this.addNode.length].id) {
      return this.addNode.push(1);
      }   
      else {
        return;
      }      
    }
    else {
      return this.addNode.push(1);
    }
    }
    submit() :void {
      // console.log(this.nodeForm.value)
      // console.log(this.nodeForm.value.shortName)
  
      var postEnitity = new Route();

      
      this.routeService.postNode(postEnitity)
      .subscribe((data) => {
          if (data) { 
            this.routeList.push(data); 
            this.dataSource = new MatTableDataSource(this.routeList);          
            this.showDetails.push(false); 
            this.isAdding = !this.isAdding;
            this.addNode = [];
          }
      },
      // error => this.handleError(error.error.errors)
      )
    }
  }  


