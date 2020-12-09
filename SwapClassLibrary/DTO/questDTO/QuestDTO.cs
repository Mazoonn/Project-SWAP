using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.DTO
{
    public class QuestDTO
    {
        public string userId { get; set; }
        public string[] eventsIds { get; set; }
        public GooglePlaceDTO[] googlePlaces { get; set; }
        public string[] businessesIds { get; set; }
    }
}
