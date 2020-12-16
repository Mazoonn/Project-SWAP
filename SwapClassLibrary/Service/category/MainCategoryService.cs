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

    public class MainCategoryService
    {
        //get all main category
        public static List<categoryDTO> GetAllMainCategories() 
        {
            SwapDbConnection db = new SwapDbConnection();
            List<categoryDTO> mainCategories = db.main_category.Select(x => new categoryDTO(){
            creation_date = x.creation_date,
            name = x.name,
            id = x.main_id,
            google_value = x.google_value,
            is_active =x.is_active,
            }).ToList();
            return mainCategories;  
        }

        //get  main category by id
        public static main_category GetMainCategoryByid(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            main_category main_obj = db.main_category.Select(x => x)
                .FirstOrDefault(x => x.main_id == id);
            return main_obj;
        }
     }
}
