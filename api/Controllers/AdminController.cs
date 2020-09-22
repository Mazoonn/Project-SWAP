using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.DTO;
using SwapClassLibrary.EF;
using SwapClassLibrary.Service;

namespace api.Controllers.admin
{
    [Authorize]
    [RoutePrefix("api/Admin")]
    public class AdminController : ApiController
    {
        //Post: add/Admin/AddAdmin
        [Route("AddAdmin")]
        [HttpPost]
        public HttpResponseMessage AddAdmin([FromBody]string client_id)
        {
            try
            {
                bool is_admin = AdminService.AddAdmin(client_id);
                if (!is_admin)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no client id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "There is client id as this in db and he is admin now");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
        //Delete add/Admin/AddAdmin
        [Route("DeleteAdmin")]
        [HttpDelete]
        public HttpResponseMessage DeleteAdmin([FromBody]string client_id)
        {
            try
            {
                bool is_admin = AdminService.DeleteAdmin(client_id);
                if (!is_admin)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no client id as this in db");
                return Request.CreateResponse(HttpStatusCode.OK, "There is client id as this in db and he is admin now");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }

        }


        //approve / Edit / remove Business
        [Route("Approvebusiness")]
        [HttpPut]
        public int Approvebusiness()
        {
            return 0;
        }
        [Route("Editbusiness")]
        [HttpPut]
        public int Editbusiness()
        {
            return 0;
        }
        [Route("RemoveBusiness")]
        [HttpDelete]
        public int RemoveBusiness()
        {
            return 0;
        }
    }
}