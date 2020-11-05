export class Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  creation_date: string;
  discount_start_date: string;
  discount_end_date: string;
  is_active: boolean;
  business_id: string;

  constructor(product: Product) {
    this.product_id = product.product_id ? product.product_id : "";
    this.business_id = product.business_id ? product.business_id : "";
    this.price = product.price ? product.price : 0;
    this.discount = product.discount ? product.discount : 0;
    this.is_active = product.is_active ? product.is_active : false;
    this.name = product.name ? product.name : "";
    this.creation_date = product.creation_date ? product.creation_date : "";
    this.discount_start_date = product.discount_start_date ? product.discount_start_date : "";
    this.description = product.description ? product.description : "";
    this.discount_end_date = product.discount_end_date ? product.discount_end_date : "";
  }
}
export class Product_is_active {
  business_id: string;
  product_id: string;
  is_active: boolean;

  constructor(business: Product) {
    this.business_id = business.business_id ? business.business_id : "";
    this.product_id = business.product_id ? business.product_id : "";
    this.is_active = business.is_active ? business.is_active : false;
  }
}
export class Product_business_ids {
  business_id: string;
  product_id: string;

  constructor(business: Product) {
    this.business_id = business.business_id ? business.business_id : "";
    this.product_id = business.product_id ? business.product_id : "";
  }
}
