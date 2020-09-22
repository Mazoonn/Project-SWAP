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
using SwapClassLibrary.DTO;
using SwapClassLibrary.Service;
using Moq;
using Autofac.Extras.Moq;

namespace Test.Controllers.GoogleValue
{


    [TestClass()]
    public class GetAllGoogleValueTest
    {

        [TestMethod()]
        public void GetAllGoogleValueSuccess()

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
        public void GetAllGoogleValueNotFound()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetAllGoogleValue");
            var controller = new GoogleValueController
            {
                Request = request,
            };

            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllGoogleValue(true).StatusCode, HttpStatusCode.NotFound);
        }
    }


    [TestClass()]
    public class GetGoogleValueTest
    {
        [TestMethod()]
        public void GetGoogleValueSuccess()
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
            Assert.AreEqual(controller.GetGoogleValue(google_id).StatusCode, HttpStatusCode.OK);
        }
        [TestMethod()]
        public void GetGoogleValueNotFound()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetGoogleValue/{id}");
            var controller = new GoogleValueController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetGoogleValue("123").StatusCode, HttpStatusCode.NotFound);
        }
    }
    [TestClass()]
    public class AddGoogleValueTest
    {
        [TestMethod()]
        public void AddGoogleValueSuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddGoogleValue/{id}");
            var controller = new GoogleValueController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            var test = new googleValueDto() { value = "unit test" };
            Assert.AreEqual(controller.AddGoogleValue(test).StatusCode, HttpStatusCode.OK);
        }
        [TestMethod()]
        public void AddGoogleValueInternalServerError()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddGoogleValue/{id}");
            var controller = new GoogleValueController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            var test = new googleValueDto();
            Assert.AreEqual(controller.AddGoogleValue(test).StatusCode, HttpStatusCode.InternalServerError);
        }
        [TestMethod()]
        public void AddGoogleValueBadRequest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddGoogleValue/{id}");
            var controller = new GoogleValueController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.AddGoogleValue(null).StatusCode, HttpStatusCode.BadRequest);
        }
    }
    [TestClass()]
    public class DeleteGoogleValueTest
    {
        [TestMethod()]
        public void DeleteGoogleValueSuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/DeleteGoogleValue/{id}");
            var controller = new GoogleValueController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            google_value test = db.google_value.Where(x => x.value == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.DeleteGoogleValue(test.google_value_id).StatusCode, HttpStatusCode.OK);
        }

        [TestMethod()]
        public void DeleteGoogleValueNotFound()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/DeleteGoogleValue/{id}");
            var controller = new GoogleValueController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.DeleteGoogleValue("123").StatusCode, HttpStatusCode.NotFound);
        }
    }
}
