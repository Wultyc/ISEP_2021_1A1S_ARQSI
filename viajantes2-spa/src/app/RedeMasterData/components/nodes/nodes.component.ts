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

// const nodeList: nodes[];

export class NodesComponent implements OnInit, AfterViewInit {
  formControl = new FormControl('', [
     Validators.required,
  ]);

  errorMessage: any;

  nodeForm = new FormGroup ({
    shortName: new FormControl(),
    name: new FormControl(),
    latitude: new FormControl(),
    longitude: new FormControl(),
    surrenderNode: new FormControl(),
    collectionNode: new FormControl()
  });

  showDetails: boolean[] = [];
  nodeList: Nodes[] = [];
  displayedColumns: string[] = ['shortName', 'name', 'longitude', 'latitude', 'collectionNode', 'surrenderNode', 'actions'];
  dataSource = new MatTableDataSource<Nodes>();

  isAdding: boolean = false;

  mapper = new NodesMapper();

  @ViewChild(MatSort) sort : MatSort;

  constructor(
    private nodesService: NodesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ) {}
  ngOnInit()  {

    this.dataSource.filterPredicate = 
    (data: Nodes, filter: string) => data.name?.indexOf(filter) != -1;
    this.getNodes();

  }
  ngAfterViewInit() {
    
    // this.dataSource.sort = this.sort;
  }
  openSnackBar(error:any,) {
    this._snackBar.open(error, 'Bad request', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  getNodes() : void {    
    this.nodesService.getNodes().subscribe(
      (data) => {
        if (data && data.length > 0) {
          console.log (data)
          for (let i = 0; i < data.length; i ++){              
            this.nodeList.push(this.mapper.fromResponseToDto(new Nodes() as Nodes, data[i]));
            console.log(this.nodeList[i])       
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
    return this.isAdding = !this.isAdding;
  }

  isValidForm() : boolean {

    //verifications here
    return false;    
  }

  handleError(error: any){
    // for (let i = 0; i < error.lenght; i++) {
    
    if (error.collectionNode){
    this.openSnackBar(error.collectionNode.message);
    }
    // if (error.shortName){
    // this.openSnackBar(error.shortName.message);
    //   }
    // if (error.name){
    // this.openSnackBar(error.name.message);
    //   }
    // if (error.surrenderNode){
    // this.openSnackBar(error.surrenderNode.message);
    //   }
    // if (error.latitude){
    // this.openSnackBar(error.latitude.message);
    // }
  // }
      this.isAdding = true
  
  }
  submit() :void {
    // console.log(this.nodeForm.value)
    // console.log(this.nodeForm.value.shortName)

    var postEntity = new Nodes();    
    
    this.nodeForm.value.collectionNode = (this.nodeForm.value.collectionNode == undefined || this.nodeForm.value.collectionNode == null) ? false : (this.nodeForm.value.collectionNode == true ? true : false);
    this.nodeForm.value.surrenderNode = (this.nodeForm.value.surrenderNode == undefined  || this.nodeForm.value.surrenderNode == null) ? false : (this.nodeForm.value.surrenderNode == true ? true : false);
    console.log(this.nodeForm.value)
    postEntity = this.mapper.fromFormToDTO(this.nodeForm.value, postEntity)
    
    console.log(postEntity)

    this.nodesService.postNode(postEntity)
    .subscribe((data) => {
        if (data) { 
          this.nodeList.push(data); 
          this.dataSource = new MatTableDataSource(this.nodeList);          
          this.showDetails.push(false); 
          this.isAdding = !this.isAdding;       
        }
    },
    error => this.handleError(error.error.errors)
    )
  }
}
 

