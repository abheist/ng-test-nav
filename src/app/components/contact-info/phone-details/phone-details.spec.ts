import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneDetails } from './phone-details';

describe('PhoneDetails', () => {
  let component: PhoneDetails;
  let fixture: ComponentFixture<PhoneDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
