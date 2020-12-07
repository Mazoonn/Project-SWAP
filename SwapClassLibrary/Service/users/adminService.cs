using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using SwapClassLibrary.EF;
using SwapClassLibrary.DTO;
using System.Data.Entity.Validation;
using SwapClassLibrary.Models;
using System.Security.Claims;
using SwapClassLibrary.Service;

namespace SwapClassLibrary.Service
{
    public class AdminService
    {
        public static List<clientInfoDTO> GetAllAdmins(bool test = false)
        {
            SwapDbConnection db = new SwapDbConnection();
            int count = db.admins.Count();
            if (count == 0 || test)
                return null;
            List<clientInfoDTO> admins = db.clients.Select(x => new clientInfoDTO()
            {
                client_id = x.client_id,
                first_name = x.first_name,
                last_name = x.last_name,
                birthday_date = x.birthday_date,
                email = x.email,
                sex = x.sex,
                last_login = x.last_login,
                phone = x.phone
            }).Where(c => c.actor == "admin").ToList();
            return admins;

        }

        public static List<clientInfoDTO> GetAllUsers(bool test = false)
        {
            SwapDbConnection db = new SwapDbConnection();
            int count = db.clients.Count();
            if (count == 0 || test)
                return null;
            List<clientInfoDTO> users = db.clients.Select(client => new clientInfoDTO()
            {
                client_id = client.client_id,
                first_name = client.first_name,
                last_name = client.last_name,
                birthday_date = client.birthday_date,
                email = client.email,
                sex = client.sex,
                last_login = client.last_login,
                phone = client.phone,
                actor = client.BusinessOwner != null ? (client.BusinessOwner.admin != null ? "admin" : "business") : "client",
                request = client.business_owner_request ?? false,
                platform = client.platform
            }).ToList();
            return users;
        }

