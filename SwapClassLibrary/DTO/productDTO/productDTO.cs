using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class productDTO
    {
        public string product_id;
        public string name;
        public string description;
        public double price;
        public double discount;
        public System.DateTime creation_date;
        public System.DateTime discount_start_date;
        public System.DateTime discount_end_date;
        public bool is_active;
        public string business_id;
    }
}
