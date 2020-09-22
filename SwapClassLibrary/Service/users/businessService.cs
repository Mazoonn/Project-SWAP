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
    public class businessService
    {
        public static bool AddBusinessOwner(string client_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            BusinessOwner BusinessOwner = db.BusinessOwners.Where(c => c.business_owner_id == client_id).FirstOrDefault();
            if (BusinessOwner == null)
            {
                client client = db.clients.Where(c => c.client_id == client_id).FirstOrDefault();
                BusinessOwner = new BusinessOwner() {  business_owner_id = client_id };
                db.BusinessOwners.Add(BusinessOwner);
                client.actor = "businessOwner";
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public static bool DeleteBusinessOwner(string client_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            BusinessOwner BusinessOwner = db.BusinessOwners.Where(c => c.business_owner_id == client_id).FirstOrDefault();
            if (BusinessOwner != null)
            {
                client client = db.clients.Where(c => c.client_id == client_id).FirstOrDefault();
                db.BusinessOwners.Remove(BusinessOwner);
                client.actor = "client";
                db.SaveChanges();
                return true;
            }
            return false;
        }

    }

}
