using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using SwapClassLibrary.Models;
using SwapClassLibrary.Service;

namespace api.Authorization
{
    //Role authorization
    public class MyAuthorizeAttribute : AuthorizeAttribute
    {
        private readonly string[] AllowedRoles;

        public MyAuthorizeAttribute(params string[] roles)
        {
            AllowedRoles = roles;
        }

        //Check JWT digital signature and role claim
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            JWTModel model = new JWTModel();
            JWTService jwtService = new JWTService(model.PrivateKey, model.PublicKey);
            IEnumerable<Claim> claims;
            var authToken = actionContext.Request.Headers.Authorization.Parameter;
            string role;

            try
            {
                claims = jwtService.GetTokenClaims(authToken);
            }
            catch (Exception)
            {
                return false;
            }

            role = claims.First(c => c.Type == ClaimTypes.Role).Value;

            return (AllowedRoles.Any(r=> r == role));
        }
    }
}