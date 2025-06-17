import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDetails } from './address-details';

describe('AddressDetails', () => {
  let component: AddressDetails;
  let fixture: ComponentFixture<AddressDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
