using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class bussinessRequestDTO
    {
        public bussinessDTO business { get; set; }
        public placeDTO place { get; set; }
        public placeToCategoryDTO placeCategory { get; set; }

}
}
