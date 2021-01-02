import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkBlocksComponent } from './work-blocks.component';

describe('WorkBlocksComponent', () => {
  let component: WorkBlocksComponent;
  let fixture: ComponentFixture<WorkBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkBlocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
