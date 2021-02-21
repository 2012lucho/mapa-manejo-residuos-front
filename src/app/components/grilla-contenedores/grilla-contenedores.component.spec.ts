import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaContenedoresComponent } from './grilla-contenedores.component';

describe('GrillaContenedoresComponent', () => {
  let component: GrillaContenedoresComponent;
  let fixture: ComponentFixture<GrillaContenedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaContenedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaContenedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
