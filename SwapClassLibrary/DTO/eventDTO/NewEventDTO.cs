using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class NewEventDTO
    {
        public double price { get; set; }
        public System.DateTime end_date { get; set; }
        public System.DateTime start_date { get; set; }
        public NewPlaceDTO place { get; set; }
    }
}
