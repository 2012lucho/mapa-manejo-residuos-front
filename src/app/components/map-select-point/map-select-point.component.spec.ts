import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectPointComponent } from './map-select-point.component';

describe('MapSelectPointComponent', () => {
  let component: MapSelectPointComponent;
  let fixture: ComponentFixture<MapSelectPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSelectPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
