import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicationsAbmComponent } from './ubications-abm.component';

describe('UbicationsAbmComponent', () => {
  let component: UbicationsAbmComponent;
  let fixture: ComponentFixture<UbicationsAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicationsAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicationsAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
