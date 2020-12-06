import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NodesComponent } from './nodes.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('NodesComponent', () => {
  let component: NodesComponent;
  let fixture: ComponentFixture<NodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodesComponent ],imports: [  HttpClientModule, MatDialogModule,ReactiveFormsModule, MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', () => {
    component.nodeForm.controls["shortName"].setValue("N30");
    component.nodeForm.controls["name"].setValue("Node 30");
    component.nodeForm.controls["latitude"].setValue(2);
    component.nodeForm.controls["longitude"].setValue(1);
    component.nodeForm.controls["surrenderNode"].setValue("");
    component.nodeForm.controls["collectionNode"].setValue("");

    expect(component.nodeForm.valid).toBeTruthy();
  });

});
