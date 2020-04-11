using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace api.Controllers
{
    [Authorize]
    [RoutePrefix("api/business")]
    public class BusinessController : Controller
    {

        //business add/change/delete
        [Route("AddBusiness")]
        [HttpPost]
        public int AddBusiness()
        {
            return 0;
        }
        [Route("EditBusiness")]
        [HttpPut]
        public int EditBusiness()
        {
            return 0;
        }
        [Route("RemoveBusiness")]
        [HttpDelete]
        public int RemoveBusiness()
        {
            return 0;
        }




        //Discount add/change/request to Approve/delete
        [Route("AddBusiness")]
        [HttpPost]
        public int AddDiscount()
        {
            return 0;
        }
        [Route("EditBusiness")]
        [HttpPut]
        public int EditDiscount()
        {
            return 0;
        }
        [Route("ApproveBusiness")]
        [HttpPut]
        public int ApproveBusiness()
        {
            return 0;
        }
        [Route("RemoveBusiness")]
        [HttpDelete]
        public int RemoveDiscount()
        {
            return 0;
        }

    }
}