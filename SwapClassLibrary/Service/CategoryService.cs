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

    public class CategoryService
    {
        //main_category
        /**********************************************************************************************/
        //get all main category
        public static List<mainCategoryDTO> GetAllMainCategorys()//matan - need to enter google values 
        {
            SwapDbConnection db = new SwapDbConnection();
            List<mainCategoryDTO> mainCategory = db.main_category.Include(x => x.google_value).Select(x => new mainCategoryDTO(){
            creation_date = x.creation_date,
            name = x.name,
            main_id = x.main_id,
            is_active =x.is_active,
            google_value = new googleValueDto { google_id =x.google_value.google_value_id, value=x.google_value.value}
            }).ToList();
            return mainCategory;
           
        }

        //get main category value by id
        public static mainCategoryDTO GetMainCategoryByValue(string value)
        {
            SwapDbConnection db = new SwapDbConnection();
            mainCategoryDTO mainDTO = db.main_category.Include(g => g.google_value.value)
                .Select(x => new mainCategoryDTO()
                {
                    name = x.name,
                    google_value = new googleValueDto() { google_id = x.google_value.google_value_id, value = x.google_value.value },
                    is_active = false,
                    main_id = x.main_id,
                })
                .FirstOrDefault(x => x.name == value);
            return mainDTO;
        }
        //get  google value by id
        public static mainCategoryDTO GetMainCategoryByid(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            mainCategoryDTO mainDTO = db.main_category.Include(g=>g.google_value.value)
                .Select(x => new mainCategoryDTO() { 
                 name=x.name,
                 google_value = new googleValueDto() {google_id = x.google_value.google_value_id,value = x.google_value.value },
                 is_active = false,
                 main_id =x.main_id,
                })
                .FirstOrDefault(x => x.main_id == id);
            return mainDTO;
        }

        //add main category
        public static main_category AddMianCategory(string value , string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            main_category main_object = new main_category()
            {
                main_id = IdService.generateID("main_id"),
                creation_date = DateTime.Now,
                is_active = false,
                name = value,
               google_value_id = google_id,//matan - need to finish and fix the db 
               
            };
            db.main_category.Add(main_object);
            db.SaveChanges();
            return main_object;
        }

        public static List<sub_category> GetAllSubCategorysBymainCategory(string main_name)
        {
            SwapDbConnection db = new SwapDbConnection();
            List<sub_category> mainCategory = db.sub_category.Include(x => x.google_value.value).ToList();
            return mainCategory;
        }

        




        //google_value
        /**********************************************************************************************/
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
