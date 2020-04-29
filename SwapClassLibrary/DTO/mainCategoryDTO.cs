using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
 

namespace SwapClassLibrary.DTO
{
    public class mainCategoryDTO
    {
        public string main_id;
        public System.DateTime creation_date;
        public string name;
        public string google_value_id;
        public bool is_active;
        public googleValueDto google_value;
    }
}