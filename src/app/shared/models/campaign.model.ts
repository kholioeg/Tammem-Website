export class Campaign {
  id: string;
  campaign_number: number ;
  category_code: number;
  campaign_type: string;
  location_name: string;
  location_point: Geolocation;
  qr_code: string;
  qr_image: string;
  rent_type: string;
  campaign_ownership: string;
  date_time: Date;
  more_details: {
    air_conditioning: boolean;
    bathrooms: number;
    bedrooms: number;
    building_age: number;
    building_side_code: string;
    building_side: string;
    car_garage: boolean;
    coverage: Array<string>
    driver_room: boolean;
    elevator: boolean;
    extension_room: boolean;
    fire_chimney: boolean;
    garden: boolean;
    hall_staircase: boolean;
    kitchens: number;
    living_rooms: number;
    maid_room: boolean;
    new_building: boolean;
    other_features: string;
    street_wide: number;
    swimming_pool: boolean;
  };
  images_urls: Array<string>;
  video_urls: Array<string>;
  thumbnail_url: string;
  has_thumbnail: boolean;
  is_default_image: boolean;
  last_edit_date_time: Date;
  visits_counts_daily: number;
  advertiser_uid: string;
  phone_number: string;
  seen_count: number;
  search_data: {
    category_ar: string,
    category_en: string,
    city_ar: string,
    city_en: string,
    country_ar: string,
    country_en: string,
    district_ar: string,
    district_en: string,
    region_ar: string,
    region_en: string,
  };
  area: number;
  campaign_status: string;
  description: string;
  price: number;
  is_active: boolean;
  is_paid: boolean;
  verified_building_instrument_number: number;
  verified_building_instrument_image_url: string;
  verified_building_identity_type: string;
  verified_building_identity_number: number;
  verified_building_is_confirmed: boolean;

  constructor(campaign: Campaign) {
    this.id =  campaign.id;
    this.campaign_number =  campaign.campaign_number ;
    this.category_code =  campaign.category_code;
    this.campaign_type =  campaign.campaign_type;
    this.location_name =  campaign.location_name;
    this.location_point =  campaign.location_point;
    this.qr_code =  campaign.qr_code;
    this.qr_image =  campaign.qr_image;
    this.rent_type =  campaign.rent_type;
    this.campaign_ownership =  campaign.campaign_ownership;
    this.date_time =  campaign.date_time;
    this.more_details =  campaign.more_details;
    this.images_urls = campaign.images_urls;
    this.video_urls = campaign.video_urls;
    this.thumbnail_url = campaign.thumbnail_url;
    this.has_thumbnail = campaign.has_thumbnail;
    this.is_default_image = campaign.is_default_image;
    this.last_edit_date_time = campaign.last_edit_date_time;
    this.visits_counts_daily = campaign.visits_counts_daily;
    this.advertiser_uid = campaign.advertiser_uid;
    this.phone_number = campaign.phone_number;
    this.search_data = campaign.search_data;
    this.area =  campaign.area;
    this.campaign_status =  campaign.campaign_status;
    this.description =  campaign.description;
    this.price =  campaign.price;
    this.is_active =  campaign.is_active;
    this.is_paid =  campaign.is_paid;
    this.verified_building_instrument_number =  campaign.verified_building_instrument_number;
    this.verified_building_instrument_image_url =  campaign.verified_building_instrument_image_url;
    this.verified_building_identity_type =  campaign.verified_building_identity_type;
    this.verified_building_identity_number =  campaign.verified_building_identity_number;
    this.verified_building_is_confirmed =  campaign.verified_building_is_confirmed;
  }
}


