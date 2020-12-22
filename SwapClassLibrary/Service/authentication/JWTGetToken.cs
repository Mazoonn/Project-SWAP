using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using SwapClassLibrary.Models;

namespace SwapClassLibrary.Service
{
    //Create new JWT
    public class JWTGetToken
    {
        //Get token
        //Input: user_id, email, role
        //Output: JWT
        public static string getToken(string user_id, string email, string role)
        {
            IAuthModel model = GetJWTModel(user_id, email, role);
            IAuthService authService = new JWTService(model.PrivateKey, model.PublicKey);
            string token = authService.GenerateToken(model);
            if (!authService.IsTokenValid(token))
                return "false";
            return token;
        }
        //Create claims
        //Input: user_id, email, role
        //Output: JWTModel
        private static JWTModel GetJWTModel(string user_id, string email, string role)
        {
            return
        new JWTModel()
        {
            Claims = new Claim[]
            {
                    new Claim("user-id", user_id),
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.Role, role)
            }
        };
        }
    }
}
