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

  routeName: string;

  routeList: Route[] = [];
  nodeList: Nodes[] = [];

  routeNodes = new FormArray([]);
  routeNodesDistance = new FormArray([]);
  routeNodesDuration = new FormArray([]);
  //addNode = []; when complete add
  addNode: number[] = [];

  
  routeForm = new FormGroup ({
    isReinforcementRoute: new FormControl(),
    isEmptyRoute: new FormControl(),
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
      
      this.addNode = [];
      return this.isAdding = !this.isAdding;

    }
    

    isValidForm() : boolean {
  
      //verifications here
      return false;    
    }
    
    insertNode () {     
      this.routeNodes.push(new FormControl())
      this.routeNodesDistance.push(new FormControl())
      this.routeNodesDuration.push(new FormControl())
    }
    submit() :void {

      let postEntity = new RoutePost();   
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
      postEntity = this.mapper.fromFormToPost(routeNodesPost,this.routeForm.value, postEntity)


      this.routeService.postRoute(postEntity)
    .subscribe((data) => {
        if (data) {      
          this.showDetails.push(false); 
          this.isAdding = !this.isAdding;       
        }
    },
    error => this.handleError(error.error.errors)
    )
    }
  }  


