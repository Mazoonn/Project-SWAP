using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;

namespace SwapClassLibrary.Models
{
    public class IAuthModel
    {
        #region Members
        string SecretKey { get; set; }
        string SecurityAlgorithm { get; set; }
        int Expiremitnutes { get; set; }
        Claim[] Claims { get; set; }
        #endregion
    }
}
