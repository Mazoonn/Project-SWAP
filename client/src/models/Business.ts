export class Business {
  business_owner_id: string;
  business_id: string;
  is_active: boolean;
  name: string;
  rating: number;
  opening_hours: string;
  closing_hours: string;
  description: string;
  Icon: string;

  constructor(business: Business) {
    this.business_owner_id = business.business_owner_id ? business.business_owner_id : "";
    this.business_id = business.business_id ? business.business_id : "";
    this.Icon = business.Icon ? business.Icon : "";
    this.closing_hours = business.closing_hours ? business.closing_hours : "";
    this.is_active = business.is_active ? business.is_active : false;
    this.name = business.name ? business.name : "";
    this.rating = business.rating ? business.rating : 0;
    this.opening_hours = business.opening_hours ? business.opening_hours : "";
    this.description = business.description ? business.description : "";
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
