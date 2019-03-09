import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceSearchComponentComponent } from './advance-search-component.component';

describe('AdvanceSearchComponentComponent', () => {
  let component: AdvanceSearchComponentComponent;
  let fixture: ComponentFixture<AdvanceSearchComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceSearchComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
