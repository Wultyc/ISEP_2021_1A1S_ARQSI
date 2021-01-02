import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Route, RouteNodes, RoutePost} from '../../models/route';
import {LinePatch} from '../../models/line'
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { RoutesService } from '../../services/routes.service';
import { RoutesMapper } from '../../models/mappers/routeMapper';
import { Nodes } from '../../models/nodes';
import { NodesService } from '../../services/nodes.service';
import { NodesMapper } from '../../models/mappers/nodeMapper';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LinesService } from '../../services/lines.service';
import { LinesMapper } from '../../models/mappers/lineMapper';


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
  lineMapper = new LinesMapper();
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

  returnToLinesList() {
    this.router.navigate(['lines']);
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
    
    this.routeService.postRoute(postEntity).subscribe(
      (data) => {
        const linePatch: LinePatch = this.lineMapper.fromFormToPatchLine(data.id as string, this.routeLineForm.value.routeOrientation, new LinePatch())
        this.linesService.patchLine(this.id, linePatch).subscribe(
          (data) => {
            this.router.navigate(['rmd/lines']);
          },
          (error) => {
            console.log(error)
            this.hasError = true;
            this.errorMessages.push("Error updating Line");
          }
        )
      },
      (error) => {
        console.log(error)
        this.hasError = true;
        this.errorMessages.push("Error creating Route");
      }
    )


  }
}
