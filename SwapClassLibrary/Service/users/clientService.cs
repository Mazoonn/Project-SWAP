using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using SwapClassLibrary.EF;
using SwapClassLibrary.DTO;
using System.Data.Entity.Validation;

namespace SwapClassLibrary.Service
{
    public class clientService
    {
        public static string registerClientLocal(registerDTO body)
        {
            SwapDbConnection db = new SwapDbConnection();
            client client = db.clients.FirstOrDefault(c => c.email == body.email && (c.platform == "local"));
            string id = "";

            if (client == null)
            {
                id = IdService.generateID("client");
                HashSalt hs = HashSalt.GenerateSaltedHash(body.password);

                client new_client = new client()
                {
                    client_id = id,
                    email = body.email,
                    birthday_date = body.birthday,
                    creation_date = DateTime.Now,
                    first_name = body.first_name,
                    last_login = DateTime.Now,
                    last_name = body.last_name,
                    phone = body.phone,
                    sex = body.sex,
                    password = hs.Hash,
                    salt = hs.Salt,
                    platform= "local"
                };

                db.clients.Add(new_client);
                db.SaveChanges();
            }
            return id;
        }

        public static bool registerClientfacebook(loginDTO body)
        {

            return false;
        }

        private static void SetUser(loginDTO user,string role, string id, string email)
        {
            user.role = role;
            user.email = email;
            user.user_id = id;
        }

        public static client registerClientgoogle(loginDTO body)
        {
            //try
            //{
            SwapDbConnection db = new SwapDbConnection();
            client client = db.clients.FirstOrDefault(u => u.email == body.email);
            if (client == null)
            {
                client = new client
                {
                    client_id = body.user_id,
                    email = body.email,
                    creation_date = DateTime.Now,
                    first_name = body.first_name,
                    last_login = DateTime.Now,
                    last_name = body.last_name,
                    password = "",
                    phone = "",
                    sex = "",
                    platform = "google"
                };
                db.clients.Add(client);
            }

            client.last_login = DateTime.Now;
            db.SaveChanges();

            return client;
            //}
            //catch (DbEntityValidationException ex)
            //{
            //    foreach (var entityValidationErrors in ex.EntityValidationErrors)
            //    {
            //        foreach (var validationError in entityValidationErrors.ValidationErrors)
            //        {
            //            Console.WriteLine("Property: " + validationError.PropertyName + " Error: " + validationError.ErrorMessage);
            //        }
            //    }
            //}


        }
        public static client checkUserLogin(loginDTO body)
        {
            SwapDbConnection db = new SwapDbConnection();
            client user = db.clients.FirstOrDefault(x => x.email == body.email && x.platform == "local");

            if (user == null || !HashSalt.VerifyPassword(body.password, user.password, user.salt))
                return null;
            user.last_login = DateTime.Now;
            db.SaveChanges();

            return user;
        }

        public static string GetRole(client user)
        {
            if (user.BusinessOwner != null)
            {
                if (user.BusinessOwner.admin != null) return "admin";
                return "business";
            }
            return "client";
        }

        public static clientInfoDTO GetClientInfo(string clientId)
        {
            SwapDbConnection db = new SwapDbConnection();
            return db.clients.Select(c => new clientInfoDTO
            {
                actor = c.BusinessOwner != null ? (c.BusinessOwner.admin != null ? "admin" : "business") : "client",
                client_id = c.client_id,
                birthday_date = c.birthday_date,
                email = c.email,
                first_name = c.first_name,
                last_login = c.last_login,
                last_name = c.last_name,
                phone = c.phone,
                platform = c.platform,
                request = c.business_owner_request ?? false,
                sex = c.sex ?? ""
            }).FirstOrDefault(c => c.client_id == clientId);
        }

        public static bool ChangePassword(string clientId, string password)
        {
            SwapDbConnection db = new SwapDbConnection();
            HashSalt newPasswordSalt;
            client user = db.clients.FirstOrDefault(c => c.client_id == clientId);

            if (user == null) return false;
            if (user.platform != "local") return false;

            newPasswordSalt = HashSalt.GenerateSaltedHash(password);
            user.salt = newPasswordSalt.Salt;
            user.password = newPasswordSalt.Hash;
            db.SaveChanges();

            return true;
        }

        public static bool RequestBusinessOwner(string clientId)
        {
            SwapDbConnection db = new SwapDbConnection();
            client user = db.clients.FirstOrDefault(c => c.client_id == clientId);

            if (user == null) return false;
            if (user.business_owner_request ?? false) return false;
            user.business_owner_request = true;
            db.SaveChanges();

            return true;
        }

        public static bool UpdateInformation(ClientDatePhoneSexDTO client, string clientId)
        {
            SwapDbConnection db = new SwapDbConnection();
            client user = db.clients.FirstOrDefault(c => c.client_id == clientId);

            if (user == null) return false;
            user.birthday_date = client.birthday_date ?? user.birthday_date;
            user.phone = client.phone ?? user.phone;
            user.sex = client.sex ?? user.sex;
            db.SaveChanges();

            return true;
        }
    }

}
