//client info class for dto

export class clientInfo {
  client_id: string;
  first_name: string;
  last_name: string;
  birthday_date: string;
  email: string;
  sex: string;
  last_login: string;
  phone: string;
  business_owner_request: string;

  constructor(client_info: clientInfo) {
    this.client_id = client_info.client_id ? client_info.client_id : "";
    this.first_name = client_info.first_name ? client_info.first_name : "";
    this.last_name = client_info.last_name ? client_info.last_name : "";
    this.birthday_date = client_info.birthday_date ? client_info.birthday_date : "";
    this.email = client_info.email ? client_info.email : "";
    this.sex = client_info.sex ? client_info.sex : "";
    this.last_login = client_info.last_login ? client_info.last_login : "";
    this.phone = client_info.phone ? client_info.phone : "";
    this.business_owner_request = client_info.business_owner_request ? client_info.business_owner_request : "";
  }
}

export class client_info {
  old_password: string;
  new_password: string;
  slat: string;

  constructor(business: client_info) {
    this.old_password = business.old_password ? business.old_password : "";
    this.new_password = business.new_password ? business.new_password : "";
    this.slat = business.slat ? business.slat : "";
  }
}
