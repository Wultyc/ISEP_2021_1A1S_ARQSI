import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TripulantService } from '../../services/tripulant.service';
import { TripulantServiceService } from '../../services/tripulant-service.service';
import { TripulantServiceMapper } from '../../models/mappers/tripulantServiceMapper';
import { TripulantServicePost } from '../../models/tripulantServices';
import { Tripulant } from '../../models/tripulant';
import { TripulantMapper } from '../../models/mappers/tripulantMapper';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tripulant-service',
  templateUrl: './tripulant-service.component.html',
  styleUrls: ['./tripulant-service.component.css'],
  providers: [TripulantServiceMapper, TripulantMapper]
})
export class TripulantServiceComponent implements OnInit {

  tripulantList: Tripulant[] = [];
  tripulantServiceForm = new FormGroup ({
    tripulantId: new FormControl(),
    date: new FormControl(new Date())
  });
  
  isAdding: boolean = false;
  hasError: boolean = false;
  errorMessages: any[] = [];
  hasSubmited: boolean = false;
  submitMessages: any[] = [];

  constructor(
    private tripulantServiceMapper: TripulantServiceMapper,
    private tripulantsService: TripulantService,
    private tripulantMapper: TripulantMapper,
    private tripulantServiceService: TripulantServiceService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getTripulants();
  }

  getTripulants(){
    this.tripulantsService.getTripulants().subscribe(
      (data) => {
        if (data && data.length > 0) { 
          data.forEach(v => this.tripulantList.push(this.tripulantMapper.fromResponseToDto(new Tripulant(), v)))
        };
      }
    ); 
  }

  submit() :void {
    var postEntity = new TripulantServicePost();
    this.errorMessages = [];
    this.submitMessages = [];

    this.tripulantServiceForm.value.startDate = new Date(this.tripulantServiceForm.value.date.valueOf() - this.tripulantServiceForm.value.date.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, ''); 
    console.log(this.tripulantServiceForm.value)
    postEntity = this.tripulantServiceMapper.fromFormToCreate(this.tripulantServiceForm.value, new TripulantServicePost)

    this.tripulantServiceService.postTripulantService(postEntity)
    .subscribe(
      (data) => {
        if (data) { 
          //this.tripulantServiceList.push(data);
          // this.showDetails.push(false);
          this.isAdding = !this.isAdding;
        }
        this.hasSubmited = true;
        this.submitMessages.push("Tripulant Service was submited.");
      },
      (error) => { 
        this.hasError = true;
        this.errorMessages.push("Error Submiting the Tripulant Service.");
        if (error.error != null && error.error.title != null && error.error.message == null) {
          this.errorMessages.push(error.error.title);
        }   
      }
    )
  }

}
