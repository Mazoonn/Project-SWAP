using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace api.Controllers
{
    [Authorize]
    [RoutePrefix("api/Event")]
    public class EventController : Controller
    {
     


        //admin add/change/delete
        [Route("AddEvent")]
        [HttpPost]
        public int AddAdmin()
        {
            return 0;
        }


        [Route("EditEvent")]
        [HttpPut]
        public int EditAdmin()
        {
            return 0;
        }
        [Route("DeleteEvent")]
        [HttpDelete]
        public int RemoveAdmin()
        {
            return 0;
        }
    }
}