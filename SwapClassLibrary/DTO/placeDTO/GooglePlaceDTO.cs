using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class GooglePlaceDTO
    {
        public NewPlaceDTO googlePlace { get; set; }
        public string main_id { get; set; }
        public string sub_id { get; set; }
    }
}
