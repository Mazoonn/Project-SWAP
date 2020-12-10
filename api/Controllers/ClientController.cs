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
    [RoutePrefix("api/client")]
    public class ClientController : ApiController
    {
        [Route("login")]
        [HttpPost]
        public HttpResponseMessage login([FromBody]loginDTO body)
        {
            try
            {
                client user = null;    
                string actor, token = "";

                switch (body.platform)
                {
                    case "facebook":
                        clientService.registerClientfacebook(body);
                        break;
                    case "google":
                        user = clientService.registerClientgoogle(body);
                        break;
                    case "local":
                        if (body.password == null || body.email == null)
                            return Request.CreateResponse(HttpStatusCode.BadRequest, "Client params illigel");
                        user = clientService.checkUserLogin(body);
                        if (user == null)
                            return Request.CreateResponse(HttpStatusCode.Unauthorized, "Email or password is incorrect");                  
                        break;
                    default:
                        return Request.CreateResponse(HttpStatusCode.BadRequest, "Client params illigel"); ;
                }
                actor = clientService.GetRole(user);
                token = JWTGetToken.getToken(user.client_id, user.email, actor);
                if (token != "false") return Request.CreateResponse(HttpStatusCode.OK, token);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Unable to create token");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }



        [Route("register")]
        [HttpPost]
        public HttpResponseMessage register([FromBody]registerDTO body)
        {
            try
            {
                string id = clientService.registerClientLocal(body);
                if (id == "")
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "This Email is in used.");
                return Request.CreateResponse(HttpStatusCode.OK, JWTGetToken.getToken(id, body.email,"client"));
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }

        }
        
        [Route("getInfo/{userId}")]
        [HttpGet]
        [SelfAuthorization()]
        public HttpResponseMessage GetInfo(string userId)
        {
            try
            {
                clientInfoDTO user = clientService.GetClientInfo(userId);
                if (user == null) return Request.CreateResponse(HttpStatusCode.NotFound, "User not found");
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }


        [Route("changePassword/{userId}")]
        [HttpPost]
        [SelfAuthorization()]
        public HttpResponseMessage ChangePassword(string userId, [FromBody] dynamic password)
        {
            try
            {
                bool result = clientService.ChangePassword(userId, (string) password.password);
                if (!result) return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad Request");
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("requestBusinessOwner/{userId}")]
        [HttpPost]
        [SelfAuthorization()]
        public HttpResponseMessage RequestBusinessOwner(string userId)
        {
            try
            {
                bool result = clientService.RequestBusinessOwner(userId);
                if (!result) return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad Request");
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }

        [Route("updateInformation/{userId}")]
        [HttpPost]
        [SelfAuthorization()]
        public HttpResponseMessage UpdateInformation(string userId, ClientDatePhoneSexDTO client)
        {
            try
            {
                if (client == null || (client.birthday_date == null
                    && string.IsNullOrEmpty(client.phone)
                    && string.IsNullOrEmpty(client.sex))) return Request.CreateResponse(HttpStatusCode.BadRequest, "Illegal Prameters");
                bool result = clientService.UpdateInformation(client, userId);
                if (!result) return Request.CreateResponse(HttpStatusCode.NotFound, "Client not found");
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "There was an InternalServerError: " + e);
            }
        }
    }
}