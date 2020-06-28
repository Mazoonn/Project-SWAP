using Microsoft.VisualStudio.TestTools.UnitTesting;
using api.Controllers.Category;
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

namespace api.Controllers.Tests
{
    [TestClass()]
    public class MainCategoryControllerTests
    {
        [TestMethod()]
        public void GetAllMainCategoryTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/GetAllMainCategoryTest");
            var controller = new MainCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllMainCategory().StatusCode, HttpStatusCode.OK);
        }

        [TestMethod()]
        public void AddMainCategoryTest()
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
            Assert.AreEqual(controller.AddMainCategory(test).StatusCode, HttpStatusCode.OK);
          
        }

        [TestMethod()]
        public void ChangeActiveMainCategoryTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/ChangeActiveMainCategory/{id}");
            var controller = new MainCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            SwapDbConnection db = new SwapDbConnection();
            main_category test = db.main_category.Where(x => x.name == "unit test").FirstOrDefault();
            Assert.AreEqual(controller.ChangeActiveMainCategory(test.main_id,true).StatusCode, HttpStatusCode.OK);
        }

        [TestMethod()]
        public void DeleteMainCategoryTest()
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
    }
}