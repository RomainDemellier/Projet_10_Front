import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerUsagerComponent } from './editer-usager.component';

describe('EditerUsagerComponent', () => {
  let component: EditerUsagerComponent;
  let fixture: ComponentFixture<EditerUsagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerUsagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerUsagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
