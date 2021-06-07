import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntDetailModalComponent } from './emprunt-detail-modal.component';

describe('EmpruntDetailModalComponent', () => {
  let component: EmpruntDetailModalComponent;
  let fixture: ComponentFixture<EmpruntDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpruntDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpruntDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
