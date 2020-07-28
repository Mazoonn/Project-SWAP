using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.DTO;
using SwapClassLibrary.EF;
using SwapClassLibrary.Service;
using System.Security.Claims;
using SwapClassLibrary.Models;
namespace api.Controllers
{
    //[Authorize]
    [RoutePrefix("api/client")]
    public class ClientController : ApiController
    {
        //צריך לבודק האם זה צריך לשמור את ה TOKEN KEY
        [Route("login")]
        [HttpPost]
        public string login([FromBody]loginDTO body)
        {
            string local_user_id="";
            string isLogin = "false";
            switch (body.platform)
            {
                case "facebook":
                    clientService.registerClientfacebook(body);
                    break;
                case "google":
                    clientService.registerClientgoogle(body);
                    break;
                case "local":
                    if (body.password == null || body.email == null)
                        return isLogin;
                     local_user_id = clientService.checkUserLogin(body);
                    if (local_user_id==null)
                        //User Not found or password illegal
                        return isLogin;
                    break;
                default:
                    return isLogin;
            }

            //Auth with JWT
            IAuthModel model = GetJWTModel(body.user_id==null?local_user_id: body.user_id, body.email);
            IAuthService authService = new JWTService(model.SecretKey);
            string token = authService.GenerateToken(model);
            if (!authService.IsTokenValid(token))
                return "false";
            else
            {
                //Auth with JWT TODO - matan and slava
                List<Claim> claims = authService.GetTokenClaims(token).ToList();
                Console.WriteLine(claims.FirstOrDefault(e => e.Type.Equals(ClaimTypes.Name)).Value);
                Console.WriteLine(claims.FirstOrDefault(e => e.Type.Equals(ClaimTypes.Email)).Value);
            }
            return token;
        }

        private static JWTModel GetJWTModel(string user_id, string email)
        {
            return new JWTModel()
            {
                Claims = new Claim[]
                {
                    new Claim(ClaimTypes.Surname, user_id),
                    new Claim(ClaimTypes.Email, email)
                }
            };
        }


        [Route("register")]
        [HttpPost]
        public HttpResponseMessage register([FromBody]registerDTO body)
        {
           bool isrRegister = clientService.registerClientLocal(body);
            if (!isrRegister)
                return Request.CreateResponse(HttpStatusCode.BadRequest, "This Email is in used.");
            return Request.CreateResponse(HttpStatusCode.OK, isrRegister);
        }
        // לא מחייב רק אופציה
        [Route("collectingData")]
        [HttpPost]
        public int collectingData()
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