import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineLocationSearchContainerComponent } from './medicine-location-search-container.component';

describe('MedicineLocationSearchContainerComponent', () => {
  let component: MedicineLocationSearchContainerComponent;
  let fixture: ComponentFixture<MedicineLocationSearchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineLocationSearchContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicineLocationSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
