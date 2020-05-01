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

        public static List<categoryAddGoogleResponseDTO> GetAllCategorytoGoogleValue(string id, string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (id.IndexOf("main") == 0)
            {
                var r_main_google_object = db.r_google_main_category
                .Include(x => x.main_category).Include(x => x.google_value)
                .Where(x => x.google_value_id == google_id && x.main_id == id)
                .Select(x => new categoryAddGoogleResponseDTO()
                {
                    google_id = x.google_value_id,
                    id = x.main_id,
                    creation_date = x.creation_date,
                    google_name = x.google_value.value,
                    is_active = x.is_active,
                    name = x.main_category.name

                }).ToList();
                return r_main_google_object;
            }
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

                }).ToList();
                return r_sub_google_object;
            }
            return null;
        }
        //get relationship between google value and category
        public static IEnumerable<categoryAddGoogleResponseDTO> GetCategorytoGoogleValue(string id, string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (id.IndexOf("main") == 0)
            {
                var r_main_google_object = db.r_google_main_category
                .Include(x => x.main_category).Include(x => x.google_value)
                .Where(x => x.google_value_id == google_id && x.main_id == id)
                .Select(x => new categoryAddGoogleResponseDTO()
                {
                    google_id = x.google_value_id,
                    id = x.main_id,
                    creation_date = x.creation_date,
                    google_name = x.google_value.value,
                    is_active = x.is_active,
                    name = x.main_category.name

                });
                return r_main_google_object;
            }
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
        public static categoryAddGoogleResponseDTO AddCategorytoGoogleValue(string id, string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (id.IndexOf("main") == 0)
            {
                r_google_main_category r_main_google_object = new r_google_main_category()
                {
                    main_id = id,
                    creation_date = DateTime.Now,
                    is_active = false,
                    google_value_id = google_id
                };
                db.r_google_main_category.Add(r_main_google_object);
                db.SaveChanges();
                return new categoryAddGoogleResponseDTO() {
                    id = id,
                    creation_date = r_main_google_object.creation_date,
                    is_active = r_main_google_object.is_active,
                    google_id = google_id
                };
            }
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
                return new categoryAddGoogleResponseDTO() {
                    id = id,
                    creation_date = r_sub_google_object.creation_date,
                    is_active = r_sub_google_object.is_active,
                    google_id = google_id
                };
            }
            return null ;
        }

        //remove relationship between google value and category
        public static bool RemoveCategorytoGoogleValue(string id, string google_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (id.IndexOf("main") == 0)
            {
                r_google_main_category r_main_google_object = db.r_google_main_category.Where(x => x.google_value_id == google_id && x.main_id == id).FirstOrDefault();
                if (r_main_google_object == null)
                    return false;
                db.r_google_main_category.Remove(r_main_google_object);
                db.SaveChanges();
                return true;

            }
            else
            {
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
        }

        //main and sub category relationship
        /******************************************************************************************/
        //get all main and sub category relationship
        public static List<r_sub_and_main_category> GetAllMainAndSubRelationship(string main_id, string sub_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (main_id.IndexOf("main") == 0 && main_id.IndexOf("sub") == 0)
            {
                var r_main_google_object = db.r_sub_and_main_category
                .Include(x => x.main_category).Include(x => x.sub_category)
                .Where(x => x.sub_id == sub_id && x.main_id == main_id)
                .Select(x => new r_sub_and_main_category()
                {
                    sub_id = x.sub_id,
                    main_id = x.main_id,
                    creation_date = x.creation_date,
                    clicked = x.clicked,
                    descrition = x.descrition
                }).ToList();
                return r_main_google_object;
            }
            return null;
        }
        //get main and sub category relationship by ids
        public static IEnumerable<r_sub_and_main_category> GetMainAndSubRelationship(string main_id, string sub_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (main_id.IndexOf("main") == 0 && main_id.IndexOf("sub") == 0)
            {
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
            return null;
        }
        //add relationship between google value and category
        public static r_sub_and_main_category AddMainAndSubRelationship(string main_id, string sub_id , string descrition)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (main_id.IndexOf("main") == 0 && main_id.IndexOf("sub") == 0)
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
            if (main_id.IndexOf("main") == 0 && main_id.IndexOf("sub") == 0)
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
