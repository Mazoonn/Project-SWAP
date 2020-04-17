using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace api.Controllers
{
    [RoutePrefix("api/category")]
    public class categoryController : Controller
    {
        // GET: type
        [HttpGet]
        public type_category get()
        {
            SwapDbConnection db = new SwapDbConnection();
            type_category a = db.type_category.First();
            return a;
           /// neet to countinue 
        }
    }
}