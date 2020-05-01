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

    public class SubCategoryService
    {
        public static List<categoryDTO> GetAllSubCategorys()//matan - need to enter sub categorys values 
        {
            SwapDbConnection db = new SwapDbConnection();
            int count = db.sub_category.Count();
            if (count == 0)
                return null;
            List<categoryDTO> sub_category = db.sub_category.Select(x => new categoryDTO()
            {
                creation_date = x.creation_date,
                name = x.name,
                id = x.sub_id,
                is_active = x.is_active,
                
            }).ToList();
            return sub_category;

        }

        //get  main category by id
        public static sub_category GetSubCategoryByid(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            sub_category sub_obj = db.sub_category.Select(x => x)
                .FirstOrDefault(x => x.sub_id == id);
            return sub_obj;
        }

        //add main category
        public static sub_category AddSubCategory(string value)
        {
            SwapDbConnection db = new SwapDbConnection();
            sub_category sub_object = new sub_category()
            {
                sub_id = IdService.generateID("sub_id"),
                creation_date = DateTime.Now,
                is_active = false,
                name = value,
            };
            db.sub_category.Add(sub_object);
            db.SaveChanges();
            return sub_object;
        }

        public static bool deleteSubCategory(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            sub_category sub_object = db.sub_category.Where(x => x.sub_id == id).FirstOrDefault();
            if (sub_object == null)
                return false;
            db.sub_category.Remove(sub_object);
            db.SaveChanges();
            return true;
        }

    }
}
