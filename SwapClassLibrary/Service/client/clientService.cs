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
            try { 
            SwapDbConnection db = new SwapDbConnection();
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
            catch (Exception e)
            {
                return false;
            }
           
        }
    }
}
