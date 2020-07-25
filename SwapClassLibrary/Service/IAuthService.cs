using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using SwapClassLibrary.Models;

namespace SwapClassLibrary.Service
{
    public interface IAuthService
    {
        string SecretKey { get; set; }
        bool IsTokebValid(string token);
        string GenerateToken(IAuthModel model);
        IEnumerable<Claim> GetTokenClaims(string token);
    }
}
