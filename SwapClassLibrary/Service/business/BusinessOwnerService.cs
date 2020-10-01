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
    public class BusinessOwnersService
    {
        public static bool AddBusinessOwners(string business_owner_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            BusinessOwner business_owner_obj = db.BusinessOwners.Where(b => b.business_owner_id == business_owner_id).FirstOrDefault();
            if (business_owner_obj == null)
            {
                BusinessOwner business_owner = new BusinessOwner()
                {
                    business_owner_id = IdService.generateID("business_owner_id"),
                };
                db.BusinessOwners.Add(business_owner);
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public static bool DeleteBusinessOwners(string business_owner_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            BusinessOwner business_owner = db.BusinessOwners.Where(c => c.business_owner_id == business_owner_id).FirstOrDefault();
            if (business_owner != null)
            {
                db.BusinessOwners.Remove(business_owner);
                //TODO remove all bussiness and all the prodectes check if it is posible from the DB
                client client = db.clients.Where(c => c.client_id == business_owner_id).FirstOrDefault();
                client.actor = "client";
                db.SaveChanges();
                return true;
            }
            return false;
        }

    }

}
