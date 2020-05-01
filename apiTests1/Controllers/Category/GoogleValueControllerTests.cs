using Microsoft.VisualStudio.TestTools.UnitTesting;
using api.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;
using SwapClassLibrary.EF;


namespace api.Controllers.Tests
{
    [TestClass()]
    public class GoogleValueControllerTests
    {
        [TestMethod()]
        public void GetAllGoogleValueTest()

        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetAllGoogleValue");
            var controller = new GoogleValueController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
           Assert.AreEqual(controller.GetAllGoogleValue().StatusCode, HttpStatusCode.OK);
        }

        [TestMethod()]
        public void GetGoogleValueTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetGoogleValue/{id}");
            var controller = new GoogleValueController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            string google_id = db.google_value.Select(x => x.google_value_id).FirstOrDefault();
            Assert.AreEqual(controller.GetGoogleValue(google_id).StatusCode,HttpStatusCode.OK);
        }

        //[TestMethod()]
        //public void AddGoogleValueTest()
        //{
        //    var config = new HttpConfiguration();
        //    var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
        //    var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddGoogleValue/{id}");
        //    var controller = new GoogleValueController
        //    {
        //        Request = request,
        //    };
        //    controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;

         
        //}

        //[TestMethod()]
        //public void DeleteGoogleValueTest()
        //{
        //    Assert.Fail();
        //}
    }
}