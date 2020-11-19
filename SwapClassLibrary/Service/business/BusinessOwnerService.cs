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
            BusinessOwner business_owner_obj = db.BusinessOwners.FirstOrDefault(b => b.business_owner_id == business_owner_id);
            client client_to_change = db.clients.FirstOrDefault(c => c.client_id == business_owner_id);
            if (business_owner_obj == null && client_to_change != null)
            {
                BusinessOwner business_owner = new BusinessOwner()
                {
                    business_owner_id = business_owner_id,
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
                List<business> businesses = db.businesses.Where(p => p.business_owner_id == business_owner_id).ToList();
                for (int i = 0; i < businesses.Count(); i++)
                {
                    db.businesses.Remove(businesses[i]);
                }
                db.BusinessOwners.Remove(business_owner);
                client client = db.clients.Where(c => c.client_id == business_owner_id).FirstOrDefault();
                db.SaveChanges();
                return true;
            }
            return false;
        }
    }

}
