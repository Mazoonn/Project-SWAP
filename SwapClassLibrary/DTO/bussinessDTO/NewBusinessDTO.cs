using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class NewBusinessDTO
    {
        public string business_owner_id { get; set; }
        public bool is_active { get; set; }
        public Nullable<System.TimeSpan> opening_hours { get; set; }
        public Nullable<System.TimeSpan> closing_hours { get; set; }
    }
}
