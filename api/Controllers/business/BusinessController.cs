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
    [RoutePrefix("api/business")]
    public class BusinessController : ApiController
    {
        [Route("GetAllBusiness/{business_owner}")]
        [HttpGet]
        public HttpResponseMessage GetAllBusiness(string business_owner)
        {
            try
            {
                List<bussinessDTO> list = BusinessService.GetAllBusinesses(business_owner);
                if (list == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no business");
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
        public HttpResponseMessage AddBusiness([FromBody]bussinessDTO bussiness)
        {
            try
            {
                bool place_id = BusinessService.AddBusiness(bussiness);
                if (!place_id)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no business id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "The Business was add");
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
        public HttpResponseMessage ChangeActiveBusiness([FromBody]bussinessDTO bussiness)
        {
            try
            {
                bool is_edit = BusinessService.ChangeActiveBusiness(bussiness);
                if (!is_edit)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no business id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "The business was active");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }


        [Route("RemoveBusiness")]
        [HttpDelete]
        public HttpResponseMessage RemoveBusiness([FromBody]bussinessDTO bussiness)
        {
            try
            {
                if (bussiness.place_id != null || bussiness.business_owner_id != null)
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