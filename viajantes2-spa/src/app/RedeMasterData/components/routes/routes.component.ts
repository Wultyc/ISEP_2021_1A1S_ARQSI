import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Route} from '../../models/route';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import { RoutesService } from '../../services/routes.service';


@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit, AfterViewInit {
  formControl = new FormControl('', [
     Validators.required,
  ]);


  routeList: Route[] = [];
  constructor( private routeService: RoutesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

    dataSource = new MatTableDataSource<Route>();
    showDetails: boolean[] = [];
    isAdding: boolean = false;
    displayedColumns: string[] = ['shortName', 'name', 'longitude', 'latitude', 'collectionNode', 'surrenderNode', 'actions'];

    @ViewChild(MatSort) sort : MatSort;

  ngOnInit(): void {
    this.getRoutes();
  }
    ngAfterViewInit() {
    
    // this.dataSource.sort = this.sort;
  }

  getRoutes() : void {
    this.routeService.getRoutes().subscribe(
      (data) => {
        console.log(data)
        if (data && data.length > 0) { 
          this.routeList = data; 
          this.dataSource = new MatTableDataSource(this.routeList);

          

          this.dataSource.sort = this.sort;
          for (let i = 0; i < data.length; i++) {
            this.showDetails.push(false);
          }         
        };
        }
      );
    }

    
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
      return this.isAdding = !this.isAdding;
    }
  
    isValidForm() : boolean {
  
      //verifications here
      return false;    
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
          }
      },
      // error => this.handleError(error.error.errors)
      )
    }
  }  


