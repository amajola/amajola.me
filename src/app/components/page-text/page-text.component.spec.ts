import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTextComponent } from './page-text.component';

describe('PageTextComponent', () => {
  let component: PageTextComponent;
  let fixture: ComponentFixture<PageTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
