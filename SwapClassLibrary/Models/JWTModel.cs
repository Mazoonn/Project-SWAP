using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.IdetityModel.Tokens;

namespace SwapClassLibrary.Models
{
    class JWTModel : IAuthModel
    {
        #region Public Methods
        public int ExireMinutes { get; set; } = 10080;//7 days
        public string SecretKey { get; set; } = "test";//secret key need to move to config out server
        public string SecurityAlgorithm { get; set; } = SecurtyAlgorithms.
    }

}
