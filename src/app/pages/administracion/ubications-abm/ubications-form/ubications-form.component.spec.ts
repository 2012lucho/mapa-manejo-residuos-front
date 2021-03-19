import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicationsFormComponent } from './ubications-form.component';

describe('UbicationsFormComponent', () => {
  let component: UbicationsFormComponent;
  let fixture: ComponentFixture<UbicationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
