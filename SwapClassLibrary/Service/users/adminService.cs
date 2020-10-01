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
    public class AdminService
    {
        public static bool AddAdmin(string client_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            admin admin = db.admins.Where(c => c.admin_id == client_id).FirstOrDefault();
            if (admin == null)
            {
                client client = db.clients.Where(c => c.client_id == client_id).FirstOrDefault();
                admin = new admin() { admin_id = client_id };
                db.admins.Add(admin);
                client.actor = "admin";
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public static bool DeleteAdmin(string client_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            admin admin = db.admins.Where(c => c.admin_id == client_id).FirstOrDefault();
            
            if (admin != null)
            {
                client client = db.clients.Where(c => c.client_id == client_id).FirstOrDefault();
                db.admins.Remove(admin);
                client.actor = "client";
                db.SaveChanges();
                return true;
            }
            return false;
        }



    }

}
