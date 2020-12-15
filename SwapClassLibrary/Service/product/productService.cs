using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using SwapClassLibrary.EF;
using SwapClassLibrary.DTO;

namespace SwapClassLibrary.Service
{

    public class ProductService
    {
        public static List<productDTO> GetAllProducts(string businness_id, string clientId)
        {
            SwapDbConnection db = new SwapDbConnection();
            return db.products.Where(x => x.business_id == businness_id && x.business.business_owner_id == clientId).Select(x => new productDTO()
            {
                business_id = x.business_id,
                creation_date = x.creation_date,
                description = x.description,
                is_active = x.is_active,
                name = x.name,
                discount_end_date = x.discount_end_date,
                discount = x.discount,
                discount_start_date = x.discount_start_date,
                price = x.price,
                product_id = x.product_id
            }).ToList();
        }

        //get product by id
        public static productDTO GetProductByid(string product_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            productDTO product_obj = db.products.Select(x => new productDTO()
            {

                business_id = x.business_id,
                creation_date = x.creation_date,
                description = x.description,
                is_active = x.is_active,
                name = x.name,
                discount_end_date = x.discount_end_date,
                discount = x.discount,
                discount_start_date = x.discount_start_date,
                price = x.price,
                product_id = x.product_id
            })
                .FirstOrDefault(x => x.product_id == product_id);
            return product_obj;
        }

        //add product
        public static productDTO AddProduct(productDTO req, string ClientId)
        {
            SwapDbConnection db = new SwapDbConnection();
            business business = db.businesses.FirstOrDefault(b => b.business_owner_id == ClientId && b.place_id == req.business_id);
            if (business == null) return null;
            if (business.products.FirstOrDefault(p => p.name == req.name) != null) return null;

            product product_obj = new product()
            {
                product_id = IdService.generateID("product_id"),
                creation_date = DateTime.Now,
                is_active = req.is_active,
                name = req.name,
                business_id = req.business_id,
                discount = req.discount,
                discount_start_date =  req.discount_start_date,
                discount_end_date = req.discount_end_date,
                price = req.price,
                description = req.description
            };
            db.products.Add(product_obj);
            db.SaveChanges();

            return new productDTO
            {
                business_id = req.business_id,
                creation_date = product_obj.creation_date,
                description = product_obj.description,
                discount = product_obj.discount,
                discount_end_date = product_obj.discount_end_date,
                discount_start_date = product_obj.discount_start_date,
                is_active = product_obj.is_active,
                name = product_obj.name,
                price = product_obj.price,
                product_id = product_obj.product_id
            };
        }

        public static bool deleteProduct(string business_id, string product_id, string clientId)
        {
            SwapDbConnection db = new SwapDbConnection();
            product product_obj = db.products.FirstOrDefault(x => x.business_id == business_id && x.product_id == product_id && x.business.business_owner_id == clientId);
            if (product_obj == null)
                return false;
            db.products.Remove(product_obj);
            db.SaveChanges();
            return true;
        }

        public static bool updateProduct(productDTO product_req, string clientId)
        {
            SwapDbConnection db = new SwapDbConnection();
            product product = db.products.FirstOrDefault(p => p.business_id == product_req.business_id && p.product_id == product_req.product_id && p.business.business_owner_id == clientId);
            if (product == null) return false;
            product.price = product_req.price;
            product.name = product_req.name;
            product.description = product_req.description;
            product.discount = product_req.discount;
            product.discount_end_date = product_req.discount_end_date;
            product.discount_start_date = product_req.discount_start_date;
            db.SaveChanges();
            return true;
        }
    }
}
