using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace api.Controllers
{
    //[Authorize]
    [RoutePrefix("api/client")]
    public class ClientController : Controller
    {
        //צריך לבודק האם זה צריך לשמור את ה TOKEN KEY
        [Route("login")]
        [HttpGet]
        public int login()
        {
            return 0;
        }
        // לא מחייב רק אופציה
        [Route("collectingData")]
        [HttpPost]
        public int collectingData()
        {
            return 0;
        }

        //start / Edit / remove Mission
        [Route("StartQuest")]
        [HttpPost]
        public int StartQuest()
        {
            return 0;
        }
        [Route("ContinueQuest")]
        [HttpPut]
        public int ContinueQuest()
        {
            return 0;
        }

        [Route("RemoveContinueQuest")]
        [HttpDelete]
        public int RemoveContinueQuest()
        {
            return 0;
        }
    }
}