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
        public static List<categoryDTO> GetAllSubCategorys()//GetAllSubcategoies
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

        //add sub category
        public static sub_category AddSubCategory(string value, string google_value)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (db.sub_category.FirstOrDefault(c => c.name == value && c.google_value == google_value) != null) return null;

            sub_category sub_object = new sub_category()
            {
                sub_id = IdService.generateID("sub_id"),
                creation_date = DateTime.Now,
                is_active = false,
                name = value,
                google_value = google_value,
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

        public static bool updateSubCategory(string id, string google_value, string name)
        {
            SwapDbConnection db = new SwapDbConnection();
            sub_category subCategory = db.sub_category.FirstOrDefault(c => c.sub_id == id);
            int duplicates = db.sub_category.Where(c => c.sub_id != id && (c.name == name || c.google_value == google_value)).ToList().Count();

            if (subCategory == null || duplicates!=0) return false;
            subCategory.name = name;
            subCategory.google_value = google_value;
            db.SaveChanges();

            return true;
        }
    }
}
