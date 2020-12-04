import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulantTypeComponent } from './tripulant-type.component';

describe('TripulantTypeComponent', () => {
  let component: TripulantTypeComponent;
  let fixture: ComponentFixture<TripulantTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripulantTypeComponent ]
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
});
