import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignGridItemComponent } from './campaign-grid-item.component';

describe('CampaignGridItemComponent', () => {
  let component: CampaignGridItemComponent;
  let fixture: ComponentFixture<CampaignGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignGridItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
