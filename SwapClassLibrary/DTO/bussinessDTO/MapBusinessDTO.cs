using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class MapBusinessDTO
    {
        public string place_id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public Nullable<System.TimeSpan> opening_hours { get; set; }
        public Nullable<System.TimeSpan> closing_hours { get; set; }
        public int rating { get; set; }
        public string street { get; set; }
        public string street_number { get; set; }
        public string settlement { get; set; }
        public decimal lat { get; set; }
        public decimal lng { get; set; }
        public List<productDTO> products { get; set; }
        public string icon { get; set; }
    }
}
