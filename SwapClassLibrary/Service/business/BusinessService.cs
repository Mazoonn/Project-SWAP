using System;
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
                business_id = b.business_id,
                business_owner_id = b.business_owner_id,
                is_active = b.is_active,
                name = b.name,
                description = b.description,
                ratring = b.ratring,
                opening_houers = b.opening_houers,
                closing_houers = b.closing_houers,
            }).ToList();
            return bussinesses;
        }

        public static bool AddBusiness(bussinessDTO bussiness)
        {
            SwapDbConnection db = new SwapDbConnection();
            business business = db.businesses.Where(b => b.business_owner_id == bussiness.business_owner_id && b.name == bussiness.name).FirstOrDefault();
            if (business != null)
            {
                business Business_to_add = new business()
                {
                    business_id = bussiness.business_id,
                    business_owner_id = bussiness.business_owner_id,
                    is_active = bussiness.is_active,
                    name = bussiness.name,
                    description = bussiness.description,
                    ratring = bussiness.ratring,
                    opening_houers = bussiness.opening_houers,
                    closing_houers = bussiness.closing_houers,
                };
                db.businesses.Add(Business_to_add);
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public static bool EditBusiness(bussinessDTO business)
        {
            SwapDbConnection db = new SwapDbConnection();
            business business_to_edit = db.businesses.FirstOrDefault(b => b.business_owner_id == business.business_owner_id && b.business_id == business.business_id);
            if (business == null ) return false;
            business_to_edit.name= business.name;
            business_to_edit.description = business.description;
            business_to_edit.ratring = business.ratring;
            business_to_edit.opening_houers = business.opening_houers;
            business_to_edit.closing_houers = business.closing_houers;
            db.SaveChanges();
            return true;
        }

        public static bool ChangeActiveBusiness(bussinessDTO business)
        {
            SwapDbConnection db = new SwapDbConnection();
            business business_to_edit = db.businesses.FirstOrDefault(b => b.business_owner_id == business.business_owner_id && b.business_id == business.business_id);

            if (business == null) return false;
            business_to_edit.is_active = business.is_active;
            db.SaveChanges();
            return true;
        }

        public static bool DeleteBusiness(string business_owner_id, string business_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            business Business = db.businesses.Where(b => b.business_owner_id == business_owner_id&&b.business_id == business_id).FirstOrDefault();
            if (Business != null)
            {
                db.businesses.Remove(Business);
                //TODO remove all prodects of this bussniss check if it is posible from the DB
                db.SaveChanges();
                return true;
            }
            return false;
        }

    }

}
