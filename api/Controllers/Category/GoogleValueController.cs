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
    [RoutePrefix("api/GoogleValue")]
    public class GoogleValueController : ApiController
    {

        // GET: api/googleValue/GetAllGoogleValue
        [Route("GetAllGoogleValue")]
        [HttpGet]
        public HttpResponseMessage GetAllGoogleValue()
        {
            List<googleValueDto> list = CategoryService.GetAllGoogleValue();
            if(list.Count == 0)
                return Request.CreateResponse(HttpStatusCode.NotFound, "There is no google value in the db");
            return Request.CreateResponse(HttpStatusCode.OK, list);
        }

        // GET: api/googleValue/GetGoogleValue/{type}/{value}
        [Route("GetGoogleValue/{type}/{value}")]
        [HttpGet]
        public HttpResponseMessage GetGoogleValue(string type, string value)
        {
            googleValueDto db_value;
            switch (type)
            {
                case ("id"):
                    db_value = CategoryService.GetGoogleValueByid(value);
                    if (db_value == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound, "There is not google value with id - " + value);
                    return Request.CreateResponse(HttpStatusCode.OK, db_value);
                case ("value"):
                    db_value = CategoryService.GetGoogleValueByValue(value);
                    if (db_value == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound, "There is not google value with value of - " + value);
                    return Request.CreateResponse(HttpStatusCode.OK, db_value);
                default:
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "The URL GetGoogleValue/type/: can be only id or value ");
            }

            //
        }

        // POST:api/googleValue/AddGoogleValue
        [Route("AddGoogleValue")]
        [HttpPost]
        public HttpResponseMessage AddGoogleValue([FromBody]googleValueDto value)
        {
            if (value != null)
                return Request.CreateResponse(HttpStatusCode.OK, CategoryService.AddGoogleValue(value.value));
            return Request.CreateResponse(HttpStatusCode.BadRequest, "there is no value in the body");
        }

        // Delete:api/googleValue/DeleteGoogleValue/{type}/{value}
        [Route("DeleteGoogleValue/{type}/{value}")]
        [HttpDelete]
        public HttpResponseMessage DeleteGoogleValue(string type, string value)
        {
            bool is_deleted;
            switch (type)
            {
                case ("id"):
                    is_deleted = CategoryService.deleteGoogleValue(value);
                    if (!is_deleted)
                        return Request.CreateResponse(HttpStatusCode.NotFound, "There is not google value with id - " + value);
                    return Request.CreateResponse(HttpStatusCode.OK, "the object had been deleted ");
                case ("value"):
                    googleValueDto db_value = CategoryService.GetGoogleValueByValue(value);
                    if (db_value == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound, "There is not google value with value of - " + value);
                    is_deleted = CategoryService.deleteGoogleValue(db_value.google_id);
                    if (!is_deleted)
                        return Request.CreateResponse(HttpStatusCode.NotFound, "There is not google value with value of - " + value);
                    return Request.CreateResponse(HttpStatusCode.OK, "the object had been deleted ");
                default:
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "The URL GetGoogleValue/type/: can be only id or value ");
            }
        }
    }
}
