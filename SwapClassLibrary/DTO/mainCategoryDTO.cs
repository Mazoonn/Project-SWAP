using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
 

namespace SwapClassLibrary.DTO
{
    public class mainCategoryDTO
    {
        public string main_id;
        public System.DateTime creation_date = DateTime.Now;
        public string name;
        public bool is_active = false;
        public googleValueDto google_value;
    }
}