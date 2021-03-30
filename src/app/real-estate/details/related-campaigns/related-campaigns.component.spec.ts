import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedCampaignsComponent } from './related-campaigns.component';

describe('RelatedCampaignsComponent', () => {
  let component: RelatedCampaignsComponent;
  let fixture: ComponentFixture<RelatedCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedCampaignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
