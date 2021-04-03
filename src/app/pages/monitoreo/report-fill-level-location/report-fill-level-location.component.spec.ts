import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFillLevelLocationComponent } from './report-fill-level-location.component';

describe('ReportFillLevelLocationComponent', () => {
  let component: ReportFillLevelLocationComponent;
  let fixture: ComponentFixture<ReportFillLevelLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFillLevelLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFillLevelLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
