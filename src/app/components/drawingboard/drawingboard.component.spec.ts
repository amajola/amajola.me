import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingboardComponent } from './drawingboard.component';

describe('DrawingboardComponent', () => {
  let component: DrawingboardComponent;
  let fixture: ComponentFixture<DrawingboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
