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
    [Authorize]
    [RoutePrefix("api/business")]
    public class BusinessController : ApiController
    {

        //Post api/business/AddBusinessOwner
        [Route("AddBusinessOwner")]
        [HttpPost]
        public HttpResponseMessage AddBusinessOwner([FromBody]string business_owner_id)
        {
            try
            {
                bool is_add = BusinessOwnersService.AddBusinessOwners(business_owner_id);
                if (!is_add)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no client id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "There the client is a Bussnes owner now");
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
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no  id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "There is client id as this in db and he is admin now");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }

        }

        //Discount add/change/request to Approve/delete
        [Route("AddBusiness")]
        [HttpPost]
        public HttpResponseMessage AddBusiness([FromBody]bussinessDTO bussiness)
        {
            try
            {
                bool is_add = BusinessService.AddBusiness(bussiness);
                if (!is_add)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no business id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "There Business was add");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
        [Route("EditBusiness")]
        [HttpPut]
        public HttpResponseMessage EditBusiness([FromBody]bussinessDTO bussiness)
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


        [Route("ChangeActiveBusiness")]
        [HttpPut]
        public HttpResponseMessage ChangeActiveBusinessTest([FromBody]bussinessDTO bussiness)
        {
            try
            {
                bool is_edit = BusinessService.ChangeActiveBusiness(bussiness);
                if (!is_edit)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no business id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "The business was edit");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }


        [Route("RemoveBusiness")]
        [HttpDelete]
        public HttpResponseMessage RemoveDiscount([FromBody]bussinessDTO bussiness)
        {
            try
            {
                if (bussiness.place_id == null || bussiness.business_owner_id == null)
                {
                    bool is_deleted = BusinessService.DeleteBusiness(bussiness.business_owner_id, bussiness.place_id);
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