export class Place {
  place_id: string;
  creation_date: string;
  latitude: number;
  longitude: number;
  country: string;
  street: string;
  street_number: string;
  post_code: string;
  city: string;

  constructor(place: Place) {
    this.place_id = place.place_id ? place.place_id : "";
    this.creation_date = place.creation_date ? place.creation_date : "";
    this.latitude = place.latitude ? place.latitude : 0;
    this.longitude = place.longitude ? place.longitude : 0;
    this.country = place.country ? place.country : "";
    this.street = place.street ? place.street : "";
    this.street_number = place.street_number ? place.street_number : "";
    this.post_code = place.post_code ? place.post_code : "";
    this.city = place.city ? place.city : "";
  }
}

export class PlaceCategory {
  sub_id: string;
  main_id: string;
  place_id: string;
  constructor(place: PlaceCategory) {
    this.sub_id = place.sub_id ? place.sub_id : "";
    this.main_id = place.main_id ? place.main_id : "";
    this.place_id = place.place_id ? place.place_id : "";
  }
}
