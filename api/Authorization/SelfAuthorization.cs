using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Controllers;
using SwapClassLibrary.Models;
using SwapClassLibrary.Service;

namespace api.Authorization
{
    public class SelfAuthorization : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            JWTModel model = new JWTModel();
            JWTService jwtService = new JWTService(model.PrivateKey, model.PublicKey);
            IEnumerable<Claim> claims;
            string clientId;

            try
            {
                var authToken = actionContext.Request.Headers.Authorization.Parameter;
                var length = actionContext.Request.RequestUri.Segments.Count();
                string userId = actionContext.Request.RequestUri.Segments[length - 1];

                claims = jwtService.GetTokenClaims(authToken);
                clientId = claims.First(c => c.Type == "user-id").Value;

                return (clientId == userId);
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}