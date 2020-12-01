import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Nodes} from '../../models/nodes';
import {NodesService} from '../../services/nodes.service'
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';

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

  @ViewChild(MatSort) sort: MatSort;
  showDetails: boolean[] = [];
  nodeList: Nodes[] = [];
  displayedColumns: string[] = ['shortName', 'name', 'longitude', 'latitude', 'collectionNode', 'surrenderNode', 'actions'];
  dataSource = new MatTableDataSource<Nodes>();

  isAdding: boolean = false;
 



  constructor(
    private nodesService: NodesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
    ) {}
  ngOnInit()  {
   
    this.getNodes();
  }
  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
  }


  getNodes() : void {
    this.nodesService.getNodes().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          this.nodeList = data; 
          this.dataSource = new MatTableDataSource(this.nodeList);
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

  applyFilter(event: Event) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  setAdd() : any {
    return this.isAdding = !this.isAdding;
  }

  isValidForm() : boolean {

    //verifications here
    return false;    
  }

  submit() :void {
    // console.log(this.nodeForm.value)
    // console.log(this.nodeForm.value.shortName)

    var postEnitity = new Nodes();

    postEnitity.shortName = this.nodeForm.value.shortName;
    postEnitity.name = this.nodeForm.value.name;
    postEnitity.latitude = this.nodeForm.value.latitude;
    postEnitity.longitude = this.nodeForm.value.longitude;
    postEnitity.collectionNode = this.nodeForm.value.collectionNode;
    postEnitity.surrenderNode = this.nodeForm.value.surrenderNode;
    
    this.nodesService.postNode(postEnitity)
    .subscribe((data) => {
        if (data) { 
          this.nodeList.push(data); 
          this.dataSource = new MatTableDataSource(this.nodeList);          
          this.showDetails.push(false); 
          this.isAdding = !this.isAdding;       
        }
    },
    )
  }
}
 

