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
                    login_google=false,
                    actor = "client"
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

        public static string registerClientgoogle(loginDTO body)
        {
            //try
            //{
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
                        actor = "client"
                    };
                    db.clients.Add(new_client);
                    db.SaveChanges();
                    return new_client.client_id;
                }
                return "";
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
        public static loginDTO checkUserLogin(loginDTO body)
        {
            SwapDbConnection db = new SwapDbConnection();
            loginDTO user;
            string actor = db.clients.Where(x => x.email == body.email).Select(x => x.actor).FirstOrDefault();

            switch (actor)
            {
                case "client":
                    user = db.clients.Where(x => x.email == body.email).Select(x => new loginDTO
                    {
                        email = x.email,
                        user_id = x.client_id,
                        password = x.password,
                        role = x.actor

                    }).FirstOrDefault();
                    break;
                case "admin":
                    user = db.clients.Where(x => x.email == body.email).Select(x => new loginDTO
                    {
                        email = x.email,
                        user_id = x.client_id,//TODO change this to admin table
                        password = x.password,
                        role = x.actor

                    }).FirstOrDefault();
                    break;
                case "business_owner":
                    user = db.clients.Where(x => x.email == body.email).Select(x => new loginDTO
                    {
                        email = x.email,
                        user_id = x.client_id,//TODO change this to BusinessOwner table
                        password = x.password,
                        role = x.actor
                    }).FirstOrDefault();
                    break;
                default:
                    throw new Exception("there was an error with the type of actor");
            }
           
            if (user == null || user.password != body.password)
                return null;
            return user;
        }
    }

}
