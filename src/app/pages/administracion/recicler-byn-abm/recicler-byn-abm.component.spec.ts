import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciclerBynAbmComponent } from './recicler-byn-abm.component';

describe('ReciclerBynAbmComponent', () => {
  let component: ReciclerBynAbmComponent;
  let fixture: ComponentFixture<ReciclerBynAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciclerBynAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciclerBynAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
