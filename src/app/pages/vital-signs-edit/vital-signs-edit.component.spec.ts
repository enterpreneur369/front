import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignsEditComponent } from './vital-signs-edit.component';

describe('VitalSignsEditComponent', () => {
  let component: VitalSignsEditComponent;
  let fixture: ComponentFixture<VitalSignsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalSignsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VitalSignsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
