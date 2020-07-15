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
        //main and sub category relationship
        /******************************************************************************************/
        //get all main and sub category relationship
        public static List<MainAndSubRelationshipDTO> GetAllMainAndSubRelationship()
        {
            SwapDbConnection db = new SwapDbConnection();
            List<MainAndSubRelationshipDTO> r_main_google_object = db.r_sub_and_main_category.Where(x => x.is_active).Select(x => new MainAndSubRelationshipDTO() { 
            clicked = x.clicked,
            is_active = x.is_active,
            descrition = x.descrition,
            main_name = x.main_category.name,
            sub_name = x.sub_category.name,
            main_id = x.main_id,
            sub_id = x.sub_id
            }).ToList();
                return r_main_google_object;
        }
        //get main and sub category relationship by ids
        public static List<MainAndSubRelationshipDTO> GetMainAndSubRelationship(string main_id)
        {
            SwapDbConnection db = new SwapDbConnection();

            List<MainAndSubRelationshipDTO> r_main_google_object = db.r_sub_and_main_category
                .Where(x => x.main_id == main_id)
                .Select(x => new MainAndSubRelationshipDTO()
                {
                    clicked = x.clicked,//
                    is_active = x.is_active,
                    descrition = x.descrition,
                    main_name = x.main_category.name,
                    sub_name = x.sub_category.name,
                    main_id = x.main_id,
                    sub_id = x.sub_id
                }).ToList();
            return r_main_google_object;
        }
        //add relationship between google value and category- matan to fix the if check buth tables and check if there is on in the r
        public static MainAndSubRelationshipDTO AddMainAndSubRelationship(string main_id, string sub_id , string descrition = null)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (main_id.IndexOf("main") == 0 && sub_id.IndexOf("sub") == 0 && db.r_sub_and_main_category.Where(x => x.sub_id == sub_id && x.main_id==main_id).Count() == 0)
            {
                r_sub_and_main_category r_main_sub_object = new r_sub_and_main_category()
                {
                    sub_id = sub_id,
                    main_id = main_id,
                    creation_date = DateTime.Now,
                    is_active = true,//TODO matan change it to false
                    clicked = 0,
                    descrition = descrition
                };
                db.r_sub_and_main_category.Add(r_main_sub_object);
                db.SaveChanges();
                return new MainAndSubRelationshipDTO() {
                    main_id = main_id,
                    sub_id = sub_id,
                    descrition = descrition,
                    is_active = true,//TODO matan change it to false
                    clicked = 0
                };
            }
            return null;
        }

        //remove relationship between google value and category
        public static bool RemoveMainAndSubRelationship(string main_id, string sub_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (db.r_sub_and_main_category.Where(x => x.sub_id == sub_id && x.main_id == main_id).Count() == 1)
            {
                r_sub_and_main_category r_main_sub_object = db.r_sub_and_main_category
                    .Where(x => x.sub_id == sub_id && x.main_id == main_id).FirstOrDefault();
                if (r_main_sub_object == null)
                    return false;
                db.r_sub_and_main_category.Remove(r_main_sub_object);
                db.SaveChanges();
                return true;

            }
           return false;
        }

    }
}
