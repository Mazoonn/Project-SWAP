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

        //Post api/business/AddbusinessOwner
        [Route("AddbusinessOwner")]
        [HttpPost]
        public HttpResponseMessage AddBusinessOwner([FromBody]string client_id)
        {
            try
            {
                bool is_admin = businessService.AddBusinessOwner(client_id);
                if (!is_admin)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no client id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "There is client id as this in db and he is admin now");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }

        }

        //Post api/business/DeleteBusinessOwner
        [Route("DeleteBusinessOwner")]
        [HttpDelete]
        public HttpResponseMessage DeleteBusinessOwner([FromBody]string client_id)
        {
            try
            {
                bool is_admin = businessService.DeleteBusinessOwner(client_id);
                if (!is_admin)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no  id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "There is client id as this in db and he is admin now");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }

        }

        //TODO add to the DB table business owner is active
        [Route("ChangeActiveBusiness")]
        [HttpPut]
        public int ChangeActiveBusinessTest()
        {
            return 0;
        }


        [Route("EditBusinessTest")]
        [HttpDelete]
        public int EditBusiness()
        {
            return 0;
        }

      


        //Discount add/change/request to Approve/delete
        [Route("AddBusiness")]
        [HttpPost]
        public int AddDiscount()
        {
            return 0;
        }
        [Route("EditBusiness")]
        [HttpPut]
        public int EditDiscount()
        {
            return 0;
        }
        [Route("ApproveBusiness")]
        [HttpPut]
        public int ApproveBusiness()
        {
            return 0;
        }
        [Route("RemoveBusiness")]
        [HttpDelete]
        public int RemoveDiscount()
        {
            return 0;
        }

    }
}