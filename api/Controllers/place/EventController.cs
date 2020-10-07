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
   // [Authorize]
    [RoutePrefix("api/place/event")]
    public class EventController : ApiController
    {
        [Route("GetAllEvent")]
        [HttpGet]
        public HttpResponseMessage GetAllEvent(bool test = false)
        {
            try
            {
                List<eventDTO> list = EventService.GetAllEvent();
                if (list == null || test)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Evets in the db");
                return Request.CreateResponse(HttpStatusCode.OK, list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("AddEvent")]
        [HttpPost]
        public HttpResponseMessage AddEvent([FromBody]eventDTO event_obj)
        {
            try
            {
                bool is_add = EventService.AddEvent(event_obj);
                if (!is_add)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Place as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "The Place is add");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("EditEvent")]
        [HttpPut]
        public HttpResponseMessage EditEvent([FromBody]eventDTO event_obj)
        {
            try
            {
                bool is_edit = EventService.EditEvent(event_obj);
                if (!is_edit)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Event in the db");
                return Request.CreateResponse(HttpStatusCode.OK, "The Event was edit");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("DeleteEvent")]
        [HttpDelete]
        public HttpResponseMessage DeleteEvent([FromBody]string event_obj)
        {
            try
            {
                bool is_deleted = EventService.DeleteEvent(event_obj);
                if (!is_deleted)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no event id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "the event is deleted");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
    }
}