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

        [Route("GetAllAdmins")]
        [HttpGet]
        public HttpResponseMessage GetAllAdmins(bool test = false)
        {
            try
            {
                List<clientInfoDTO> list = AdminService.GetAllAdmins();
                if (list == null || test)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no Admins in the db");
                return Request.CreateResponse(HttpStatusCode.OK, list);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

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

        //TODO add in the DB
        ////approve / Edit / remove Business
        //[Route("ApproveBusiness")]
        //[HttpPut]
        //public HttpResponseMessage ApproveBusiness()
        //{
        //    return 0;
        //}

    }
}