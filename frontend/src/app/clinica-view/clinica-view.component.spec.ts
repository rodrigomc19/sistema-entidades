import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaViewComponent } from './clinica-view.component';

describe('ClinicaViewComponent', () => {
  let component: ClinicaViewComponent;
  let fixture: ComponentFixture<ClinicaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicaViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
