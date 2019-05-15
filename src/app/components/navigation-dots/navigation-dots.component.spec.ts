import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDotsComponent } from './navigation-dots.component';

describe('NavigationDotsComponent', () => {
  let component: NavigationDotsComponent;
  let fixture: ComponentFixture<NavigationDotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationDotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
