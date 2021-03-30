import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCampaignComponent } from './map-campaign.component';

describe('MapCampaignComponent', () => {
  let component: MapCampaignComponent;
  let fixture: ComponentFixture<MapCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
