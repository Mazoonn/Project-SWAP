﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using SwapClassLibrary.Models;

namespace SwapClassLibrary.Service
{
    public class JWTGetToken
    {
        public static string getToken(string user_id, string email)
        {
            IAuthModel model = GetJWTModel(user_id, email);
            IAuthService authService = new JWTService(model.SecretKey);
            string token = authService.GenerateToken(model);
            if (!authService.IsTokenValid(token))
                return "false";
            return token;
        }
        private static JWTModel GetJWTModel(string user_id, string email)
        {
            return new JWTModel()
            {
                Claims = new Claim[]
                {
                    new Claim("id", user_id),
                    new Claim(ClaimTypes.Email, email)
                }
            };
        }
    }
}
