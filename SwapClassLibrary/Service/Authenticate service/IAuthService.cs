
using System.Security.Claims;
using System.Collections.Generic;
using SwapClassLibrary.Models;

namespace SwapClassLibrary.Service
{
    public interface IAuthService
    {
        string PrivateKey { get; set; }
        string PublicKey { get; set; }
        bool IsTokenValid(string token);
        string GenerateToken(IAuthModel model);
        IEnumerable<Claim> GetTokenClaims(string token);
    }
}
