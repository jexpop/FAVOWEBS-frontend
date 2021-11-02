import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAddComponent } from './web-add.component';

describe('WebAddComponent', () => {
  let component: WebAddComponent;
  let fixture: ComponentFixture<WebAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
