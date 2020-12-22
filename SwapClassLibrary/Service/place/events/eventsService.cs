using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwapClassLibrary.DTO;
using SwapClassLibrary.EF;


namespace SwapClassLibrary.Service
{
    public class EventsService
    {

        //Get events nearby
        //Input: PointDTO, radius
        //Output: List of MapEventDTO
        public static List<MapEventDTO> GetEvents(PointDTO position, double radius)
        {
            SwapDbConnection db = new SwapDbConnection();
            PointDTO point = new PointDTO();
            List<Event> Allevents = db.Events.Where(e=> e.end_date > DateTime.Now).ToList();
            List<MapEventDTO> FilteredEvents = new List<MapEventDTO>();

            foreach (Event e in Allevents)
            {
                point.lat = (double) e.place.latitude;
                point.lng = (double) e.place.longitude;
                if (PlaceService.GetDistance(point, position) <= radius) FilteredEvents.Add(new MapEventDTO
                {
                    description = e.place.description ?? "",
                    end_date = e.end_date,
                    name = e.place.name ?? "",
                    place_id = e.place_id,
                    price = e.price,
                    start_date = e.start_date,
                    lat = e.place.latitude,
                    lng = e.place.longitude,
                    settlement = e.place.settlement ?? "",
                    street = e.place.street ?? "",
                    street_number = e.place.street_number ?? ""
                }); 
            }

            return FilteredEvents;        
        }
    }
}
