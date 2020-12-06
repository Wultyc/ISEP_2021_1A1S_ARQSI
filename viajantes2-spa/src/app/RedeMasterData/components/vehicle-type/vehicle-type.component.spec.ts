import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { VehicleTypeComponent } from './vehicle-type.component';

describe('VehicleTypeComponent', () => {
  let component: VehicleTypeComponent;
  let fixture: ComponentFixture<VehicleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTypeComponent ],imports: [ HttpClientModule, MatDialogModule,ReactiveFormsModule ]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', () => {
    component.vehicleTypeForm.controls["description"].setValue("Manual Diesel Car");
    component.vehicleTypeForm.controls["autonomy"].setValue("Manual");
    component.vehicleTypeForm.controls["costPerKilometer"].setValue(1);
    component.vehicleTypeForm.controls["averageCost"].setValue(13);
    component.vehicleTypeForm.controls["averageSpeed"].setValue(57);
    component.vehicleTypeForm.controls["fuel"].setValue("Diesel");

    expect(component.vehicleTypeForm.valid).toBeTruthy();
  });
});
