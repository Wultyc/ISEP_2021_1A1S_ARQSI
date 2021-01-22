import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulantServiceComponent } from './tripulant-service.component';

describe('TripulantServiceComponent', () => {
  let component: TripulantServiceComponent;
  let fixture: ComponentFixture<TripulantServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripulantServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripulantServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
