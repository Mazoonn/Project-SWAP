﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using SwapClassLibrary.EF;
using SwapClassLibrary.DTO;
using System.Data.Entity.Validation;

namespace SwapClassLibrary.Service
{
    public class BusinessService
    {
        public static List<bussinessDTO> GetAllBusinesses(string business_owner_id, bool test = false)
        {
            SwapDbConnection db = new SwapDbConnection();
            int count = db.businesses.Where(b => b.business_owner_id == business_owner_id).Count();
            if (count == 0 || test)
                return null;
            List<bussinessDTO> bussinesses = db.businesses.Select(b => new bussinessDTO()
            {
                place_id = b.place_id,
                business_owner_id = b.business_owner_id,
                is_active = b.is_active,
                name = b.place.name,
                description = b.place.description,
                rating =  b.rating,
                opening_hours = b.opening_hours,
                closing_hours = b.closing_hours,
            }).Where(b => b.business_owner_id == business_owner_id).ToList();
            return bussinesses;
        }

        public static bool AddBusiness(bussinessDTO bussiness)
        {

            SwapDbConnection db = new SwapDbConnection();
            if (bussiness.place_id == null)
                bussiness.place_id = IdService.generateID("place_id");
            business business_obj = db.businesses.FirstOrDefault(b => b.business_owner_id == bussiness.business_owner_id && b.place_id == bussiness.place_id);
            if (business_obj == null)
            {
                business business_to_add = new business()
                {
                    place_id = bussiness.place_id,
                    business_owner_id = bussiness.business_owner_id,
                    is_active = bussiness.is_active,
                    rating = 0 ,
                    opening_hours = bussiness.opening_hours,
                    closing_hours = bussiness.closing_hours,
                    approve_by_admin = false,
                    //place = new place()
                    //{
                    //    place_id = bussiness.place_id,

                    //}
                };
                db.businesses.Add(business_to_add);
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public static bool EditBusiness(bussinessDTO business)
        {
            SwapDbConnection  db = new SwapDbConnection();
            business business_to_edit = db.businesses.FirstOrDefault(b => b.business_owner_id == business.business_owner_id && b.place_id == business.place_id);
            if (business_to_edit == null ) return false;
            business_to_edit.place.name= business.name;
            business_to_edit.place.description = business.description;
            business_to_edit.opening_hours = business.opening_hours;
            business_to_edit.closing_hours = business.closing_hours;
            db.SaveChanges();
            return true;
        }

        public static bool ChangeActiveBusiness(bussinessDTO business)
        {
            SwapDbConnection db = new SwapDbConnection();
            business business_to_edit = db.businesses.FirstOrDefault(b => b.place_id == business.place_id);

            if (business_to_edit == null) return false;
            business_to_edit.is_active = business.is_active;
            db.SaveChanges();
            return true;
        }

        public static bool DeleteBusiness(string business_owner_id, string place_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            business Business = db.businesses.Where(b => b.business_owner_id == business_owner_id&&b.place_id == place_id).FirstOrDefault();
            if (Business != null)
            {
                List<product> products = db.products.Where(p => p.business_id == place_id).ToList();
                if(products!=null)
                {
                    for (int i = 0; i < products.Count(); i++)
                        db.products.Remove(products[i]);
                }
                Event event_obj = db.Events.FirstOrDefault(e => e.place_id == place_id);
                if(event_obj!= null) db.Events.Remove(event_obj);
                r_place_sub_and_main_category r_object = db.r_place_sub_and_main_category.FirstOrDefault(r => r.place_id == place_id);
                if (r_object != null) db.r_place_sub_and_main_category.Remove(r_object);
                place place_obj = db.places.FirstOrDefault(p => p.place_id == place_id);
                if (place_obj!=null)
                 db.places.Remove(place_obj);
                db.businesses.Remove(Business);
                db.SaveChanges();
                return true;
            }
            return false;
        }

    }

}
