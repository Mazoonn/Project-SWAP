export class Business {
  business_owner_id: string;
  business_id: string;
  is_active: boolean;
  name: string;
  rating: number;
  opening_houers: string;
  closing_houers: string;
  description: string;
  Icon: string;

  constructor(business: Business) {
    this.business_owner_id = business.business_owner_id ? business.business_owner_id : "";
    this.business_id = business.business_id ? business.business_id : "";
    this.Icon = business.Icon ? business.Icon : "";
    this.closing_houers = business.closing_houers ? business.closing_houers : "";
    this.is_active = business.is_active ? business.is_active : false;
    this.name = business.name ? business.name : "";
    this.rating = business.rating ? business.rating : 0;
    this.opening_houers = business.opening_houers ? business.opening_houers : "";
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
