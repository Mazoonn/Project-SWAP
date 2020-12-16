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
        //get main and sub category relationship by ids
        public static List<MainAndSubRelationshipDTO> GetMainAndSubRelationship(string main_id)
        {
            SwapDbConnection db = new SwapDbConnection();

            List<MainAndSubRelationshipDTO> r_main_google_object = db.r_sub_and_main_category
                .Where(x => x.main_id == main_id)
                .Select(x => new MainAndSubRelationshipDTO()
                {
                    clicked = (int)x.clicked,
                    is_active = x.is_active,
                    descrition = x.descrition,
                    main_name = x.main_category.name,
                    sub_name = x.sub_category.name,
                    main_id = x.main_id,
                    sub_id = x.sub_id,
                    google_value=x.sub_category.google_value,
                }).ToList();
            return r_main_google_object;
        }
        //add relationship between main and sub
        public static MainAndSubRelationshipDTO AddMainAndSubRelationship(string main_id ,string sub_name, string google_value, string descrition = null)
        {
            SwapDbConnection db = new SwapDbConnection();
            sub_category subCategory = db.sub_category.FirstOrDefault(c => c.name == sub_name && c.google_value == google_value);
            main_category mainCategory = db.main_category.FirstOrDefault(c => c.main_id == main_id);

            if ( mainCategory == null)
                throw new InvalidOperationException("there is a no main id as requested");

            r_sub_and_main_category categoryOfMainCategory = db.r_sub_and_main_category.FirstOrDefault(c => c.main_id == main_id && c.sub_category.name == sub_name);
            if (categoryOfMainCategory!=null)
                throw new InvalidOperationException("there is an reletinship as this");

            if(subCategory==null)
                 subCategory = SubCategoryService.AddSubCategory(sub_name, google_value);
            
            r_sub_and_main_category r_main_sub_object = new r_sub_and_main_category()
            {
                sub_id = subCategory.sub_id,
                main_id = main_id,
                creation_date = DateTime.Now,
                is_active = false,
                clicked = 0,
                descrition = descrition
            };
            db.r_sub_and_main_category.Add(r_main_sub_object);
            db.SaveChanges();
            return new MainAndSubRelationshipDTO() 
            {
                  main_id = main_id,
                  sub_id = subCategory.sub_id,
                  descrition = descrition,
                  is_active = false,
                  clicked = 0,
                  main_name = r_main_sub_object.main_category.name,
                  sub_name = sub_name,
                  google_value = subCategory.google_value
            };
        }

        //remove relationship between google value and category
        public static bool RemoveMainAndSubRelationship(string main_id, string sub_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            r_sub_and_main_category reletionship_sub_and_main_category = db.r_sub_and_main_category.FirstOrDefault(c => c.main_id == main_id && c.sub_id == sub_id);
            if (reletionship_sub_and_main_category == null) return false;
            db.r_sub_and_main_category.Remove(reletionship_sub_and_main_category);
            db.SaveChanges();
            return true;
        }

        public static bool UpdateDescription(string main_id, string sub_id, string description)
        {
            SwapDbConnection db = new SwapDbConnection();
            r_sub_and_main_category reletionship_sub_and_main_category = db.r_sub_and_main_category.FirstOrDefault(c => c.main_id == main_id && c.sub_id == sub_id);
            if (reletionship_sub_and_main_category == null) return false;
            reletionship_sub_and_main_category.descrition = description;
            db.SaveChanges();
            return true;
        }
        public static bool UpdatStatusIsActive(string main_id, string sub_id, bool is_active)
        {
            SwapDbConnection db = new SwapDbConnection();
            r_sub_and_main_category reletionship_sub_and_main_category = db.r_sub_and_main_category.FirstOrDefault(c => c.main_id == main_id && c.sub_id == sub_id);
            if (reletionship_sub_and_main_category == null) return false;
            reletionship_sub_and_main_category.is_active = is_active;
            db.SaveChanges();
            return true;
        }
        public static bool UpdateClickesForReletionship(string main_id, string sub_id, int clickes)
        {
            SwapDbConnection db = new SwapDbConnection();
            r_sub_and_main_category reletionship_sub_and_main_category = db.r_sub_and_main_category.FirstOrDefault(c => c.main_id == main_id && c.sub_id == sub_id);
            if (reletionship_sub_and_main_category == null) return false;
            reletionship_sub_and_main_category.clicked = clickes;
            db.SaveChanges();
            return true;
        }
    }
}
