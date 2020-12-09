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
    [RoutePrefix("api/place")]
    public class PlaceController : ApiController
    {
        [Route("GetPlace/{place_id}")]
        [HttpGet]
        public HttpResponseMessage GetPlace(string place_id ,bool test = false)
        {
            try
            {
                placeDTO place = PlaceService.GetPlaceInfoByid(place_id);
                if (place == null || test)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Place in the db");
                return Request.CreateResponse(HttpStatusCode.OK, place);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        //admin add/change/delete
        [Route("AddPlace")]
        [HttpPost]
        public HttpResponseMessage AddPlace([FromBody]placeDTO place)
        {
            try
            {
                string place_id = PlaceService.AddPlace(place);
                if (place_id ==null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Place id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, place_id);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }


        [Route("EditPlace")]
        [HttpPut]
        public HttpResponseMessage EditPlace([FromBody]placeDTO place)
        {
            try
            {
                bool is_edit = PlaceService.Editplace(place);
                if (!is_edit)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Place id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "The Place was edit");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }


        [Route("DeletePlace")]
        [HttpDelete]
        public HttpResponseMessage DeletePlace([FromBody]string place_id)
        {
            try
            {
                bool is_deleted = PlaceService.DeletePlace(place_id);
                if (!is_deleted)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Place id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "The place was deleted");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        // PUT:api/place/addOrEditPlaceToCategory
        [Route("addOrEditPlaceToCategory")]
        [HttpPost]
        public HttpResponseMessage addOrEditPlaceToCategory([FromBody]placeToCategoryDTO req)
        {
            try
            {
                if (req.main_id == null || req.sub_id == null || req.place_id == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "missing parameters");
                  PlaceService.addOrEditPlaceToCategory(req);
                  return Request.CreateResponse(HttpStatusCode.OK, "The place was add to the main and sub category table");
                //return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad request");//TODO to chekc this 
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
    }
}