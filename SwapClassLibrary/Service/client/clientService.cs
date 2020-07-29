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
            client client=db.clients.FirstOrDefault(c=>c.email==body.email);
            string id = "";

            if (client==null)
            {
                id = IdService.generateID("client");
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
                    password = body.password,
                    login_local = true,
                    login_facebock=false,
                    login_google=false
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
