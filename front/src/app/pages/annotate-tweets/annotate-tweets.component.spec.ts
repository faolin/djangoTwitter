import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotateTweetsComponent } from './annotate-tweets.component';

describe('AnnotateTweetsComponent', () => {
  let component: AnnotateTweetsComponent;
  let fixture: ComponentFixture<AnnotateTweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotateTweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotateTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
