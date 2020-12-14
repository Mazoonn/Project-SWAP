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
    [RoutePrefix("api/business")]
    public class BusinessController : ApiController
    {
        [Route("GetAllBusinesses/{business_owner}")]
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

        //Post api/business/AddBusinessOwner
        [Route("AddBusinessOwner")]
        [HttpPost]
        public HttpResponseMessage AddBusinessOwner([FromBody]string business_owner_id)
        {
            try
            {
                bool is_add = BusinessOwnersService.AddBusinessOwners(business_owner_id);
                if (!is_add)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is not client id in the db");
                return Request.CreateResponse(HttpStatusCode.OK, "The client is a Bussnes owner now");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }

        }

        //Post api/business/DeleteBusinessOwner
        [Route("DeleteBusinessOwner")]
        [HttpDelete]
        public HttpResponseMessage DeleteBusinessOwner([FromBody]string business_owner_id)
        {
            try
            {
                bool is_deleted = BusinessOwnersService.DeleteBusinessOwners(business_owner_id);
                if (!is_deleted)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no business owner id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "The business owner is now client now");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }

        }

        //Discount add/change/request to Approve/delete
        [Route("AddBusiness")]
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