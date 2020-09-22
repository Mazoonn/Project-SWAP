using Microsoft.VisualStudio.TestTools.UnitTesting;
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
using api.Controllers;

namespace Test.Controllers.MainCategory
{
    [TestClass()]
    public class GetAllMainCategoryTest
    {
        [TestMethod()]
        public void GetAllMainCategorySuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetAllMainCategoryTest");
            var controller = new MainCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllMainCategory().StatusCode, HttpStatusCode.OK);
        }
        [TestMethod()]
        public void GetAllMainCategoryNotFound()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetAllMainCategoryTest");
            var controller = new MainCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllMainCategory(true).StatusCode, HttpStatusCode.NotFound);
        }
    }

    [TestClass()]
    public class AddMainCategoryTest
    {
        [TestMethod()]
        public void AddMainCategorySuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddMainCategory/");
            var controller = new MainCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            var test = new requestValueDTO() { name = "unit test", google_value = "unit test" };
            Assert.AreEqual(controller.AddMainCategory(test).StatusCode, HttpStatusCode.OK);

        }
       
        [TestMethod()]
        public void AddMainCategoryBadRequest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddMainCategory/");
            var controller = new MainCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            var test = new requestValueDTO() { name = "unit test" };
            Assert.AreEqual(controller.AddMainCategory(test).StatusCode, HttpStatusCode.BadRequest);

        }
    }
    [TestClass()]
    public class ChangeActiveMainCategoryTest
    {
        [TestMethod()]
        public void ChangeActiveMainCategorySuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddMainCategory/");
            var controller = new MainCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            main_category test = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
   
            Assert.AreEqual(controller.ChangeActiveMainCategory(test.main_id, true).StatusCode, HttpStatusCode.OK);
        }
        [TestMethod()]
        public void ChangeActiveMainCategoryNotFound()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/AddMainCategory/");
            var controller = new MainCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.ChangeActiveMainCategory("123", true).StatusCode, HttpStatusCode.NotFound);
        }
    }

    [TestClass()]
    public class DeleteMainCategoryTest
    {
        [TestMethod()]
        public void DeleteMainCategorySuccess()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/DeleteGoogleValue/{id}");
            var controller = new MainCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            main_category test = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.DeleteMainCategory(test.main_id).StatusCode, HttpStatusCode.OK);

        }
        [TestMethod()]
        public void DeleteMainCategoryNotFound()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/DeleteGoogleValue/{id}");
            var controller = new MainCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.DeleteMainCategory("123").StatusCode, HttpStatusCode.NotFound);

        }
    }
}
