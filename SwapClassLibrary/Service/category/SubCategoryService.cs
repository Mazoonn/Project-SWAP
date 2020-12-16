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

        public static bool updateSubCategory(string id, string google_value, string name)
        {
            SwapDbConnection db = new SwapDbConnection();
            sub_category subCategory = db.sub_category.FirstOrDefault(c => c.sub_id == id);
            int duplicates = db.sub_category.Where(c => c.sub_id != id && (c.name == name || (!string.IsNullOrEmpty(c.google_value) && c.google_value == google_value))).ToList().Count();

            if (subCategory == null || duplicates != 0) return false;
            subCategory.name = name;
            subCategory.google_value = google_value;
            db.SaveChanges();

            return true;
        }
    }
}