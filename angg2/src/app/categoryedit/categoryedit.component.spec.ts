import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryeditComponent } from './categoryedit.component';

describe('CategoryeditComponent', () => {
  let component: CategoryeditComponent;
  let fixture: ComponentFixture<CategoryeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
