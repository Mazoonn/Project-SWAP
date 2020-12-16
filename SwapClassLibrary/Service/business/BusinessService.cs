using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using SwapClassLibrary.EF;
using SwapClassLibrary.DTO;
using System.Data.Entity.Validation;

namespace SwapClassLibrary.Service
{
    public class BusinessService
    {
        public static List<bussinessDTO> GetAllBusinesses(string business_owner_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            return db.businesses.Where(business => business.business_owner_id == business_owner_id).Select(business => new bussinessDTO
            {
                place_id = business.place_id,
                business_owner_id = business.business_owner_id,
                is_active = business.is_active,
                rating = business.rating,
                opening_hours = business.opening_hours,
                closing_hours = business.closing_hours,
                approve_by_admin = business.approve_by_admin,
                place_info = new placeDTO
                {
                    name = business.place.name ?? "",
                    description = business.place.description ?? "",
                    country = business.place.country ?? "",
                    post_code = business.place.post_code ?? "",
                    settlement = business.place.settlement ?? "",
                    state = business.place.state ?? "",
                    street = business.place.street ?? "",
                    street_number = business.place.street_number ?? ""
                }
            }
            ).ToList();
        }

        public static List<MapBusinessDTO> GetFilteredBusinessesAround(PointDTO position, CategoriesIdsDTO ids, double radius)
        {
            SwapDbConnection db = new SwapDbConnection();
            PointDTO point;
            List<business> businesees;
            List<MapBusinessDTO> filteredBusinesses = new List<MapBusinessDTO>();
            main_category mainCategory = db.main_category.FirstOrDefault(category => category.main_id == ids.mainId);
            string iconCategory;

            if (mainCategory == null) return filteredBusinesses;
            point = new PointDTO();
            businesees = db.businesses.Include(b => b.products).Where(b => b.is_active &&
            b.approve_by_admin &&
            b.place.r_place_sub_and_main_category.Any(r => r.main_id == ids.mainId &&
            ids.subIds.Any(id => r.sub_id == id))).ToList();
            iconCategory = mainCategory.google_value;

            foreach (business b in businesees)
            {
                point.lat = (double)b.place.latitude;
                point.lng = (double)b.place.longitude;
                if (PlaceService.GetDistance(point, position) <= radius) filteredBusinesses.Add(new MapBusinessDTO
                {
                    closing_hours = b.closing_hours,
                    description = b.place.description,
                    lat = b.place.latitude,
                    lng = b.place.longitude,
                    name = b.place.name ?? "",
                    opening_hours = b.opening_hours,
                    place_id = b.place_id,
                    rating = b.rating,
                    settlement = b.place.settlement ?? "",
                    street = b.place.street ?? "",
                    street_number = b.place.street_number ?? "",
                    icon = iconCategory ?? "",
                    products = b.products.Where(p=> p.is_active && p.discount_end_date >= DateTime.Now).Select(product => new productDTO
                    {
                        business_id = product.business_id,
                        creation_date = product.creation_date,
                        description = product.description,
                        discount = product.discount,
                        discount_end_date = product.discount_end_date,
                        discount_start_date = product.discount_start_date,
                        is_active = product.is_active,
                        name = product.name,
                        price = product.price,
                        product_id = product.product_id
                    }).ToList()
                });
            }


            return filteredBusinesses;
        }

        public static bool AddBusiness(NewBusinessDTO business, NewPlaceDTO place, CategoriesIdsDTO categories)
        {
            SwapDbConnection db = new SwapDbConnection();
            r_place_sub_and_main_category categoriedPlace;
            place placeInDb = db.places.FirstOrDefault(p => p.place_id == place.place_id);
            business newBusiness;
            List<r_place_sub_and_main_category> listOfPlacesCategories = new List<r_place_sub_and_main_category>();

            newBusiness = new business
            {
                business_owner_id = business.business_owner_id,
                approve_by_admin = false,
                closing_hours = business.closing_hours,
                place_id = place.place_id,
                is_active = business.is_active,
                rating = 0,
                opening_hours = business.opening_hours
            };

            if (placeInDb == null)
            {
                foreach (string subId in categories.subIds)
                {
                    listOfPlacesCategories.Add(new r_place_sub_and_main_category
                    {
                        creation_date = DateTime.Now,
                        place_id = place.place_id,
                        main_id = categories.mainId,
                        sub_id = subId
                    });
                }

                db.places.Add(new place
                {
                    latitude = place.latitude,
                    longitude = place.longitude,
                    description = place.description,
                    name = place.name,
                    country = place.country,
                    creation_date = DateTime.Now,
                    place_id = place.place_id,
                    post_code = place.post_code ?? "",
                    settlement = place.settlement,
                    state = place.state ?? "",
                    street = place.street,
                    street_number = place.street_number ?? "",
                    business = newBusiness,
                    r_place_sub_and_main_category = listOfPlacesCategories, 
                });
            }
            else
            {
                if (placeInDb.business != null || placeInDb.Event != null) return false;

                foreach (string subId in categories.subIds)
                {
                    categoriedPlace = placeInDb.r_place_sub_and_main_category.FirstOrDefault(r => r.main_id == categories.mainId && r.sub_id == subId);

                    if (categoriedPlace == null)
                        placeInDb.r_place_sub_and_main_category.Add(new r_place_sub_and_main_category
                    {
                        creation_date = DateTime.Now,
                        place_id = place.place_id,
                        main_id = categories.mainId,
                        sub_id = subId
                    });
                }
                placeInDb.description = place.description;
                placeInDb.name = place.name;
                placeInDb.business = newBusiness;
            }

            db.SaveChanges();

            return true;
        }

        public static bool EditBusiness(bussinessDTO business)
        {
            SwapDbConnection  db = new SwapDbConnection();
            business business_to_edit = db.businesses.FirstOrDefault(b => b.business_owner_id == business.business_owner_id && b.place_id == business.place_id);
            if (business_to_edit == null) return false;

            business_to_edit.place.description = business.place_info.description ?? business_to_edit.place.description;
            business_to_edit.place.name = business.place_info.name ?? business_to_edit.place.name;
            business_to_edit.opening_hours = business.opening_hours ?? business_to_edit.opening_hours;
            business_to_edit.closing_hours = business.closing_hours ?? business_to_edit.closing_hours;
            db.SaveChanges();

            return true;
        }

        public static bool ChangeActiveBusiness(string placeId, string userId, bool isActive)
        {
            SwapDbConnection db = new SwapDbConnection();
            business business_to_edit = db.businesses.FirstOrDefault(b => b.place_id == placeId && b.business_owner_id == userId);

            if (business_to_edit == null) return false;
            business_to_edit.is_active = isActive;
            db.SaveChanges();
            return true;
        }

        public static bool DeleteBusiness(string business_owner_id, string place_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            business Business = db.businesses.FirstOrDefault(b => b.business_owner_id == business_owner_id && b.place_id == place_id);
            if (Business != null)
            {
                db.businesses.Remove(Business);
                db.SaveChanges();
                return true;
            }
            return false;
        }

    }

}
