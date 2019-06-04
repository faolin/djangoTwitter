import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUsersTableComponent } from './top-users-table.component';

describe('TopUsersTableComponent', () => {
  let component: TopUsersTableComponent;
  let fixture: ComponentFixture<TopUsersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopUsersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
