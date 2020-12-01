import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TripulantType} from '../../models/tripulant-type';
import {TripulantTypeService} from '../../services/tripulant-type.service'
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tripulant-type',
  templateUrl: './tripulant-type.component.html',
  styleUrls: ['./tripulant-type.component.css']
})
export class TripulantTypeComponent implements  OnInit  {

  tripList: TripulantType[] = [];
  displayedColumns: string[] = ['description', 'actions'];
  dataSource = new MatTableDataSource<TripulantType>();

  constructor(
    private tripulantTypeService: TripulantTypeService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
    ) {}
  ngOnInit()  {
   
    this.getTripulantTypes();
  }
  
  applyFilter(event: Event) {
    // let dataSource = new MatTableDataSource(this.nodeList);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTripulantTypes() : void {
    this.tripulantTypeService.getTripulantType().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          this.tripList = data; 
          this.dataSource = new MatTableDataSource(this.tripList);
     
        };
        
      }
     
    ); 
  };
}
