import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaFormComponent } from './clinica-form.component';

describe('ClinicaFormComponent', () => {
  let component: ClinicaFormComponent;
  let fixture: ComponentFixture<ClinicaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
