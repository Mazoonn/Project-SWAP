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
            string isLogin = "false";
            if (body.password == null && body.email == null)
                return isLogin;
            if(clientService.checkUserLogin(body) == false)
                 return isLogin; 
            //Auth with JWT TODO - matan and slava
            IAuthModel model = GetJWTModel(body.name, body.email);
            IAuthService authService = new JWTService(model.SecretKey);

            string token = authService.GenerateToken(model);

            if (!authService.IsTokenValid(token))
                return "false";
            else
            {
                List<Claim> claims = authService.GetTokenClaims(token).ToList();
                Console.WriteLine(claims.FirstOrDefault(e => e.Type.Equals(ClaimTypes.Name)).Value);
                Console.WriteLine(claims.FirstOrDefault(e => e.Type.Equals(ClaimTypes.Email)).Value);
            }
            return token;
        }
        private static JWTModel GetJWTModel(string name, string email)
        {
            return new JWTModel()
            {
                Claims = new Claim[]
                {
                    new Claim(ClaimTypes.Name, name),
                    new Claim(ClaimTypes.Email, email)
                }
            };
        }



        [Route("register")]
        [HttpPost]
        public HttpResponseMessage register([FromBody]registerDTO body)
        {
           bool isrRegister = clientService.registerClient(body);
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