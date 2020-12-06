import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Route, RouteNodes, RoutePost} from '../../models/route';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
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

  routeList: Route[] = [];
  nodeList: Nodes[] = [];

  // when complete add
  addNode: number[] = [];

  dataSource = new MatTableDataSource<Route>();
  showDetails: boolean[] = [];
  isAdding: boolean = false;
  hasError: boolean = false;
  errorMessages: any[] = [];
  displayedColumns: string[] = ['name', 'distance', 'duration', 'isReinforcementRoute', 'isEmptyRoute'];

  @ViewChild(MatSort) sort : MatSort;

  routeNodes = new FormArray([]);
  routeNodesDistance = new FormArray([]);
  routeNodesDuration = new FormArray([]);
  
  routeForm = new FormGroup ({
    isReinforcementRoute: new FormControl(),
    isEmptyRoute: new FormControl(),
  });

  constructor( private routeService: RoutesService,
    private nodesService: NodesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { 
  }

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
            }        
        };        
      } 
    ); 
  };

  applyFilter(filterValue: string) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  setAdd() : any {
    this.addNode = [];
    this.clearFormArray(this.routeNodes);
    this.clearFormArray(this.routeNodesDistance);
    this.clearFormArray(this.routeNodesDuration);
    this.hasError = false;
    return this.isAdding = !this.isAdding;
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  isValidForm() : boolean {
    return false;    
  }
  
  insertNode () {     
    this.routeNodes.push(new FormControl())
    this.routeNodesDistance.push(new FormControl())
    this.routeNodesDuration.push(new FormControl())
  }

  submit() :void {
    let postEntity = new RoutePost();
    this.errorMessages = [];
    let routeNodesPost: any[] = [];
    for (let i = 0; i < this.routeNodes.controls.length; i++) {
      routeNodesPost.push(
        {
          id: this.routeNodes.value[i],
          distance: this.routeNodesDistance.value[i],
          duration: this.routeNodesDuration.value[i]
        }
      )
    }
    
    this.routeForm.value.isEmptyRoute = (this.routeForm.value.isEmptyRoute == undefined || this.routeForm.value.isEmptyRoute == null) ? false : ( this.routeForm.value.isEmptyRoute == true ? true : false);
    this.routeForm.value.isReinforcementRoute = (this.routeForm.value.isReinforcementRoute == undefined  || this.routeForm.value.isReinforcementRoute == null) ? false : (this.routeForm.value.isReinforcementRoute == true ? true : false);
    postEntity = this.mapper.fromFormToPost(routeNodesPost,this.routeForm.value, postEntity);

    this.routeService.postRoute(postEntity).subscribe(
      (data) => {
        if (data) {
          this.routeList.push(this.mapper.fromResponseToDto(new Route() as Route, this.updateDataToRouteModel(data)));
          this.dataSource = new MatTableDataSource(this.routeList);          
          this.showDetails.push(false); 
          this.isAdding = !this.isAdding;   
        }
      },
      (error) => { 
        this.hasError = true;
        if (error.error != null && error.error.code == null) {
          this.errorMessages.push("Error Submiting the Route. " + error.error);
        } else {
          this.errorMessages.push("Error Submiting the Route.");
        }
      }
    )
  }

  updateDataToRouteModel(data: any) : Route {
    let route = new Route();
    route.distance = data.distance;
    route.duration = data.duration;
    route.isEmptyRoute = route.isEmptyRoute;
    route.isReinforcementRoute = route.isReinforcementRoute;
    let routeNodesModel: any[] = [];
    for (let i = 0; i < data.routeNodes.length; i++) {
      for (let j = 0; j < this.nodeList.length; j++) {
        if (this.nodeList[j].id == data.routeNodes[i].nodeId) {
          routeNodesModel.push({
            nodeId: this.nodeList[j],
            distance: data.routeNodes[i].distance,
            duration: data.routeNodes[i].duration
          })
          break;
        }
      }
    }
    route.routeNodes = routeNodesModel;
    return route;
  }
}  


