import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripulantTypeComponent } from './tripulant-type.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

describe('TripulantTypeComponent', () => {
  let component: TripulantTypeComponent;
  let fixture: ComponentFixture<TripulantTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripulantTypeComponent ],imports: [  HttpClientModule, MatDialogModule,ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripulantTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', () => {
    component.tripulantTypeForm.controls["description"].setValue("N30");
    expect(component.tripulantTypeForm.valid).toBeTruthy();
  });
});
