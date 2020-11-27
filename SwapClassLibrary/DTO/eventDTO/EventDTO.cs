using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class EventDTO
    {
        public string place_id { get; set; }
        public string country { get; set; }
        public string street { get; set; }
        public string street_number { get; set; }
        public string state { get; set; }
        public string post_code { get; set; }
        public string settlement { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public double price { get; set; }
        public System.DateTime end_date { get; set; }
        public System.DateTime start_date { get; set; }
    }
}
