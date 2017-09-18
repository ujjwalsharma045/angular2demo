import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageeditComponent } from './pageedit.component';

describe('PageeditComponent', () => {
  let component: PageeditComponent;
  let fixture: ComponentFixture<PageeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
