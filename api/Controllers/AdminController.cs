using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace api.Controllers
{
    [Authorize]
    [RoutePrefix("api/Admin")]
    public class AdminController : Controller
    {
        [Route("login")]
        [HttpGet]
        public int login()
        {
            return 0;
        }



        //admin add/change/delete
        [Route("AddAdmin")]
        [HttpPost]
        public int AddAdmin()
        {
            return 0;
        }
        [Route("EditAdmin")]
        [HttpPut]
        public int EditAdmin()
        {
            return 0;
        }
        [Route("RemoveAdmin")]
        [HttpDelete]
        public int RemoveAdmin()
        {
            return 0;
        }




        //approve / Edit / remove Business
        [Route("Approvebusiness")]
        [HttpPut]
        public int Approvebusiness()
        {
            return 0;
        }
        [Route("Editbusiness")]
        [HttpPut]
        public int Editbusiness()
        {
            return 0;
        }
        [Route("RemoveBusiness")]
        [HttpDelete]
        public int RemoveBusiness()
        {
            return 0;
        }




        //add / Edit / remove Catagory
        [Route("AddCatagory")]
        [HttpPut]
        public int AddCatagory()
        {
            return 0;
        }
        [Route("EditCatagory")]
        [HttpPut]
        public int EditCatagory()
        {
            return 0;
        }
        [Route("RemoveCatagory")]
        [HttpDelete]
        public int RemoveCatagory()
        {
            return 0;
        }




        //add / Edit / remove Quest
        [Route("AddQuest")]
        [HttpPost]
        public int AddQuest()
        {
            return 0;
        }
        [Route("EditQuest")]
        [HttpPut]
        public int EditQuest()
        {
            return 0;
        }
        [Route("RemoveQuest")]
        [HttpDelete]
        public int RemoveQuest()
        {
            return 0;
        }



        //add / Edit / remove Mission
        [Route("AddMission")]
        [HttpPost]
        public int AddMission()
        {
            return 0;
        }
        [Route("EditMission")]
        [HttpPut]
        public int EditMission()
        {
            return 0;
        }
        [Route("RemoveQuest")]
        [HttpDelete]
        public int RemoveMission()
        {
            return 0;
        }
    }
}