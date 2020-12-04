import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGLXComponent } from './import-glx.component';

describe('ImportGLXComponent', () => {
  let component: ImportGLXComponent;
  let fixture: ComponentFixture<ImportGLXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportGLXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGLXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
