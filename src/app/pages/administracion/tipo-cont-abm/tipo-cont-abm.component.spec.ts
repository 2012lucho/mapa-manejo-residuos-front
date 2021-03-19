import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContAbmComponent } from './tipo-cont-abm.component';

describe('TipoContAbmComponent', () => {
  let component: TipoContAbmComponent;
  let fixture: ComponentFixture<TipoContAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoContAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoContAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
