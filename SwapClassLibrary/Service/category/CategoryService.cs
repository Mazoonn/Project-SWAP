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
        //google_value and category relationship
        /******************************************************************************************/
        public static List<categoryAddGoogleResponseDTO> GetAllSubCategorytoGoogleValue()
        {
            SwapDbConnection db = new SwapDbConnection();

           
            List<categoryAddGoogleResponseDTO> r_sub_google_object = db.r_google_sub_category
            .Include(x => x.sub_category).Include(x => x.google_value)
            .Select(x => new categoryAddGoogleResponseDTO()
            {
                google_id = x.google_value_id,
                id = x.sub_id,
                creation_date = x.creation_date,
                google_name = x.google_value.value,
                is_active = x.is_active,
                name = x.sub_category.name

            }).ToList();
            return r_sub_google_object;
        }

        //get relationship between google value and category

        public static IEnumerable<categoryAddGoogleResponseDTO> GetSubCategorytoGoogleValue(string id, string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (id.IndexOf("sub") == 0 && db.r_google_sub_category.Where(x => x.sub_id == id).Count() == 0)
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
        public static categoryAddGoogleDTO AddSubCategorytoGoogleValue(string id, string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
          
            if (id.IndexOf("sub") == 0 && db.r_google_sub_category.Where(x => x.sub_id == id).Count() == 0)
            {
                r_google_sub_category r_sub_google_object = new r_google_sub_category()
                {
                    sub_id = id,
                    creation_date = DateTime.Now,
                    is_active = false,
                    google_value_id = google_id,
       
                };
                db.r_google_sub_category.Add(r_sub_google_object);
                db.SaveChanges();
                return new categoryAddGoogleDTO() {
                    id = id,
                    creation_date = r_sub_google_object.creation_date,
                    is_active = r_sub_google_object.is_active,
                    google_id = google_id
                };
            }

            return null ;
        }

        public static categoryAddGoogleDTO ChangeActiveCategorytoGoogleValue(string id, string google_id, bool req)
        {
            SwapDbConnection db = new SwapDbConnection();
             if (id.IndexOf("sub") == 0 && db.r_google_sub_category.Where(x => x.sub_id == id).Count() == 1)
            {
                r_google_sub_category r_sub_google_object = db.r_google_sub_category.Select(x => x)
                  .FirstOrDefault(x => x.sub_id == id && x.google_value_id == google_id);
                r_sub_google_object.is_active = req;
                db.SaveChanges();
                return new categoryAddGoogleDTO()
                {
                    id = id,
                    creation_date = r_sub_google_object.creation_date,
                    is_active = r_sub_google_object.is_active,
                    google_id = google_id
                };
            }
            
            return null;
        }

        //remove relationship between google value and category
        public static bool RemoveSubCategorytoGoogleValue(string id, string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
                   if (id.IndexOf("sub") == 0 && db.r_google_sub_category.Where(x => x.sub_id == id).Count() == 1)
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

        //main and sub category relationship
        /******************************************************************************************/
        //get all main and sub category relationship
        public static List<r_sub_and_main_category> GetAllMainAndSubRelationship()
        {
            SwapDbConnection db = new SwapDbConnection();
            List<r_sub_and_main_category> r_main_google_object = db.r_sub_and_main_category
                .Include(x => x.main_category).Include(x => x.sub_category)
                .Select(x => x).ToList();
                return r_main_google_object;
        }
        //get main and sub category relationship by ids
        public static IEnumerable<r_sub_and_main_category> GetMainAndSubRelationship(string main_id, string sub_id)
        {
            SwapDbConnection db = new SwapDbConnection();

                var r_main_google_object = db.r_sub_and_main_category
                .Include(x => x.main_category).Include(x => x.sub_category)
                .Where(x => x.sub_id == sub_id && x.main_id == main_id)
                .Select(x => new r_sub_and_main_category()
                {
                    sub_id = x.sub_id,
                    main_id = x.main_id,
                    creation_date = x.creation_date,
                   clicked = x.clicked,
                   descrition =x.descrition
                });
                return r_main_google_object;
        }
        //add relationship between google value and category- matan to fix the if check buth tables and check if there is on in the r
        public static r_sub_and_main_category AddMainAndSubRelationship(string main_id, string sub_id , string descrition)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (main_id.IndexOf("main") == 0 && sub_id.IndexOf("sub") == 0 && db.r_sub_and_main_category.Where(x => x.sub_id == sub_id && x.main_id==main_id).Count() == 0)
            {
                r_sub_and_main_category r_main_sub_object = new r_sub_and_main_category()
                {
                    sub_id = sub_id,
                    main_id = main_id,
                    creation_date = DateTime.Now,
                    clicked = 0,
                    descrition = descrition
                };
                db.r_sub_and_main_category.Add(r_main_sub_object);
                db.SaveChanges();
                return r_main_sub_object;
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
