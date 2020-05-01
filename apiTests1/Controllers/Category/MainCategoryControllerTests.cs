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

namespace api.Controllers.Category.Tests
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
            var controller = new CategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllMainCategory().StatusCode, HttpStatusCode.OK);
        }

        //[TestMethod()]
        //public void AddMainCategoryTest()
        //{
        //    Assert.Fail();
        //}

        //[TestMethod()]
        //public void ChangeActiveMainCategoryTest()
        //{
        //    Assert.Fail();
        //}

        //[TestMethod()]
        //public void DeleteMainCategoryTest()
        //{
        //    Assert.Fail();
        //}
    }
}