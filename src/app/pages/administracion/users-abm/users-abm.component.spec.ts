import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAbmComponent } from './users-abm.component';

describe('UsersAbmComponent', () => {
  let component: UsersAbmComponent;
  let fixture: ComponentFixture<UsersAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
