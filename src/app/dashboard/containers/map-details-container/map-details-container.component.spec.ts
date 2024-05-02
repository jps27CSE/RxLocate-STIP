import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDetailsContainerComponent } from './map-details-container.component';

describe('MapContainerComponent', () => {
  let component: MapDetailsContainerComponent;
  let fixture: ComponentFixture<MapDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapDetailsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
