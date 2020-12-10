using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.DTO;
using SwapClassLibrary.EF;
using SwapClassLibrary.Service;
using api.Authoriztion;

namespace api.Controllers.admin
{
    [RoutePrefix("api/Admin")]
    [MyAuthorize("admin")]
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

        [Route("GetAllUsers")]
        [HttpGet]
        public HttpResponseMessage GetAllUsers(bool test = false)
        {
            try
            {
                List<clientInfoDTO> users = AdminService.GetAllUsers();
                if (users == null || test)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "There is no users in the db");
                return Request.CreateResponse(HttpStatusCode.OK, users);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("ChangeRole")]
        [HttpPost]
        public HttpResponseMessage ChangeRole(RoleDTO req)
        {
            try
            {
                if (req.id == null || req.currentRole == null || req.newRole == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Illegal parameters");
                bool success = AdminService.ChangeRole(req.id, req.currentRole, req.newRole);
                if (!success)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad Request");
                return Request.CreateResponse(HttpStatusCode.OK, "Role changed");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("DeleteUser/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteUser(string id)
        {
            try
            {
                bool success = AdminService.DeleteUser(id);
                if (!success)
                    return Request.CreateResponse(HttpStatusCode.NotFound, "User not found");
                return Request.CreateResponse(HttpStatusCode.OK, "User deleted");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }


        [Route("newPassword/{id}")]
        [HttpPut]
        public HttpResponseMessage NewPassword(PasswordDTO password, string id)
        {
            try
            {
                if(password.Password == null) return Request.CreateResponse(HttpStatusCode.Forbidden, "Illegal parameter");
                string msg = AdminService.NewPassword(id, password.Password);
                if (msg == "same")
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Same password");
                if(msg == "false") return Request.CreateResponse(HttpStatusCode.NotFound, "User not found or User not local");
                return Request.CreateResponse(HttpStatusCode.OK, "Password changed");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("GetNotApprovedBusinesses")]
        [HttpGet]
        public HttpResponseMessage GetNotApprovedBusinesses()
        {
            try
            {
                List<BusinessInfoDTO> bussinesses = AdminService.GetNotApprovedBusinesses();
                return Request.CreateResponse(HttpStatusCode.OK, bussinesses);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("ApproveBusinesses")]
        [HttpPut]
        public HttpResponseMessage ApproveBusinesses(List<string> businessesIds)
        {
            try
            {
                bool result = AdminService.ApproveBusinesses(businessesIds);
                if (!result)
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad Request");
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("GetEvents")]
        [HttpGet]
        public HttpResponseMessage GetEvents()
        {
            try
            {
                List<EventDTO> result = AdminService.GetEvents();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("DeleteEvent/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteEvent(string id)
        {
            try
            {
                bool result = AdminService.DeleteEvent(id);
                if(!result) return Request.CreateResponse(HttpStatusCode.BadRequest, result);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("EditEvent")]
        [HttpPost]
        public HttpResponseMessage EditEvent(EditEventDTO eventToEdit)
        {
            try
            {
                if(eventToEdit.name == null || eventToEdit.place_id == null) return Request.CreateResponse(HttpStatusCode.BadRequest, "Illegal parameters");
                bool result = AdminService.EditEvent(eventToEdit);
                if (!result) return Request.CreateResponse(HttpStatusCode.NotFound, "Event not found");
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("EditEventDescription")]
        [HttpPost]
        public HttpResponseMessage EditEventDescription(DescriptionEventDTO eventToEdit)
        {
            try
            {
                if (string.IsNullOrEmpty(eventToEdit.place_id) || string.IsNullOrEmpty(eventToEdit.description)) return Request.CreateResponse(HttpStatusCode.BadRequest, "Illegal parameters");
                bool result = AdminService.EditDescriptionEvent(eventToEdit);
                if (!result) return Request.CreateResponse(HttpStatusCode.NotFound, "Event not found");
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("AddEvent")]
        [HttpPut]
        public HttpResponseMessage AddEvent(NewEventDTO eventToAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(eventToAdd.place.place_id) || eventToAdd.place == null) return Request.CreateResponse(HttpStatusCode.BadRequest, "Illegal parameters");
                EventDTO newEvent = AdminService.AddEvent(eventToAdd);
                if (newEvent == null) return Request.CreateResponse(HttpStatusCode.BadRequest, "Event or place exists");
                return Request.CreateResponse(HttpStatusCode.OK, newEvent);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

    }
}