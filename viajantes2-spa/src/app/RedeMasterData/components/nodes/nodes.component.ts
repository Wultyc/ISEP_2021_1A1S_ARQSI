import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Nodes} from '../../models/nodes';
import {NodesService} from '../../services/nodes.service'
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import { NodesMapper } from '../../models/mappers/nodeMapper';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class NodesComponent implements OnInit, AfterViewInit {
  formControl = new FormControl('', [
     Validators.required,
  ]);

  errorMessage: any;
  // create form
  nodeForm = new FormGroup ({
    shortName: new FormControl(),
    name: new FormControl(),
    latitude: new FormControl(),
    longitude: new FormControl(),
    surrenderNode: new FormControl(),
    collectionNode: new FormControl()
  });
  // listing and frotend logic (details not implemented, and neither will be)
  showDetails: boolean[] = [];
  nodeList: Nodes[] = [];
  displayedColumns: string[] = ['shortName', 'name', 'longitude', 'latitude', 'collectionNode', 'surrenderNode', 'actions'];
  dataSource = new MatTableDataSource<Nodes>();
  //boolean that says if user is adding new entry
  isAdding: boolean = false;
  hasError: boolean = false;
  errorMessages: any[] = [];

  //the data mapper
  mapper = new NodesMapper();

  @ViewChild(MatSort) sort : MatSort;

  constructor(
    private nodesService: NodesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit()  {
    this.dataSource.filterPredicate = (data: Nodes, filter: string) => data.name?.indexOf(filter) != -1;
    this.getNodes();
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  //consumes the observer from the service, gets all the data and maps it
  getNodes() : void {    
    this.nodesService.getNodes().subscribe(
      (data) => {
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i ++){              
            this.nodeList.push(this.mapper.fromResponseToDto(new Nodes() as Nodes, data[i]));
            };
          this.dataSource = new MatTableDataSource(this.nodeList);
          this.dataSource.sort = this.sort;
          for (let i = 0; i < data.length; i++) {
            this.showDetails.push(false);
          }         
        };        
      } 
    ); 
  };
  
  onShowDetails(row: number) {
    // this.showDetails[row] = !this.showDetails[row];
    // console.log(row);
  }
  
  applyFilter(filterValue: string) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  setAdd() : any {
    this.hasError = false;
    return this.isAdding = !this.isAdding;
  }

  //adding new entry, as on click submits the form. The data is mapped and post.
  submit() :void {
    var postEntity = new Nodes();    
    this.errorMessages = [];
    this.nodeForm.value.collectionNode = (this.nodeForm.value.collectionNode == undefined || this.nodeForm.value.collectionNode == null) ? false : (this.nodeForm.value.collectionNode == true ? true : false);
    this.nodeForm.value.surrenderNode = (this.nodeForm.value.surrenderNode == undefined  || this.nodeForm.value.surrenderNode == null) ? false : (this.nodeForm.value.surrenderNode == true ? true : false);
    console.log(this.nodeForm.value)
    postEntity = this.mapper.fromFormToDTO(this.nodeForm.value, postEntity)
    
    console.log(postEntity)

    this.nodesService.postNode(postEntity)
    .subscribe(
      (data) => {
        if (data) { 
          this.nodeList.push(data); 
          this.dataSource = new MatTableDataSource(this.nodeList);          
          this.showDetails.push(false); 
          this.isAdding = !this.isAdding;       
        }
      },
      (error) => { 
        this.hasError = true;
        if (error.error != null && error.error.code == null && error.error.message == null) {
          this.errorMessages.push("Error Submiting the Node. " + error.error);
        } else {
          this.errorMessages.push("Error Submiting the Node. " +
            "If no field is empty, a Node with that short name introduced or " +
            "the introduced combination Latitude - Longitude may already exist.");
        }
      }
    )
  }
}
 

