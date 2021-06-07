import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLivresComponent } from './liste-livres.component';

describe('LivreComponent', () => {
  let component: ListeLivresComponent;
  let fixture: ComponentFixture<ListeLivresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeLivresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLivresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
