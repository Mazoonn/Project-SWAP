using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class bussinessDTO
    {
        public string business_id;
        public string business_owner_id;
        public bool is_active;
        public string name;
        public string description;
        public double ratring;
        public System.TimeSpan opening_houers;
        public System.TimeSpan closing_houers;
    }
}
