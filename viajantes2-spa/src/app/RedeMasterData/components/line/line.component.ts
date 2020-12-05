import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Line} from '../../models/line';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'
import { LinesService } from '../../services/lines.service';


@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit, AfterViewInit  {
  formControl = new FormControl('', [
    Validators.required,
 ]);
 errorMessage: any;

  lineForm = new FormGroup ({
    code: new FormControl(),
    name: new FormControl(),
    color: new FormControl()
  });

 showDetails: boolean[] = [];
 lineList: Line[] = [];
 displayedColumns: string[] = ['code', 'name', 'color', 'beginNode', 'finalNode', 'actions'];
 dataSource = new MatTableDataSource<Line>();

 isAdding: boolean = false;


 @ViewChild(MatSort) sort : MatSort;

 constructor(
   private linesService: LinesService,
   public dialog: MatDialog,
   private formBuilder: FormBuilder,
   private _snackBar: MatSnackBar
   ) {}
 ngOnInit()  {
   this.dataSource.filterPredicate = 
   (data: Line, filter: string) => data.name?.indexOf(filter) != -1;
   this.getLines();
 }
 ngAfterViewInit() {
   
   // this.dataSource.sort = this.sort;
 }

 getLines() : void {    
  this.linesService.getLines().subscribe(
    (data) => {
      if (data && data.length > 0) {
        console.log(data);
        this.lineList = data;
          };
        this.dataSource = new MatTableDataSource(this.lineList);
        this.dataSource.sort = this.sort;
        for (let i = 0; i < data.length; i++) {
          this.showDetails.push(false);
        }        
      }  
    ); 
  };

  applyFilter(filterValue: string) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  setAdd() : any {
    return this.isAdding = !this.isAdding;  
  }

  //will be implemented as front end validation
  isValidForm() : boolean {
    //verifications here
    return false;    
  }
}
