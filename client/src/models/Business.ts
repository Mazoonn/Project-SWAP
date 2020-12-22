import { Place } from "./Place";

//Business owner class for dto
export class Business {
  business_owner_id: string;
  business_id: string;
  approve_by_admin: boolean;
  is_active: boolean;
  rating: number;
  opening_hours: string;
  closing_hours: string;
  place_info: Place;

  constructor(business: Business) {
    this.business_owner_id = business.business_owner_id ? business.business_owner_id : "";
    this.business_id = business.business_id ? business.business_id : "";
    this.closing_hours = business.closing_hours ? business.closing_hours : "";
    this.is_active = business.is_active ? business.is_active : false;
    this.approve_by_admin = business.approve_by_admin ? business.approve_by_admin : false;
    this.rating = business.rating ? business.rating : 0;
    this.opening_hours = business.opening_hours ? business.opening_hours : "";
    this.place_info = new Place(business.place_info);
  }
}

export class Business_owner_is_active {
  business_owner_id: string;
  business_id: string;
  is_active: boolean;

  constructor(business: Business) {
    this.business_owner_id = business.business_owner_id ? business.business_owner_id : "";
    this.business_id = business.business_id ? business.business_id : "";
    this.is_active = business.is_active ? business.is_active : false;
  }
}
