using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SwapClassLibrary.Service
{
    public class HashSalt
    {
        public string Hash { get; set; }
        public string Salt { get; set; }

        //Generate SaltedHash
        //Input: password
        //Output: HashSalt object
        public static HashSalt GenerateSaltedHash(string password)
        {
            var saltBytes = new byte[16];
            var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(saltBytes);
            var salt = Convert.ToBase64String(saltBytes);

            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, saltBytes, 10000);
            var hashPassword = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(64));

            HashSalt hashSalt = new HashSalt { Hash = hashPassword, Salt = salt };
            return hashSalt;
        }

        //Verify password
        public static bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
        {
            bool result;
            var saltBytes = Convert.FromBase64String(storedSalt);
            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(enteredPassword, saltBytes, 10000);
            result = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(64)) == storedHash;
            return result;
        }
    }
}
