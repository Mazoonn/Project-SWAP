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

    public class GoogleValueService
    {
        //google_value and category
        /******************************************************************************************/
        //get relationship between google value and category
        public static IEnumerable<categoryAddGoogleResponseDTO> GetCategorytoGoogleValue(string id, string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (id.IndexOf("sub") == 0)
            {
                var r_sub_google_object = db.r_google_sub_category
                .Include(x => x.sub_category).Include(x => x.google_value)
                .Where(x => x.google_value_id == google_id && x.sub_id == id)
                .Select(x => new categoryAddGoogleResponseDTO()
                {
                    google_id = x.google_value_id,
                    id = x.sub_id,
                    creation_date = x.creation_date,
                    google_name = x.google_value.value,
                    is_active = x.is_active,
                    name = x.sub_category.name

                });
                return r_sub_google_object;
            }
            return null;
        }
        //add relationship between google value and category
        public static bool AddCategorytoGoogleValue(string id, string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (id.IndexOf("sub") == 0)
            {
                r_google_sub_category r_sub_google_object = new r_google_sub_category()
                {
                    sub_id = id,
                    creation_date = DateTime.Now,
                    is_active = false,
                    google_value_id = google_id
                };
                db.r_google_sub_category.Add(r_sub_google_object);
                db.SaveChanges();
                return true;
            }
            return false;
        }

        //remove relationship between google value and category
        public static bool RemoveCategorytoGoogleValue(string id, string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            
                if (id.IndexOf("sub") == 0)
                {
                    r_google_sub_category r_sub_google_object = db.r_google_sub_category.Where(x => x.google_value_id == google_id && x.sub_id == id).FirstOrDefault();
                    if (r_sub_google_object == null)
                        return false;
                    db.r_google_sub_category.Remove(r_sub_google_object);
                    db.SaveChanges();
                    return true;
                }
                return false;
            
        }
        //google_value
        /******************************************************************************************/
        //get all google value
        public static List<googleValueDto> GetAllGoogleValue()
        {
            SwapDbConnection db = new SwapDbConnection();
            List<googleValueDto> googleDto = db.google_value.Select(x=>new googleValueDto() {google_id =x.google_value_id,value=x.value }).ToList();
            return googleDto;
        }
        //get  google value by value
        public static googleValueDto GetGoogleValueByValue(string value)
        {
            SwapDbConnection db = new SwapDbConnection();
            googleValueDto googleDto = db.google_value
                .Select(x => new googleValueDto() { google_id = x.google_value_id, value = x.value })
                .FirstOrDefault(x => x.value == value);
            return googleDto;
        }
        //get  google value by id
        public static googleValueDto GetGoogleValueByid(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            googleValueDto googleDto = db.google_value
                .Select(x => new googleValueDto() { google_id = x.google_value_id, value = x.value })
                .FirstOrDefault(x => x.google_id == id);
            return googleDto;
        }

        //add a google_value object to db
        public static google_value AddGoogleValue(string value)
        {
            SwapDbConnection db = new SwapDbConnection();
            google_value google_obj = new google_value()
            {
                google_value_id = IdService.generateID("google_value_id"),
                value = value
            };
            db.google_value.Add(google_obj);
            db.SaveChanges();
            return google_obj;
        }

        //add a google_value object to db
        public static bool deleteGoogleValue(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            google_value google_obj = db.google_value.Where(x => x.google_value_id == id).FirstOrDefault();
            if (google_obj == null)
                return false;
            db.google_value.Remove(google_obj);
            db.SaveChanges();
            return true;
        }
    }
}