        public static bool AddAdmin(string client_id)
        {
            SwapDbConnection db = new SwapDbConnection();
            admin admin = db.admins.Where(c => c.admin_id == client_id).FirstOrDefault();
            if (admin == null)
            {
                client client = db.clients.Where(c => c.client_id == client_id).FirstOrDefault();
                admin = new admin() { admin_id = client_id };
                db.admins.Add(admin);
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
                db.admins.Remove(admin);
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public static bool ChangeRole(string id, string currentRole, string newRole)
        {
            SwapDbConnection db = new SwapDbConnection();
            client client = db.clients.FirstOrDefault(c => c.client_id == id);
            bool success = false;

            if (client == null) return success;

            switch (newRole)
            {
                case "admin":
                    success = ChangeRoleToAdmin(currentRole, client);
                    break;
                case "business":
                    success = ChangeRoleToBussinesOwner(currentRole, client, db);
                    break;
                case "client":
                    success = ChangeRoleToClient(currentRole, client.client_id, db);
                    break;
                default:
                    break;
            }
            if (success) db.SaveChanges();

            return success;
        }

        public static bool DeleteUser(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            client client = db.clients.FirstOrDefault(c => c.client_id == id);
            if (client == null) return false;

            db.clients.Remove(client);
            db.SaveChanges();
            return true;
        }

        private static bool ChangeRoleToAdmin(string currentRole, client user)
        {
            if (currentRole == "client")
            {
                user.BusinessOwner = new BusinessOwner()
                {
                    business_owner_id = user.client_id,
                    admin = new admin()
                    {
                        admin_id = user.client_id
                    }
                };
                return true;
            }

            if(currentRole == "business")
            {
                user.BusinessOwner.admin = new admin()
                {
                    admin_id = user.client_id
                };
                return true;
            }

            return false;
        }

        private static bool ChangeRoleToBussinesOwner(string currentRole, client user, SwapDbConnection db)
        {
            if (currentRole == "client")
            {
                user.BusinessOwner = new BusinessOwner()
                {
                    business_owner_id = user.client_id
                };
                return true;
            }

            if (currentRole == "admin")
            {
                admin admin = db.admins.FirstOrDefault(a => a.admin_id == user.client_id);
                if (admin != null)
                {
                    db.admins.Remove(admin);
                    return true;
                }
                return false;
            }

            return false;
        }

        private static bool ChangeRoleToClient(string currentRole, string id, SwapDbConnection db)
        {
            BusinessOwner bOwner;

            if (currentRole == "client") return false;
            bOwner = db.BusinessOwners.FirstOrDefault(b => b.business_owner_id == id);
            if (bOwner == null) return false;

            if (currentRole == "business" || currentRole == "admin")
            {
                db.BusinessOwners.Remove(bOwner);
                return true;
            }

            return false;
        }

        public static string NewPassword(string id, string password)
        {
            SwapDbConnection db = new SwapDbConnection();
            client client = db.clients.FirstOrDefault(c => c.client_id == id);
            HashSalt hashSalt;

            if (client == null || client.platform != "local") return "false";
            if (HashSalt.VerifyPassword(password, client.password, client.salt))
                return "same";
            hashSalt = HashSalt.GenerateSaltedHash(password);
            client.password = hashSalt.Hash;
            client.salt = hashSalt.Salt;
            db.SaveChanges();
            return "ok";
        }


        public static List<BusinessInfoDTO> GetNotApprovedBusinesses()
        {
            return new SwapDbConnection().businesses.Where(b => !b.approve_by_admin)
                .Select(business => new BusinessInfoDTO
                {
                    businessId = business.place_id,
                    country = business.place.country,
                    creation_date = business.place.creation_date,
                    description = business.place.description ?? "",
                    name = business.place.name ?? "",
                    post_code = business.place.post_code?? "",
                    state = business.place.state?? "",
                    street = business.place.street,
                    street_number = business.place.street_number,
                    approve = business.approve_by_admin,
                    settlement = business.place.settlement,
                    user = new clientInfoDTO
                                {
                                      birthday_date = business.BusinessOwner.client.birthday_date,
                                      client_id = business.BusinessOwner.client.client_id,
                                      email = business.BusinessOwner.client.email,
                                      first_name = business.BusinessOwner.client.first_name,
                                      last_name = business.BusinessOwner.client.last_name,
                                      actor = business.BusinessOwner.admin != null ? "admin" : "business",
                                      phone = business.BusinessOwner.client.phone,
                                      sex = business.BusinessOwner.client.sex,
                                      platform = business.BusinessOwner.client.platform
                                },
                }).ToList();
        }

        public static bool ApproveBusinesses(List<string> ids)
        {
            SwapDbConnection db = new SwapDbConnection();
            business business;

            foreach (string id in ids)
            {
                business = db.businesses.FirstOrDefault(b => (b.place_id == id)
                && !b.approve_by_admin);
                if (business == null) return false;
                business.approve_by_admin = true;
            }
            db.SaveChanges();

            return true;
        }

        public static List<EventDTO> GetEvents()
        {
            SwapDbConnection db = new SwapDbConnection();

            return db.Events.Select(e => new EventDTO
            {
                place_id = e.place_id,
                name = e.place.name ?? "",
                description = e.place.description ?? "",
                end_date = e.end_date,
                start_date = e.start_date,
                price = e.price,
                country = e.place.country ?? "",
                settlement = e.place.settlement ?? "",
                state = e.place.state ?? "",
                street = e.place.street ?? "",
                street_number = e.place.street_number ?? "",
                post_code = e.place.post_code ?? "",
            }).ToList();
        }


        public static bool DeleteEvent(string id)
        {
            SwapDbConnection db = new SwapDbConnection();
            Event myEvent = db.Events.FirstOrDefault(e => e.place_id == id);

            if (myEvent == null) return false;
            db.Events.Remove(myEvent);
            db.SaveChanges();
            return true;
        }

        public static bool EditEvent(EditEventDTO eventToEdit)
        {
            SwapDbConnection db = new SwapDbConnection();
            Event myEvent = db.Events.FirstOrDefault(e => e.place_id == eventToEdit.place_id);

            if (myEvent == null) return false;
            myEvent.price = eventToEdit.price;
            myEvent.place.name = eventToEdit.name;
            db.SaveChanges();
            return true;
        }

        public static bool EditDescriptionEvent(DescriptionEventDTO eventToEdit)
        {
            SwapDbConnection db = new SwapDbConnection();
            Event myEvent = db.Events.FirstOrDefault(e => e.place_id == eventToEdit.place_id);

            if (myEvent == null) return false;
            myEvent.place.description = eventToEdit.description;
            db.SaveChanges();

            return true;
        }

        static public EventDTO AddEvent(NewEventDTO eventToAdd)
        {
            SwapDbConnection db = new SwapDbConnection();
            Event myEvent = db.Events.FirstOrDefault(e => e.place_id == eventToAdd.place.place_id);
            place place;

            if (myEvent != null) return null;
            place = db.places.FirstOrDefault(p => p.place_id == eventToAdd.place.place_id);
            if (place != null)
            {
                if(place.business != null) return null;
                place.name = eventToAdd.place.name;
                place.description = eventToAdd.place.description;
            }

            myEvent = new Event
            {
                end_date = eventToAdd.end_date,
                start_date = eventToAdd.start_date,
                place_id = eventToAdd.place.place_id,
                price = eventToAdd.price,
                place = place ?? new place
                {
                    place_id = eventToAdd.place.place_id,
                    country = eventToAdd.place.country,
                    creation_date = DateTime.Now,
                    description = eventToAdd.place.description,
                    name = eventToAdd.place.name,
                    post_code = eventToAdd.place.post_code,
                    settlement = eventToAdd.place.settlement,
                    state = eventToAdd.place.state,
                    street_number = eventToAdd.place.street_number ?? "",
                    street = eventToAdd.place.street,
                    latitude = eventToAdd.place.latitude,
                    longitude = eventToAdd.place.longitude,
                }
            };
            db.Events.Add(myEvent);
            db.SaveChanges();

            return new EventDTO
            {
                country = myEvent.place.country,
                description = myEvent.place.description ?? "",
                end_date = myEvent.end_date,
                name = myEvent.place.name ?? "",
                place_id = myEvent.place_id,
                post_code = myEvent.place.post_code ?? "",
                price = myEvent.price,
                settlement = myEvent.place.settlement,
                start_date = myEvent.start_date,
                state = myEvent.place.state ?? "",
                street = myEvent.place.street,
                street_number = myEvent.place.street_number ?? ""
            };
        }
    }
}
