using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.Service;
using SwapClassLibrary.DTO;
using api.Authorization;

namespace api.Controllers.quest
{
    [RoutePrefix("api/quest")]

    public class QuestController : ApiController
    {
        [Route("addQuest")]
        [MyAuthorize("client", "business", "admin")]
        [HttpPost]
        public HttpResponseMessage NewQuest(QuestDTO quest)
        {
            try
            {
                QuestService.AddNewQuest(quest);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
    }
}