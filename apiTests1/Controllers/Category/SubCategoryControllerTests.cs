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
    public class SubCategoryControllerTests
    {
        [TestMethod()]
        public void GetAllSubCategoryTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost/api/user/44300");
            var route = config.Routes.MapHttpRoute("Default", "api/{controller}/ GetAllSubCategory");
            var controller = new SubCategoryController
            {
                Request = request,
            };
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            Assert.AreEqual(controller.GetAllSubCategory().StatusCode, HttpStatusCode.OK);
        }

        //[TestMethod()]
        //public void AddSubCategoryTest()
        //{
        //    Assert.Fail();
        //}

        //[TestMethod()]
        //public void ChangeActiveSubCategoryTest()
        //{
        //    Assert.Fail();
        //}

        //[TestMethod()]
        //public void DeleteSubCategoryTest()
        //{
        //    Assert.Fail();
        //}
    }
}