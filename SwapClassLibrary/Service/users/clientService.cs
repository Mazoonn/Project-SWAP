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
                    birthday_date = "",
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
    }

}
