﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.Service;
using SwapClassLibrary.DTO;


namespace api.Controllers.place.events
{
    [RoutePrefix("api/events")]
    public class EventsController : ApiController
    {
        [Route("GetEvents")]
        [HttpGet]
        public HttpResponseMessage GetEvents([FromUri] PointDTO point, double radius)
        {
            try
            {
                if (point == null) return Request.CreateResponse(HttpStatusCode.BadRequest, "Illegal Parameters");
                List<MapEventDTO> list = EventsService.GetEvents(point, radius);
                return Request.CreateResponse(HttpStatusCode.OK, list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
    }
}