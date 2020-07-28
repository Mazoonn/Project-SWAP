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
        public static bool registerClientLocal(registerDTO body)
        {
            
            SwapDbConnection db = new SwapDbConnection();
            if (db.clients.Where(x => x.email == body.email).Select(x => x.client_id) != null)
            {
                client new_client = new client()
                {
                    client_id = IdService.generateID("client"),
                    email = body.email.ToString(),
                    birthday_date = body.birthday.ToString(),
                    creation_date = DateTime.Now,
                    first_name = body.first_lest.ToString(),
                    last_login = DateTime.Now,
                    last_name = body.first_name.ToString(),
                    phone = body.phone.ToString(),
                    sex = body.sex.ToString(),
                    password = body.password.ToString(),
                    login_local = true,login_facebock=false,login_google=false
                };

                db.clients.Add(new_client);
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public static bool registerClientfacebook(loginDTO body)
        {

            return false;
        }

        public static void registerClientgoogle(loginDTO body)
        {
            try
            {
                SwapDbConnection db = new SwapDbConnection();
                client client = db.clients.FirstOrDefault(user => user.email == body.email);
                if (client == null)
                {
                    client new_client = new client()
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
                        login_local = false,
                        login_facebock = false,
                        login_google = true,
                    };
                    db.clients.Add(new_client);
                    db.SaveChanges();
                }
            }
            catch (DbEntityValidationException ex)
            {
                foreach (var entityValidationErrors in ex.EntityValidationErrors)
                {
                    foreach (var validationError in entityValidationErrors.ValidationErrors)
                    {
                        Console.WriteLine("Property: " + validationError.PropertyName + " Error: " + validationError.ErrorMessage);
                    }
                }
            }
            
                
        }
        public static string checkUserLogin(loginDTO body)
        {
            SwapDbConnection db = new SwapDbConnection();
            loginDTO client = db.clients.Where(x => x.email == body.email).Select(x => new loginDTO
            {
                email = x.email,
                user_id = x.client_id,
                password = x.password
            }).FirstOrDefault();
            if (client == null || client.password != body.password)
                return null;
            return client.user_id;
        }
    }

}
