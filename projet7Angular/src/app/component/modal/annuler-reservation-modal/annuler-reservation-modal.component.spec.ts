import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulerReservationModalComponent } from './annuler-reservation-modal.component';

describe('AnnulerReservationModalComponent', () => {
  let component: AnnulerReservationModalComponent;
  let fixture: ComponentFixture<AnnulerReservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnulerReservationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnulerReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
