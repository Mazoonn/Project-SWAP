using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class bussinessRequestDTO
    {
        public NewBusinessDTO business { get; set; }
        public NewPlaceDTO place { get; set; }
        public CategoriesIdsDTO placeCategory { get; set; }
    }
}
