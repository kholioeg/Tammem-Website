import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDetailsDialogComponent } from './district-details-dialog.component';

describe('DistrictDetailsDialogComponent', () => {
  let component: DistrictDetailsDialogComponent;
  let fixture: ComponentFixture<DistrictDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
