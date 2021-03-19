import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsAbmComponent } from './sensors-abm.component';

describe('SensorsAbmComponent', () => {
  let component: SensorsAbmComponent;
  let fixture: ComponentFixture<SensorsAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorsAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorsAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
