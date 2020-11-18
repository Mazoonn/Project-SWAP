using System.IO;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System;

namespace SwapClassLibrary.Models
{
    public class JWTModel : IAuthModel
    {
        #region Public Methods
        public int ExpireMinutes { get; set; } = 10080; // 7 days.
        public string PrivateKey { get; set; } = File.ReadAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Keys\private-key.pem")); // This secret key should be moved to some configurations outter server.
        public string PublicKey { get; set; } = File.ReadAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Keys\public-key.pem"));
        public string SecurityAlgorithm { get; set; } = SecurityAlgorithms.RsaSha256Signature;

        public Claim[] Claims { get; set; }
        #endregion
    }

}
