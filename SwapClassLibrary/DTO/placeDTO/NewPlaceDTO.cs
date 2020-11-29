using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class NewPlaceDTO
    {
        public string place_id { get; set; }
        public System.DateTime creation_date { get; set; }
        public decimal latitude { get; set; }
        public decimal longitude { get; set; }
        public string country { get; set; }
        public string street { get; set; }
        public string street_number { get; set; }
        public string state { get; set; }
        public string post_code { get; set; }
        public string settlement { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    }
}
