import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';


import { LineComponent } from './line.component';

describe('LineComponent', () => {
  let component: LineComponent;
  let fixture: ComponentFixture<LineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineComponent ],imports: [  HttpClientModule, MatDialogModule,ReactiveFormsModule, MatSnackBarModule,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be valid', () => {
    component.lineForm.controls["code"].setValue("L30");
    component.lineForm.controls["name"].setValue("Line 30");
    component.lineForm.controls["color"].setValue("Red");
    component.lineForm.controls["beginNode"].setValue("N30");
    component.lineForm.controls["finalNode"].setValue("N20");
    component.lineForm.controls["tripulantType"].setValue("Manual Diesel Car");
    component.lineForm.controls["vehicleType"].setValue("");
    expect(component.lineForm.valid).toBeTruthy();
  });

});
