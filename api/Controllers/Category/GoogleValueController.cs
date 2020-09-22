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
        public  HttpResponseMessage GetAllGoogleValue(bool test = false)
        {
            GoogleValueService google_value_service = new GoogleValueService();
            try
            {
                List<googleValueDto> list = google_value_service.GetAllGoogleValue();
                if (list.Count == 0 ||test)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no google value in the db");
                return Request.CreateResponse(HttpStatusCode.OK, list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // GET: api/googleValue/GetGoogleValue/{value}
        [Route("GetGoogleValue/{id}")]
        [HttpGet]
        public HttpResponseMessage GetGoogleValue(string id)
        {
            try
            {
                googleValueDto db_value;
                db_value = GoogleValueService.GetGoogleValueByid(id);
                if (db_value == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is not google value with id - " + id);
                return Request.CreateResponse(HttpStatusCode.OK, db_value);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // POST:api/googleValue/AddGoogleValue
        [Route("AddGoogleValue")]
        [HttpPost]
        public HttpResponseMessage AddGoogleValue([FromBody]googleValueDto value)
        {
            try
            {
                if (value != null)
                    return Request.CreateResponse(HttpStatusCode.OK, GoogleValueService.AddGoogleValue(value.value));
                return Request.CreateResponse(HttpStatusCode.BadRequest, "there is no value in the body");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // Delete:api/googleValue/DeleteGoogleValue/{id}
        [Route("DeleteGoogleValue/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteGoogleValue(string id)
        {
            try
            {
                bool is_deleted;
                is_deleted = GoogleValueService.deleteGoogleValue(id);
                if (!is_deleted)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is not google value with id - " + id);
                return Request.CreateResponse(HttpStatusCode.OK, "the object had been deleted ");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
    }
}

