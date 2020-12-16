using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.DTO;
using SwapClassLibrary.EF;
using SwapClassLibrary.Service;
using api.Authorization;

namespace api.Controllers
{
    [RoutePrefix("api/business")]
    public class BusinessController : ApiController
    {
        [Route("GetAllBusinesses/{business_owner}")]
        [SelfAuthorization()]
        [HttpGet]
        public HttpResponseMessage GetAllBusinesses(string business_owner)
        {
            try
            {
                List<bussinessDTO> list = BusinessService.GetAllBusinesses(business_owner);
                return Request.CreateResponse(HttpStatusCode.OK, list);

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("GetFilteredBusinesses")]
        [MyAuthorize("admin", "business", "client")]
        [HttpGet]
        public HttpResponseMessage GetFilteredBusinesses([FromUri] PointDTO position , [FromUri] CategoriesIdsDTO ids, double radius)
        {
            try
            {
                if(string.IsNullOrEmpty(ids.mainId) || ids.subIds == null) return Request.CreateResponse(HttpStatusCode.BadRequest, "Illegal parameters");
                List<MapBusinessDTO> list = BusinessService.GetFilteredBusinessesAround(position, ids, radius);
                return Request.CreateResponse(HttpStatusCode.OK, list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        //Discount add/change/request to Approve/delete
        [Route("AddBusiness")]
        [MyAuthorize("business", "admin")]
        [HttpPost]
        public HttpResponseMessage AddBusiness([FromBody]bussinessRequestDTO businessRequest)
        {
            try
            {
                bool result = BusinessService.AddBusiness(businessRequest.business, businessRequest.place, businessRequest.placeCategory);
                if (!result)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "The business exist in db");
                return Request.CreateResponse(HttpStatusCode.OK, "The business was added");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
        [Route("EditBusiness/{clientId}")]
        [SelfAuthorization()]
        [HttpPut]
        public HttpResponseMessage EditBusiness([FromBody]bussinessDTO bussiness, string clientId)
        {
            try
            {
                bool is_edit = BusinessService.EditBusiness(bussiness);
                if (!is_edit)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no business id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "The business was edit");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }


        [Route("ChangeActiveBusiness/{userId}")]
        [SelfAuthorization()]
        [HttpPut]
        public HttpResponseMessage ChangeActiveBusiness([FromBody]bussinessDTO bussiness, string userId)
        {
            try
            {
                bool is_edit = BusinessService.ChangeActiveBusiness(bussiness.place_id, userId, bussiness.is_active);
                if (!is_edit)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no business id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "The business was active");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }


        [Route("RemoveBusiness/{userId}")]
        [SelfAuthorization()]
        [HttpDelete]
        public HttpResponseMessage RemoveBusiness([FromBody]bussinessDTO bussiness, string userId)
        {
            try
            {
                if (bussiness.place_id != null)
                {
                    bool is_deleted = BusinessService.DeleteBusiness(userId, bussiness.place_id);
                    if (!is_deleted)
                        return Request.CreateResponse(HttpStatusCode.NotFound, "There is no business id as this in db");
                    return Request.CreateResponse(HttpStatusCode.OK, "The bussiness is removed");
                }
                return Request.CreateResponse(HttpStatusCode.BadRequest, "There missing prames");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

    }
}