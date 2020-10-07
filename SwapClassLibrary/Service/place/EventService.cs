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

    public class EventService
    {
        public static List<eventDTO> GetAllEvent()
        {
            SwapDbConnection db = new SwapDbConnection();
            int count = db.Events.Count();
            if (count == 0)
                return null;
            List<eventDTO> events = db.Events.Select(e => new eventDTO()
            {
                place = new placeDTO() { place_id = e.place_id },
                end_date = e.end_date,
                price = e.price,
                start_date= e.start_date
            }).ToList();
            return events;

        }

        public static bool AddEvent(eventDTO event_obj)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (db.Events.FirstOrDefault(p => p.place_id == event_obj.place.place_id) != null) return false;

            Event Event_obj = new Event()
            {
                place_id = event_obj.place.place_id,
                end_date = event_obj.end_date,
                price = event_obj.price,
                start_date = event_obj.start_date
            };
            db.Events.Add(Event_obj);
            db.SaveChanges();
            return true;
        }

        public static bool DeleteEvent(string place_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            Event Event_obj = db.Events.Where(x => x.place_id == place_id).FirstOrDefault();
            if (Event_obj == null)
                return false;
            db.Events.Remove(Event_obj);
            db.SaveChanges();
            return true;
        }

        public static bool EditEvent(eventDTO event_obj)
        {
            SwapDbConnection db = new SwapDbConnection();
            Event Event = db.Events.FirstOrDefault(p => p.place_id == event_obj.place.place_id);
            if (Event == null) return false;
            Event.price = event_obj.price;
            Event.end_date = event_obj.end_date;
            Event.start_date = event_obj.start_date;
            db.SaveChanges();
            return true;
        }
    }
}
