﻿using System;
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
        public static List<productDTO> GetAllProduct(string businness_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            int count = db.products.Where(b=>b.business_id == businness_id).Count();
            if (count == 0)
                return null;
            List<productDTO> products = db.products.Select(x => new productDTO()
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
            }).Where(x => x.business_id == businness_id).ToList();
            return products;

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
        public static product AddProduct(string name, string business_id, double discount, DateTime start_date, DateTime end_date, double price, string description)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (db.products.FirstOrDefault(p => p.name == name && p.business_id == business_id) != null) return null;

            product product_obj = new product()
            {
                product_id = IdService.generateID("product_id"),
                creation_date = DateTime.Now,
                is_active = false,
                name = name,
                business_id = business_id,
                discount = discount,
                discount_start_date = start_date,
                discount_end_date = end_date,
                price = price,
                description = description
            };
            db.products.Add(product_obj);
            db.SaveChanges();
            return product_obj;
        }

        public static bool deleteProduct(string business_id, string product_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            product product_obj = db.products.FirstOrDefault(x => x.business_id == business_id && x.product_id == product_id);
            if (product_obj == null)
                return false;
            db.products.Remove(product_obj);
            db.SaveChanges();
            return true;
        }

        public static bool updateProduct(string business_id, string product_id, productDTO product_req)
        {
            SwapDbConnection db = new SwapDbConnection();
            product product = db.products.FirstOrDefault(p => p.business_id == business_id && p.product_id == product_id);
            if (product == null) return false;
            product.price = product_req.price;
            db.SaveChanges();
            product.name = product_req.name;
            db.SaveChanges();
            product.description = product_req.description;
            db.SaveChanges();
            product.discount = product_req.discount;
            db.SaveChanges();
            product.discount_end_date = product_req.discount_end_date;
            db.SaveChanges();
            product.discount_start_date = product_req.discount_start_date;
            db.SaveChanges();
            return true;
        }
    }
}
