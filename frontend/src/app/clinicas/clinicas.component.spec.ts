import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicasComponent } from './clinicas.component';

describe('ClinicasComponent', () => {
  let component: ClinicasComponent;
  let fixture: ComponentFixture<ClinicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
