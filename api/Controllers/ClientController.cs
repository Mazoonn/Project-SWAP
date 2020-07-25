using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.DTO;
using SwapClassLibrary.EF;
using SwapClassLibrary.Service;

namespace api.Controllers
{
    //[Authorize]
    [RoutePrefix("api/client")]
    public class ClientController : ApiController
    {
        //צריך לבודק האם זה צריך לשמור את ה TOKEN KEY
        [Route("login")]
        [HttpGet]
        public int login()
        {
            return 0;
        }

        [Route("register")]
        [HttpPost]
        public HttpResponseMessage register([FromBody]registerDTO body)
        {
           bool isrRegister = clientService.registerClient(body);
            if (!isrRegister)
                return Request.CreateResponse(HttpStatusCode.BadRequest, "There was an error with the registr of the new client");
            return Request.CreateResponse(HttpStatusCode.OK, isrRegister);
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