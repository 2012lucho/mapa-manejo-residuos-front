import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillLevelComponent } from './fill-level.component';

describe('FillLevelComponent', () => {
  let component: FillLevelComponent;
  let fixture: ComponentFixture<FillLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
