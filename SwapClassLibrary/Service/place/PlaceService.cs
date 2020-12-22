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

    public class PlaceService
    {
        //Get distance in meteres from two geolocation points
        //Input: PointDTO startPosition, PointDTO endPosition
        //Output: distance in meters
        public static double GetDistance(PointDTO startPosition, PointDTO endPosition)
        {
            int R = 6378137; // Earth’s mean radius in meter
            double dLat = Radian.DegreesToRadians(endPosition.lat - startPosition.lat);
            double dLong = Radian.DegreesToRadians(endPosition.lng - startPosition.lng);
            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
            Math.Cos(Radian.DegreesToRadians(startPosition.lat)) * Math.Cos(Radian.DegreesToRadians(endPosition.lat)) *
            Math.Sin(dLong / 2) * Math.Sin(dLong / 2);
            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            double d = R * c;
            return d; // returns the distance in meter
        }

        //Not in used
        public static placeDTO GetPlaceInfoByid(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            placeDTO place_obj = db.places.Select(x => new placeDTO()
            {
                place_id = x.place_id,
                creation_date = x.creation_date,
                latitude = x.latitude,
                longitude = x.longitude,
                description = x.description,
                name = x.name,
                settlement =x.settlement,
                state =x.state,
                country = x.country,
                street = x.street,
                street_number = x.street_number,
                post_code = x.post_code,
            })
                .FirstOrDefault(x => x.place_id == id);
            return place_obj;
        }

        //Not in used
        public static string AddPlace(placeDTO place)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (db.places.FirstOrDefault(p => p.latitude == place.latitude && p.longitude == place.longitude) != null) return null;

            place place_obj = new place()
            {
                place_id = place.place_id,
                creation_date = DateTime.Now,
                latitude = place.latitude,
                description = place.description,
                state = place.state,
                settlement = place.settlement,
                name = place.name,
                longitude = place.longitude,
                country = place.country,
                street = place.street,
                street_number = place.street_number,
                post_code = place.post_code,
            };
            db.places.Add(place_obj);
            db.SaveChanges();
            return place.place_id;
        }

        //Not in used
        public static bool DeletePlace(string place_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            place place_obj = db.places.Where(x => x.place_id == place_id).FirstOrDefault();
            if (place_obj == null)
                return false;
            db.places.Remove(place_obj);
            db.SaveChanges();
            return true;
        }


        //Not in used
        public static bool Editplace(placeDTO place)
        {
            SwapDbConnection db = new SwapDbConnection();
            place place_obj = db.places.FirstOrDefault(p => p.place_id == place.place_id);
            if (place_obj == null) return false;
            if (place.longitude != 0) place_obj.longitude = place.longitude;
            if (place.latitude != 0) place_obj.latitude = place.latitude;
            if (place.description != null ) place_obj.description = place.description;
            if (place.state != null ) place_obj.state = place.state;
            if (place.name != null ) place_obj.name = place.name;
            if (place.settlement != null ) place_obj.settlement = place.settlement;
            if (place.post_code != null) place_obj.post_code = place.post_code;
            if (place.street != null) place_obj.street = place.street;
            if (place.street_number != null) place_obj.street_number = place.street_number;
            if (place.country != null) place_obj.country = place.country;
            db.SaveChanges();
            return true;
        }

        //Not in used
         public static bool addOrEditPlaceToCategory(placeToCategoryDTO place)
        {
            SwapDbConnection db = new SwapDbConnection();
            r_place_sub_and_main_category place_obj = db.r_place_sub_and_main_category.FirstOrDefault(p => p.main_id == place.main_id&&p.sub_id ==place.sub_id && p.place_id==place.place_id);

            if (place_obj != null)
                return false;
            else
            {
                r_place_sub_and_main_category new_obj = new r_place_sub_and_main_category()
                {
                    creation_date = DateTime.Now,
                    main_id = place.main_id,
                    sub_id = place.sub_id,
                    place_id = place.place_id
                };
                db.r_place_sub_and_main_category.Add(new_obj);
                db.SaveChanges();
                return true;
            }
        }

    }
}
