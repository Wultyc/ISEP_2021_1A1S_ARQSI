import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Route, RouteNodes, RoutePost} from '../../models/route';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { RoutesService } from '../../services/routes.service';
import { RoutesMapper } from '../../models/mappers/routeMapper';
import { Nodes } from '../../models/nodes';
import { NodesService } from '../../services/nodes.service';
import { NodesMapper } from '../../models/mappers/nodeMapper';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LinesService } from '../../services/lines.service';


export interface orientation {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-line-route',
  templateUrl: './line-route.component.html',
  styleUrls: ['./line-route.component.css']
})
export class LineRouteComponent implements OnInit, AfterViewInit {
  formControl = new FormControl('', [
     Validators.required,
  ]);

  mapper = new RoutesMapper();
  nodeMapper = new NodesMapper;

  routeLineForm = new FormGroup ({
    isReinforcementRoute: new FormControl(),
    isEmptyRoute: new FormControl(),
    routeOrientation: new FormControl
  });

  id: string;

  routeNodes = new FormArray([]);
  routeNodesDistance = new FormArray([]);
  routeNodesDuration = new FormArray([]);

  orientations: orientation[] = [
    {value: 'Go', viewValue: 'Go'},
    {value: 'Return', viewValue: 'Return'}
  ];

  dataSource = new MatTableDataSource<Route>();

  routeList: Route[] = [];
  nodeList: Nodes[] = [];

  hasError: boolean = false;
  errorMessages: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private routeService: RoutesService,
    private nodesService: NodesService,
    private linesService: LinesService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        }
      );
    this.getNodes();
  }
  ngAfterViewInit() {    
    // this.dataSource.sort = this.sort;
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

  insertNode () {     
    this.routeNodes.push(new FormControl())
    this.routeNodesDistance.push(new FormControl())
    this.routeNodesDuration.push(new FormControl())
  }

  submit() {
    let postEntity = new RoutePost();
    this.hasError = false;
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
    
    this.routeLineForm.value.isEmptyRoute = (this.routeLineForm.value.isEmptyRoute == undefined || this.routeLineForm.value.isEmptyRoute == null) ? false : ( this.routeLineForm.value.isEmptyRoute == true ? true : false);
    this.routeLineForm.value.isReinforcementRoute = (this.routeLineForm.value.isReinforcementRoute == undefined  || this.routeLineForm.value.isReinforcementRoute == null) ? false : (this.routeLineForm.value.isReinforcementRoute == true ? true : false);
    
    postEntity = this.mapper.fromFormToPost(routeNodesPost,this.routeLineForm.value, postEntity);
    this.linesService.postLineRoutes(this.id, postEntity, this.routeLineForm.value.routeOrientation as string).subscribe(
      (data) => {
        if (data) {
          console.log(data);
          this.router.navigate(['lines']);
        }
      },
      (error) => { 
        this.hasError = true;
        if (error.error != null && error.error.code == null && error.error.message == null) {
          if (error.error instanceof Array) {
            this.errorMessages.push("Error Adding Route to Line.");
            for (let i = 0; i < error.error.length; i ++) {       
              this.errorMessages.push(error.error[i]);
            }   
          } else {
            this.errorMessages.push("Error Adding Route to Line. " + error.error);
          }
        } else {
          this.errorMessages.push("Error Adding Route to Line. " +
            "If no required fields are empty, there may already exist a Line with that code introduced.");
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
