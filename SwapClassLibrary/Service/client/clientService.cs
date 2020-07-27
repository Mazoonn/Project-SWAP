using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using SwapClassLibrary.EF;
using SwapClassLibrary.DTO;

namespace SwapClassLibrary.Service
{
    public class clientService
    {
        public static bool registerClient(registerDTO body)
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
                    password = body.password.ToString()
                };
                db.clients.Add(new_client);
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public static bool checkUserLogin(loginDTO body)
        {
            SwapDbConnection db = new SwapDbConnection();
            if (db.clients.Where(x => x.email == body.email).FirstOrDefault() == null)
                return false;
            if (db.clients.Where(x => x.password == body.password).FirstOrDefault() != null)
                return true;
            return false;
        }
    }

}
