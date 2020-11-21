using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class bussinessDTO
    {
        public string place_id;
        public string business_owner_id;
        public bool is_active;
        public string name;
        public string description;
        public int rating;
        public Nullable<System.TimeSpan> opening_hours;
        public Nullable<System.TimeSpan> closing_hours;
    }
}
