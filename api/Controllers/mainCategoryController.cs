using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwapClassLibrary.EF;


namespace api.Controllers
{
    public class mainCategoryController : ApiController
    {
        // GET: api/mainCategory
        public string  Get()
        {
            SwapDbConnection db = new SwapDbConnection();
            return "connected";
            //return db.main_category.All();
          
        }

        //HttpResponseMessage

        // POST: api/mainCategory
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/mainCategory/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/mainCategory/5
        public void Delete(int id)
        {
        }
    }
}
