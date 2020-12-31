import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripulantComponent } from './tripulant.component';

describe('TripulantComponent', () => {
  let component: TripulantComponent;
  let fixture: ComponentFixture<TripulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripulantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
