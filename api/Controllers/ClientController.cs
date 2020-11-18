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
    [RoutePrefix("api/client")]
    public class ClientController : ApiController
    {
        //צריך לבודק האם זה צריך לשמור את ה TOKEN KEY
        [Route("login")]
        [HttpPost]
        public HttpResponseMessage login([FromBody]loginDTO body)
        {
            try
            {
                client user = null;    
                string token = "";

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
                
                token = JWTGetToken.getToken(user.client_id, user.email, user.actor);
                if (token != "flase") return Request.CreateResponse(HttpStatusCode.OK, token);
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

        // לא מחייב רק אופציה
        [Route("collectingData")]
        [HttpPost]
        public int collectingData()
        {
            return 0;
        }

        [Route("DeleteClient")]
        [HttpPost]
        public int DeleteClient()
        {
            return 0;
        }


        [Route("EditClient")]
        [HttpPost]
        public int EditClient()
        {
            return 0;
        }


        [Route("ChangeActiveClient")]
        [HttpPost]
        public int ChangeActiveClient()
        {
            return 0;
        }

        //start / Edit / remove Mission
        [Route("StartQuest")]
        [HttpPost]
        public int StartQuest()
        {
            return 0;
        }
        [Route("ContinueQuest")]
        [HttpPut]
        public int ContinueQuest()
        {
            return 0;
        }

        [Route("RemoveContinueQuest")]
        [HttpDelete]
        public int RemoveContinueQuest()
        {
            return 0;
        }
    }
}