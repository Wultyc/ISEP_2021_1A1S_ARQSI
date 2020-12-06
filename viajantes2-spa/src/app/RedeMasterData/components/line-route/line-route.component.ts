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
import { ActivatedRoute, Params } from '@angular/router';


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

  id = new String;

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
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private routeService: RoutesService,
    private nodesService: NodesService) { }

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
    
    console.log(this.routeNodes)
    console.log(this.routeNodesDistance)
    console.log(this.routeNodesDuration)
    console.log(this.id)
    console.log(this.routeLineForm)
  }

  
}
